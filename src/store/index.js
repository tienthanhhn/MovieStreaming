import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_KEY, TMDB_BASE_URL } from '../utils/constants';
import axios from 'axios'

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk('home/genres', async()=>{
    const { data:{genres} } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
})

const createArrayFromRawData = (array, moviesArray, genres) =>{
    array.forEach((movie)=>{
        // console.log(movie)
        const movieGenres = [];
        movie.genre_ids.forEach((genre)=>{
            const name = genres.find(({id}) => id === genre);
            if(name) movieGenres.push(name.name)
        })
        if(movie.backdrop_path){
            moviesArray.push({
                id: movie.id,
                name: movie.name ? movie.name : movie.title,
                image: movie.backdrop_path,
                poster: movie.poster_path,
                desc: movie.overview,
                genres: movieGenres.slice(0,3),
                media_type: movie.media_type,
            })
        }
    })
}

const getRawData = async(api, genres, paging) => {
    const moviesArray = [];
    for(let i =1;moviesArray.length<60 && i<10;i++){
        const {data:{results},} = await axios.get(`${api}${paging?`&page=${i}`:''}`
        );
        createArrayFromRawData(results, moviesArray, genres);
    }
    // console.log(moviesArray)
    return moviesArray;
}


export const fetchMovies = createAsyncThunk('home/trending', async({type},thunkApi)=> {
    const {home: { genres },} = thunkApi.getState();
    return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
}
);
export const fetchDataByGenre = createAsyncThunk('home/genre', async({genre,type},thunkApi)=> {
    const {home: { genres }} = thunkApi.getState();
    return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres);
}
);

export const getUserLikedMovies = createAsyncThunk("netflix/getLiked", async(email)=>{
    const{data:{movies}} = await axios.get(`http://localhost:5000/api/user/liked/${email}`)
    return movies;
})

export const removeFromLikedMovies = createAsyncThunk("netflix/deleteLiked", async({email, movieId})=>{
    const{data:{movies},} = await axios.put(`http://localhost:5000/api/user/delete`,{
        email, movieId,
    });
    return movies;
})


const HomeSlice = createSlice({
    name: 'Home',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(getGenres.fulfilled,(state,action)=>{
            state.genres = action.payload;
            state.genresLoaded =true;
        })
        builder.addCase(fetchMovies.fulfilled,(state,action)=>{
            state.movies = action.payload;
        })
        builder.addCase(fetchDataByGenre.fulfilled,(state,action)=>{
            state.movies = action.payload;
        })
        builder.addCase(getUserLikedMovies.fulfilled,(state,action)=>{
            state.movies = action.payload;
        })
        builder.addCase(removeFromLikedMovies.fulfilled,(state,action)=>{
            state.movies = action.payload;
        })
    }
});

export const store = configureStore({
    reducer: {
        home: HomeSlice.reducer,
    }
});