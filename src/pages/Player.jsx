import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const EMBED_TO = "https://2embed.org/embed";
  const embedMovie = (id) => `${EMBED_TO}/movie?tmdb=${id}`;
  const embedTV = (id, season, episode) =>
    `${EMBED_TO}/series?tmdb=${id}&s=${season}&e=${episode}`;

  const [ep, setEp] = useState(1);
  const [ss, setSs] = useState(1);
  const [seriesSrc, setSeriesSrc] = useState(embedTV(id, 1, 1));

  const genresLoaded = useSelector((state) => state.home.genresLoaded);

  const movies = useSelector((state) => state.home.movies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  const film = movies.find((movie) => movie.id.toString() === id);

  const media_type = film.media_type;

  function handleClick() {
    setSeriesSrc(embedTV(id, ss, ep));
  }

  const srcVideo = media_type === "movie" ? embedMovie(id) : seriesSrc;

  return (
    <Container>
      <div className={`player ${media_type}`}>
        <div className="back">
          <BsArrowLeft onClick={() => navigate(`/movie-detail/${film.id}`)} />
        </div>
        <iframe
          src={srcVideo}
          title="Film Video Player"
          allowFullScreen
        ></iframe>
      </div>
      {media_type === "tv" ? (
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="ss" className="prelabel">
              Season
              <input
                type="text"
                id="ss"
                placeholder="1"
                onChange={(e) => setSs(e.target.value)}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="ep" className="prelabel">
              Episode
              <input
                type="text"
                id="ep"
                placeholder="1"
                onChange={(e) => setEp(e.target.value)}
              />
            </label>
          </div>
          <div className="btn-container flex">
            <button className="flex j-center a-center" onClick={handleClick}>
              Get it
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Player;

const Container = styled.div`
  .player {
    border: none;
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    iframe {
      border: none;
      height: 100%;
      width: 100%;
    }
  }
  .form-container {
    display: grid;
    grid-template-columns: auto auto;
    .form-group {
      font-size: larger;
      width: 20vw;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 3rem;
      margin: 2rem;
      background-color: #1a1a1a;
      border-radius: 0.2rem;
      input {
        border: none;
        margin-left: 1rem;
        font-size: medium;
        background-color: #1a1a1a;
        color: white;
      }
    }
    button {
      margin-left: 2rem;
      background-color: grey;
      font-size: 1.2rem;
      gap: 1rem;
      border-radius: 1rem;
      padding: 0.2rem 1.6rem;
      border: none;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;
