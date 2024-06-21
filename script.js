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
// let movieID = 0;
let movieObj;
let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];



//Rendering first page
const render = async (endpoint, query) => {

  const response = await GET(endpoint, page, query, language);
  // results = response.results;
  results = response.results.map((movie) => ({...movie, isFavorite: favoriteMovies.find((fav) => fav.id === movie.id),
  }));
  renderCardList(results, mainContainerEl);
};

window.onload = () => render(endpoint, query);


//Change the language of api data
 selectLanguageEl.addEventListener("change", () => {
  language = selectLanguageEl.value;
  getGenreList();
  render(endpoint, query);
});

//Handling favorite movies
function favoriteMoviesHandler(movie) {
  if (favoriteMovies.find((item) => item.id === movie.id)) return;
  favoriteMovies.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
}

function removeFavoriteMovie(movie) {
  favoriteMovies = favoriteMovies.filter((item) => item.id !== movie.id);
  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  renderCardList(favoriteMovies, mainContainerEl);
}

mainContainerEl.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    movieObj = JSON.parse(event.target.dataset.item);
    
    results = results.map((movie) =>
      movie.id === movieObj.id ? { ...movie, isFavorite: true } : movie
    );
    favoriteMoviesHandler({ ...movieObj, isFavorite: true });
    renderCardList(results, mainContainerEl);
  }

  if (event.target.textContent === "-") {
    movieObj = JSON.parse(event.target.dataset.item);
    results = results.map((movie) =>
      movie.id === movieObj.id ? { ...movie, isFavorite: false } : movie
    );
    removeFavoriteMovie({ ...movieObj, isFavorite: false });
    renderCardList(results, mainContainerEl);
  }
});


//Moja 
// let favoriteItems = [];
//  function favoriteMoviesHandler(button) {
//    movieID = Number(button.id);
//    console.log("movie ID", movieID);
//    movieObject = JSON.parse(button.dataset.item);
//    console.log("movie object", movieObject);

//    const favoriteButton = document.getElementById(movieID);

//    const movieFound = favoriteItems.find((item) => Number(item.id) === movieID);

//    if (movieFound) {
//      favoriteButton.textContent = "Add to favorites";
//      favoriteItems = favoriteItems.filter(
//        (item) => Number(item.id) !== movieID
//      );
//    }
//     else {
//       favoriteButton.textContent = "Remove from favorite";
//       favoriteItems.push(movieObject);
//     }
//    console.log("favorite items", favoriteItems);
   

//    //  renderCardList(favoriteMovies, mainContainerEl);
//  }



// mainContainerEl.addEventListener('click', (event) => {
//   if(event.target.tagName === 'BUTTON') {
//     favoriteMoviesHandler(event.target);
//   }
 

// })




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
      renderCardList(favoriteMovies, mainContainerEl);
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