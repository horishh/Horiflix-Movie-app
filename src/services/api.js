import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const fetchFromApi = async (endpoint) => {
  try {
    const response = await axios.get(`${baseUrl}${endpoint}`, {
      params: {
        api_key: apiKey,
        language: "en-US",
      },
    });
    console.log(`Fetched from ${endpoint}:`, response.data);
    return response.data.results;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    return [];
  }
};

export const getMovies = (category = "popular") =>
  fetchFromApi(`/movie/${category}`);

export const getTv = (category = "popular") => fetchFromApi(`/tv/${category}`);
