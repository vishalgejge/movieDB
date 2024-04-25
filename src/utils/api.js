import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c45a857c193f6302f2b5061c3b85e743'; // Replace with your own key if needed

export const fetchDataFromApi = async (url, params = {}) => {
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return { error: "Failed to fetch data from API. Please try again later." };
  }
};

export const getApiConfiguration = async () => {
  const url = `${BASE_URL}configuration`;
  return fetchDataFromApi(url);
};

export const getGenres = async () => {
  const endPoints = ["tv", "movie"];
  let allGenres = {};

  const promises = endPoints.map((endpoint) => fetchDataFromApi(`/genre/${endpoint}/list`));

  try {
    const data = await Promise.all(promises);
    data.forEach(({ genres }) => {
      if (genres) {
        genres.forEach((item) => (allGenres[item.id] = item));
      } else {
        console.error("Error fetching genres:", data);
      }
    }); 
    return allGenres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return { error: "Failed to fetch genres. Please try again later." };
  }
};
export const getUpcomingMovies = (page) =>
  axios.get(`https://api.themoviedb.org/3/movie/upcoming`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page: page
    }
  });

export const getPopularMovies = (page) =>
axios.get(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);

  
export const getTopRatedMovies = (page) =>
axios.get(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)

export const getGenreMovies = (page) =>
axios.get(`${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US&page=${page}`)
