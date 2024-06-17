import { GET } from "./js/get.js";
// import { renderCardList } from "./js/renderCardList.js";

let page = 1;
let results = [];
let type = "movie";
let category = "popular";
let query = "";

const render = async () => {
  const endpoint = `${type}/${category}`;
  const response = await GET(endpoint, page, query);
  results = response.results;
  // renderCardList(results, containerEl);
};

render();


console.log(await GET("discover/movie", 1));