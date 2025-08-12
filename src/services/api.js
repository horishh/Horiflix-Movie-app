import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const fetchFromApi = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
        ...params,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return [];
  }
};

export const getMovies = (category = "popular") =>
  fetchFromApi(`/movie/${category}`);

export const getTv = (category = "popular") => fetchFromApi(`/tv/${category}`);

export const searchMovies = (query) => fetchFromApi("/search/movie", { query });

export const searchTv = (query) => fetchFromApi("/search/tv", { query });
