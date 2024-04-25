import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'; // Replace with your own key if needed
// const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getPopularMovies = (page) =>
  axios.get(`${BASE_URL}popular?api_key=${API_KEY}&language=en-US&page=${page}`);

export const getUpcomingMovies = (page) =>
  axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);

export const getSearchResults = (movie_name) =>
  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${movie_name}&page=1`);

export const getMovieDetail = (movieId) =>
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  // https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US

export const getMovieCast = (movieId) =>
  axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);

  
export const getTopRatedMovies = (page) =>
  axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)

// Similar functions for other types of movie data
// https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=1
// https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=1
// https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1
// https://api.themoviedb.org/3/movie/$%7Bmovie_id%7D/credits?api_key=${Api_key}&language=en-US
// https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US

// https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US

// https://api.themoviedb.org/3/movie/${movieId}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US