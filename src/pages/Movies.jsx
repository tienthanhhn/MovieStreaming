import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import { fetchMovies, getGenres } from "../store";
import { firebaseAuth } from "../utils/firebase-config";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.home.genresLoaded);

  const movies = useSelector((state) => state.home.movies);
  const genres = useSelector((state) => state.home.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movies" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    //navigate("/login");
  });
  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
};

export default Movies;

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
