//Rendering Movie Card List
export function renderCardList(movies, container) {

  container.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardTitle = document.createElement("h3");
    const cardInfos = document.createElement("p");

    card.className = "card";
    card.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.poster_path}')`;
    cardContent.className = 'card-content';
    cardTitle.textContent = movie.title ?? movie.name;
    cardInfos.textContent = (movie.release_date ?? movie.first_air_date).substring(0,4);
   
    container.append(card);
    card.appendChild(cardContent);
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardInfos);

  });
}
