import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Player from './pages/Player'
import SignUp from './pages/SignUp'
import UserLiked from './pages/UserLiked'
import MovieInfo from './pages/MovieInfo'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/player/:id' element={<Player/>}/>
        <Route exact path='/movies' element={<Movies/>}/>
        <Route exact path='/movie-detail/:id' element={<MovieInfo/>}/>
        <Route exact path='/tv' element={<TVShows/>}/>
        <Route exact path='/mylist' element={<UserLiked/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='*' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
