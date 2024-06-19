import { GET } from "./js/get.js";
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
let endpoint = '';
let type = "movie";
let category = "popular";
let query = "";
let language = ""; 
let movieID = 0;

//Rendering first page
const render = async () => {
  endpoint = `${type}/${category}`;
  const response = await GET(endpoint, page, query, language);
  results = response.results;
  renderCardList(results, mainContainerEl);
  
};

//api.themoviedb.org/3/movie/{movie_id}
mainContainerEl.addEventListener('click', async (event) => {
  if(event.target.tagName === 'BUTTON') {
    movieID = event.target.id;
    console.log(movieID);
    endpoint = `${type}/${movieID}`
    const movieDetails = await GET(endpoint, page)
    console.log(movieDetails);
    
  } 
})

//Change the language of api data
 selectLanguageEl.addEventListener("change", () => {
  language = selectLanguageEl.value;
  getGenreList();
  render();
});


//Getting all the movie genres
const getGenreList = async () => {
  const genreList = await GET("genre/movie/list", 1, '',  language);
  genreListEl.innerHTML = "";

  genreList.genres.forEach((genre) => {
    const genreBtnEl = document.createElement('button');
    genreBtnEl.className = 'genre';
    genreBtnEl.textContent = genre.name;
    genreBtnEl.id = genre.id;

    genreListEl.appendChild(genreBtnEl);

// Filtering genre
    genreBtnEl.addEventListener('click', async (event) => {
        document.querySelectorAll(".genre").forEach((btn) => btn.classList.remove("active"));
        genreBtnEl.classList.add("active");

      const genreID = event.target.id;
      endpoint = `discover/${type}`;
      query = `with_genres=${genreID}`;
      const filterGenre = await GET(endpoint, page, query, language);
      const filterResult = filterGenre.results;
      renderCardList(filterResult, mainContainerEl);

      
    })
  })
  render();
  
};

getGenreList();


//Type Filter
navbarContainerEl.addEventListener('click', (event) => {
  if(event.target.tagName === 'A') {

    const links = navbarContainerEl.querySelectorAll("a");
    links.forEach((link) => link.classList.remove("active"));

    event.target.classList.add("active");
    event.target.classList.add('active');
    const typeID = event.target.id;
    type = typeID;
    page = 1;
    category = 'popular';
    render();
  }
    
})


//Category Filter
sidebarMenuEl.addEventListener('click', (event) => {
  const id = event.target.id;
  switch(id) {
    case 'upcoming': 
      category = id;
      page = 1;
      render();
    break;
    case 'top_rated':
      category = id;
      page = 1;
      render();
      default: break
  }
})



//Search Movie Title
const searchInputEl = document.querySelector('.search-input');
const searchButtonEl = document.querySelector('.search-icon');

searchButtonEl.addEventListener('click', async () => {
  let inputValue = searchInputEl.value;
  // Check if input value is empty
  if (!inputValue) {
    return; 
  }
  endpoint = `search/${type}`;
  query = `query=${inputValue}`;
  const search = await GET(endpoint, page, query);
  const searchResult = search.results;
  renderCardList(searchResult, mainContainerEl);
})

// Disable search button if input is empty
searchInputEl.addEventListener('input', () => {
  if (searchInputEl.value.trim() === '') {
    searchButtonEl.disabled = true;
  } else {
    searchButtonEl.disabled = false;
  }
});


// Page buttons
pageButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    if(button.classList.contains('left')) {
      if(page <= 1) return;
      page--;
    } else {
      page++;
    }
    const newPageResults = await GET(endpoint, page, query, language)
    console.log(newPageResults);
    renderCardList(newPageResults.results, mainContainerEl)
  });
}); 