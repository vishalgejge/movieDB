import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const response = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return response.data; // Return only the data from the response
    } catch (err) {
        // Log the error and return a custom error message
        console.error("Error fetching data from API:", err);
        return { error: "Failed to fetch data from API. Please try again later." };
    }
};
