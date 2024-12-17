import axios from "axios";

const API_KEY = "ccac83f3684a803c1d8b44b06750a4a7";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "es-ES",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
};
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: "es-ES",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de la película:", error);
    throw error;
  }
};