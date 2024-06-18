import { GET } from "./js/get.js";
import { API_KEY } from "./js/keys.js";
import { renderCardList } from "./js/renderCardList.js";
import { translations } from "./js/translations.js";



const mainContainerEl = document.querySelector(".main-container");
const genreListEl = document.querySelector(".genres");
const navbarContainerEl = document.querySelector('.navbar-container');
const pageButtons = document.querySelectorAll(".page-btn");
const sidebarMenuEl = document.querySelector(".sidebar-menu");
const selectLanguageEl = document.querySelector("#select-language");

let page = 1;
let results = [];
let type = "movie";
let category = "popular";
let query = "";
let language = 'en-US'; 


//Change the language of api data

  selectLanguageEl.addEventListener("change", () => {
  language = selectLanguageEl.value;
  render();
});


//Rendering first page
const render = async () => {
  const endpoint = `${type}/${category}`;
  const response = await GET(endpoint, page, query, language);
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

// Filtering genre
    genreBtnEl.addEventListener('click', async (event) => {
      const genreID = event.target.id;
      // console.log(genreID);
      const filterGenre = await GET(`discover/${type}`, page, `with_genres=${genreID}`);
      const filterResult = filterGenre.results;
      renderCardList(filterResult, mainContainerEl);
    })
  })

  };

getGenreList();


//Type Filter
navbarContainerEl.addEventListener('click', (event) => {
  if(event.target.tagName === 'A') {
    const typeID = event.target.id;
    type = typeID;
    page = 1;
    category = 'popular';
    render();
  }
    
})




//Page buttons
pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    
    if(button.classList.contains('left')) {
      if(page <= 1) return;
      page--;
    } else {
      page++;
    }
    console.log(page);
    render();
  });
});

//Category Filter
sidebarMenuEl.addEventListener('click', (event) => {
  const id = event.target.id;
  switch(id) {
    case 'upcoming': 
      category = id;
      render();
    break;
    case 'top_rated':
      category = id;
      render();
      default: break
  }
})



//Search Movie Title
const searchInputEl = document.querySelector('.search-input');
const searchButtonEl = document.querySelector('.search-icon');

searchButtonEl.addEventListener('click', async () => {
  let inputValue = searchInputEl.value;
  const search = await GET(`search/${type}`, page, `query=${inputValue}`);
  const searchResult = search.results;
  renderCardList(searchResult, mainContainerEl);
  
})



// languages

// const languages = async () => {
//   const getLanguages = await GET(`configuration/languages`);
//   console.log(getLanguages)
// }
// // https://api.themoviedb.org/3/configuration/languages
// languages();