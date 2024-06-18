import { API_KEY } from "./keys.js";

const BASE_URL = 'https://api.themoviedb.org/3/';

export const GET = async (endpoint, page, query, language = "en-US") => {
  const response = await fetch(
    `${BASE_URL}${endpoint}?page=${page}&include_adult=false&language=${language}&${query}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  const data = await response.json();

  return data;
};