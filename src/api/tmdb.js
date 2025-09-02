import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: "en-US", page: 1 },
  });
  return res.data.results;
};

export const getTopRatedMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY, language: "en-US", page: 1 },
  });
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, language: "en-US", query, page: 1 },
  });
  return res.data.results;
};
