import { GET } from "./js/get.js";
import { renderCardList } from "./js/renderCardList.js";
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
let movieDetails = {};
let favoriteMovies = [];


//Rendering first page
const render = async (endpoint, query) => {
  // endpoint = `${type}/${category}`;
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





 function favoriteMoviesHandler(button) {
    movieID = button.id;
    console.log(movieID);
    movieDetails = JSON.parse(button.dataset.item);
    console.log(movieDetails);

   if (button.classList.contains('add-btn')) {
     favoriteMovies.push(movieDetails);

     button.classList.remove("add-btn");
     button.classList.add("remove-btn");

     console.log(button.classList);
    //  button.style.display = "none";
   } else if (button.classList.contains("remove-btn")) {
     favoriteMovies = favoriteMovies.filter(
       (movie) => movie.id !== movieDetails.id
     );
     console.log(favoriteMovies);
    renderCardList(favoriteMovies, mainContainerEl);
   }}

//   //  if (button.classList.contains("add-btn")) {
//   //    favoriteMovies.push(movieDetails);
//   //    button.classList.remove('add-btn')
//   //    button.classList.add('remove-btn')
//   //    button.style.display = "none"; 
//   //  } else if (button.classList.contains("remove-btn")) {
//   //    favoriteMovies = favoriteMovies.filter(
//   //      (movie) => movie.id !== movieDetails.id
//   //    );
//   //    renderCardList(favoriteMovies, mainContainerEl);
//   //  }
//  }

mainContainerEl.addEventListener('click', (event) => {
  if(event.target.tagName === 'BUTTON') {
    favoriteMoviesHandler(event.target);
    // console.log(event.target);
  }
  // favoriteMoviesHandler(event.target)
  // if(event.target.classList.contains('action')) {
  //   favoriteMoviesHandler(event.target);
  // }
  // if(event.target.classList.contains('action')){
  //   movieID = event.target.id;
  //   console.log(movieID);
  //   movieDetails = JSON.parse(event.target.dataset.movie);

  //   if (event.target.classList.contains('add-btn')) {
  //     favoriteMovies.push(movieDetails);
  //     event.target.style.display = 'none';

  //   } else if (event.target.classList.contains('remove-btn')) {
  //     favoriteMovies = favoriteMovies.filter((movie) => movie.id !== movieDetails.id);

  //     renderCardList(favoriteMovies, mainContainerEl, {
  //       textContent: "Remove",
  //       classList: "action remove-btn",
  //     });

  //   }
  // }
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
      
      // const filterGenre = await GET(endpoint, page, query, language);
      // const filterResult = filterGenre.results;
      
       render(endpoint, query);
      // renderCardList(filterResult, mainContainerEl);

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

//top rated series do not exist! debugg tomorrow
//Category Filter
sidebarMenuEl.addEventListener('click', (event) => {
  const id = event.target.id;
  switch(id) {
    case 'upcoming': 
    case 'top_rated':
      category = id;
      page = 1;
      endpoint = `${type}/${category}`
      render(endpoint);
      break;
    case 'favorites':
      renderCardList(favoriteMovies, mainContainerEl);
    // renderCardList(favoriteMovies, mainContainerEl, {textContent: 'Remove from favorites', classList: 'action remove-btn'});
    break;
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
  render(endpoint, query);
  // const search = await GET(endpoint, page, query);
  // const searchResult = search.results;
  // renderCardList(searchResult, mainContainerEl);
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