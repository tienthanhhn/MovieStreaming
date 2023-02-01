import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpeg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay, FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";
import Card from "../components/Card";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.home.genresLoaded);

  const movies = useSelector((state) => state.home.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [results, setResult] = useState([]);

  function handleSearch(search) {
    if (search !== "") {
      setIsSearched(true);
      setResult(
        movies.filter((movie) => movie.name.toLowerCase().includes(search))
      );
    } else setIsSearched(false);
  }

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={ 
            backgroundImage
          }
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className="flex j-center a-center">
              <FaPlay />
              Play
            </button>
          </div>
        </div>
      </div>
      <div className={`search ${showSearch ? "show-search" : ""}`}>
        <button
          onFocus={() => setShowSearch(true)}
          onBlur={() => {
            if (!inputHover) setShowSearch(false);
          }}
        >
          <FaSearch />
        </button>
        <input
          type="text"
          placeholder="Search"
          onMouseEnter={() => setInputHover(true)}
          onMouseLeave={() => setInputHover(false)}
          onBlur={() => {
            setShowSearch(false);
            setInputHover(false);
          }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
      {isSearched && results.length === 0 ? <h1>No Movies Found</h1> : ''}
      {isSearched ? (
        <div className="search-result flex column">
          {results.map((movie) => {
            return (
              <div key={movie.id} className="card-container">
                <Card movieData={movie} />
                <div
                  className="title"
                  onClick={() => navigate(`/movie-detail/${movie.id}`)}
                >
                  {movie.name}
                </div>
              </div>
            );
          })}
          <div className="footer">
            
          </div>
        </div>
      ) : (
        <Slider movies={movies} />
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  .search-result {
    margin-left: 4rem;
    margin-right: 3rem;
    justify-content: space-between;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    align-items: center;
    .card-container {
      border-radius: 1rem;
      border: none;
      margin: 1rem;
      padding: 0.2rem;
      object-fit: cover;
      font-size: 1.2rem;
      cursor: pointer;
      .title {
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .footer{
      height: 50vh;
    }
  }
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
      }
      button {
        font-size: 1.2rem;
        gap: 1rem;
        border-radius: 0.2rem;
        padding: 0.2rem 1.6rem;
        border: none;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .search {
    margin: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      padding: 0.5rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      &:focus {
        outline: none;
      }
      svg {
        color: white;
        font-size: 1.2rem;
      }
    }
    input {
      width: 0;
      opacity: 0;
      visibility: hidden;
      transition: 1s ease-in-out;
      background-color: transparent;
      border: none;
      color: #c1bbb0;
      &:focus {
        outline: none;
      }
    }
  }
  .show-search {
    margin-left: 3rem;
    border: 0.4px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    input {
      width: 100%;
      opacity: 1;
      visibility: visible;
      padding: 0.3rem;
      font-size: medium;
    }
  }
`;
