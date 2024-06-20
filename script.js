import { GET } from "./js/get.js";
import { renderCard, renderCardList } from "./js/renderCardList.js";
import { translations } from "./js/translations.js";



const mainContainerEl = document.querySelector(".main-container");
const genreListEl = document.querySelector(".genres");
const navbarContainerEl = document.querySelector('.navbar-container');
const pageButtons = document.querySelectorAll(".page-btn");
const sidebarMenuEl = document.querySelector(".sidebar-menu");
const selectLanguageEl = document.querySelector("#select-language");


// const dialogEl = document.querySelector('.dialog');


let page = 1;
let results = [];
let type = "movie";
let category = "popular";
let endpoint = `${type}/${category}`;
let query = "";
let language = ""; 
let movieID = 0;
let movieObject = {};
let favoriteMovies = [];


//Rendering first page
const render = async (endpoint, query) => {

  const response = await GET(endpoint, page, query, language);
  results = response.results;
  renderCardList(results, mainContainerEl);
};

render(endpoint, query);

//Change the language of api data
 selectLanguageEl.addEventListener("change", () => {
  language = selectLanguageEl.value;
  getGenreList();
  render(endpoint, query);
});



let favoriteItems = [];


 function favoriteMoviesHandler(button) {
    movieID = Number(button.id);
    console.log('movie ID', movieID);
    movieObject = JSON.parse(button.dataset.item);
    console.log('movie object', movieObject);

   const favoriteButton = document.getElementById(movieID);
    
    
    const movieFound = favoriteItems.find(item => Number(item.id) === movieID) 

    
   if(movieFound) {
    favoriteButton.textContent = 'Add to favorite'
    favoriteItems = favoriteItems.filter(item => Number(item.id) !== movieID)
    } else {
      favoriteButton.textContent = "Remove from favorite";
      favoriteItems.push(movieObject);
    }
    console.log('favorite items', favoriteItems);


    //  renderCardList(favoriteMovies, mainContainerEl);
   }

  // if(event.target.tagName  === 'BUTTON') {
  //   favoriteMoviesHandler(event.target);
  // }
  //ovo dole



mainContainerEl.addEventListener('click', (event) => {
  if(event.target.tagName === 'BUTTON') {
  favoriteMoviesHandler(event.target);
  }
 

})




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
      

      
       render(endpoint, query);


    })
  })
  
  
};

getGenreList();


//Type Filter
navbarContainerEl.addEventListener('click', (event) => {
  if(event.target.tagName === 'A') {

    const links = navbarContainerEl.querySelectorAll("a");
    links.forEach((link) => link.classList.remove("active"));

    event.target.classList.add("active");
    
    // event.target.classList.add('active');
    const typeID = event.target.id;
    type = typeID;
    page = 1;
    // category = 'popular';
    endpoint = `${type}/${category}`;
    render(endpoint, query);
  }
    
})

//top rated series do not exist! debugg
//Category Filter
sidebarMenuEl.addEventListener('click', (event) => {
  const id = event.target.id;
  switch (id) {
    case "upcoming":
    case "top_rated":
      category = id;
      page = 1;
      endpoint = `${type}/${category}`;
      render(endpoint);
      break;
    case "home":
      render(endpoint, query);
      break;
    case "favorites":
      mainContainerEl.innerHTML = ''
      const buttons = mainContainerEl.childNodes;
      console.log(buttons);
      
      // console.log(buttons.firstChild);
        renderCardList(favoriteItems, mainContainerEl);

      break;
    default:
      break;
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
  render(endpoint, query);

})

// Disable search button if input is empty
searchInputEl.addEventListener('input', () => {
  if (searchInputEl.value.trim() === '') {
    searchButtonEl.disabled = true;
  } else {
    searchButtonEl.disabled = false;
  }
});


// // Page buttons
// pageButtons.forEach((button) => {
//   button.addEventListener('click', async () => {
//     if(button.classList.contains('left')) {
//       if(page <= 1) return;
//       page--;
//     } else {
//       page++;
//     }
//     const newPageResults = await GET(endpoint, page, query, language)
//     console.log(newPageResults);
//     await render();
//   });
// }); 