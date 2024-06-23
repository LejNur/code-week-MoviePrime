import { GET } from "./js/get.js";
import { renderCard, renderCardList } from "./js/renderCardList.js";
import { translations } from "./js/translations.js";
import { singleMovie } from "./js/singleMovie.js";
import { videoTrailer } from "./js/singleMovie.js";



const mainContainerEl = document.querySelector(".main-container");
const genreListEl = document.querySelector(".genres");
const navbarContainerEl = document.querySelector('.navbar-container');
const pageButtons = document.querySelectorAll(".page-btn");
const sidebarMenuEl = document.querySelector(".sidebar-menu");
const selectLanguageEl = document.querySelector("#select-language");
const dialogEl = document.querySelector('.dialog');


let page = 1;
let results = [];
let type = "movie";
let category = "popular";
let endpoint = `${type}/${category}`;
let query = "";
let language = ""; 
let movieObj;
let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];



//Rendering first page
  const render = async (endpoint, query) => {

    const response = await GET(endpoint, page, query, language);

    results = response.results.map((movie) => ({...movie, isFavorite: favoriteMovies.find((fav) => fav.id === movie.id),
    }));
    // console.log(results);

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

//open dialog on add to favorites and close it on setTimeout
      if(event.target.textContent === '+') {
        dialogEl.showModal();
        dialogEl.textContent = 'Movie added to your favorites!';
        setTimeout(() => {
          dialogEl.close()
        }, 2000)
      }

      movieObj = JSON.parse(event.target.dataset.item);
      results = results.map((movie) =>
        movie.id === movieObj.id ? { ...movie, isFavorite: true } : movie
      );

      favoriteMoviesHandler({ ...movieObj, isFavorite: true });
      renderCardList(results, mainContainerEl);


//remove button
      if (event.target.textContent === "-") {

 //closing modal with control       
        dialogEl.showModal();
        dialogEl.textContent = 'Are you sure you want to remove the movie from favorites?';
        const buttonContainer = document.createElement('div');
        const buttonYes = document.createElement('button');
        const buttonNo = document.createElement('button');

        buttonContainer.className = 'button-container';
        buttonYes.className = 'dialog-btn-yes';
        buttonNo.className = 'dialog-btn-no';

        buttonYes.textContent = 'Yes';
        buttonNo.textContent = 'No';

        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        dialogEl.append(buttonContainer);


//button Yes
        buttonYes.addEventListener('click', () => {
          dialogEl.textContent = "Movie removed from your list of favorites!";

          movieObj = JSON.parse(event.target.dataset.item);
          results = results.map((movie) =>
            movie.id === movieObj.id ? { ...movie, isFavorite: false } : movie
          );

          removeFavoriteMovie({ ...movieObj, isFavorite: false });
          renderCardList(results, mainContainerEl);

          setTimeout(() => {
            dialogEl.close();
          }, 2000);
        })


  //button No
        buttonNo.addEventListener('click', () => {
          dialogEl.close();
        })
      }
    }
  }); 



// // let favoriteItems = [];
//  function favoriteMoviesHandler(button) {
//    movieID = Number(button.id);
//    console.log("movie ID", movieID);
//    movieObj = JSON.parse(button.dataset.item);
//    console.log("movie object", movieObj);

//    const favoriteButton = document.getElementById(movieID);

//    const movieFound = favoriteMovies.find((item) => Number(item.id) === movieID);

//    if (movieFound) {
//      favoriteButton.textContent = "Add to favorites";
//      favoriteMovies = favoriteMovies.filter(
//        (item) => Number(item.id) !== movieID
//      );
//    }
//     else {
//       favoriteButton.textContent = "Remove from favorite";
//       favoriteMovies.push(movieObj);
//     }
//    console.log("favorite items", favoriteMovies);
   

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
       //close menu on mobile
       setTimeout(() => {
        sidebarMenuEl.classList.toggle("show");
       }, 1000)



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

    const typeID = event.target.id;
    type = typeID;
    page = 1;

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
      render('movie/popular', query);
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

//Search on button click
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

//Search on Enter keyup
searchInputEl.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
      let inputValue = searchInputEl.value;
      // Check if input value is empty
      if (!inputValue) {
        return;
      }
      endpoint = `search/${type}`;
      query = `query=${inputValue}`;
      render(endpoint, query);
  } return;
});



// Pagination buttons
pageButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    if(button.classList.contains('left')) {
      if(page <= 1) return;
      page--;
    } else {
      page++;
    }
    render(endpoint, query);

  });
}); 



// single movie function
mainContainerEl.addEventListener('click', async (event) => {
  let card = event.target;
  let cardID = Number(event.target.id);
  if(card.className === 'card') {
    console.log('card-----', event.target, 'id card-----', cardID);

    const result = await GET(`${type}/${cardID}`, page, query, language);
    console.log(result)
    singleMovie(result, mainContainerEl);
    const video = await GET(`${type}/${cardID}/videos`, page, query, language);
    videoTrailer(video.results, mainContainerEl);
  }
})


//hamburger menu 
const burgerBtn = document.querySelector('.burger-btn');
burgerBtn.addEventListener('click', () => {
  sidebarMenuEl.classList.toggle('show');
})