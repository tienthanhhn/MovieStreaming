import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";

const MovieInfo = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const genresLoaded = useSelector((state) => state.home.genresLoaded);

  const movies = useSelector((state) => state.home.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id.toString() === id);
  // console.log(movie);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.image}`}
          alt="background"
          className="background-image"
        />
        <div className="container">
          <div className="poster-container">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster}`}
              alt="poster"
            />
          </div>
          <div className="desc">
            <h1>{movie.name}</h1>
            {movie.desc}
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => navigate(`/player/${movie.id}`)}
            >
              <FaPlay />
              Play
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MovieInfo;

const Container = styled.div`
  background-color: black;
  .hero {
    .poster-container {
      background-color: transparent;
      margin-left: 4rem;
      height: 60vh;
      width: 20vw;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
      object-fit: cover;
    }
    .container {
      position: absolute;
      bottom: 1rem;
      .desc {
        height: 100%;
        margin-left: 4rem;
      }
      .buttons {
        margin: 2rem 4rem;
        gap: 1rem;
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
        &:nth-of-type(2) {
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          svg {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;
