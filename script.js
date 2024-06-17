import { GET } from "./js/get.js";
import { renderCardList } from "./js/renderCardList.js";


const mainContainerEl = document.querySelector(".main-container");
const genreListEl = document.querySelector(".genres");
const navbarContainerEl = document.querySelector('.navbar-container');

let page = 1;
let results = [];
let type = "movie";
let category = "popular";
let query = "";

const render = async () => {
  const endpoint = `${type}/${category}`;
  const response = await GET(endpoint, page, query);
  results = response.results;
  renderCardList(results, mainContainerEl);
};

render();


//Getting all the movie genres
const getGenreList = async () => {
  const genreList = await GET("genre/movie/list", 1);
  
  genreList.genres.forEach((genre) => {
    const genreBtnEl = document.createElement('button');
    genreBtnEl.className = 'genre';
    genreBtnEl.textContent = genre.name;
    genreBtnEl.id = genre.id;

    genreListEl.appendChild(genreBtnEl);
  })

  };

getGenreList();


console.log(navbarContainerEl);
//Type Filter
navbarContainerEl.addEventListener('click', (event) => {
  if(event.target.tagName === 'A') {
    const typeID = event.target.id;
    type = typeID;
    page = 1 ;
    render();
  }
    
})

  // console.log(await GET("discover/movie", 1));

// movie o series list
// https://api.themoviedb.org/3/genre/movie/list