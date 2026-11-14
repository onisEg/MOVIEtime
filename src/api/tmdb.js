import axios from "axios";

// TMDB v3 key. It can be overridden with REACT_APP_TMDB_KEY in a .env file.
// Note: any key used in a front-end app is visible in the browser bundle.
const API_KEY =
  process.env.REACT_APP_TMDB_KEY || "f1aca93e54807386df3f6972a5c33b50";

export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: API_KEY, language: "en-US" },
});

export async function getTrending(mediaType, timeWindow = "week") {
  const { data } = await tmdb.get(`/trending/${mediaType}/${timeWindow}`);
  return data.results;
}

export async function discover(mediaType, page = 1) {
  const { data } = await tmdb.get(`/discover/${mediaType}`, {
    params: { sort_by: "popularity.desc", include_adult: false, page },
  });
  return data;
}

export async function getPopularPeople(page = 1) {
  const { data } = await tmdb.get("/person/popular", { params: { page } });
  return data;
}

export async function getMovie(id) {
  const { data } = await tmdb.get(`/movie/${id}`);
  return data;
}
