//Rendering Movie Card List
export function renderCardList(items, container) {
  container.innerHTML = "";

  items.forEach(item => {
    
    renderCard(item, container)
  })


  // container.innerHTML = "";
  // movies.forEach((movie) => {
  //   const card = document.createElement("div");
  //   const cardBtn = document.createElement('button');
  //   // const cardContent = document.createElement("div");
  //   // const cardTitle = document.createElement("h3");
  //   // const cardInfos = document.createElement("p");

  //   card.className = "card";
  //   card.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.poster_path}')`;
  //   cardBtn.classList = button.classList;
  //   cardBtn.textContent = button.textContent;
  //   cardBtn.id = movie.id;
  //   cardBtn.dataset.movie = JSON.stringify(movie);
  //   // cardContent.className = 'card-content';
  //   // cardTitle.textContent = movie.title ?? movie.name;
  //   // cardInfos.textContent = (movie.release_date ?? movie.first_air_date).substring(0,4);
   
  //   container.append(card);
  //   card.appendChild(cardBtn);
    
  //   // card.appendChild(cardContent);
  //   // cardContent.appendChild(cardTitle);
  //   // cardContent.appendChild(cardInfos);



  // });
}


export function renderCard(item, container) {
  const card = document.createElement("div");
  const cardBtn = document.createElement("button");

  const cardContent = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardInfos = document.createElement("p");

  cardContent.className = 'card-content';
    cardTitle.textContent = item.title ?? item.name;
    cardInfos.textContent = (item.release_date ?? item.first_air_date).substring(0,4);

  card.className = "card";
  card.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${item.poster_path}')`;

  card.id = `movie-${item.id}`;
  cardBtn.className = "card-btn";
  cardBtn.textContent = item.isFavorite ? "-" : "+";

  // cardBtn.id = item.id
  cardBtn.id = `button-${item.id}`;
  cardBtn.dataset.item = JSON.stringify(item);

  cardContent.append(cardTitle);
  cardContent.append(cardInfos);

  card.appendChild(cardBtn);
  card.appendChild(cardContent);
  container.append(card);
  
}

{/* <i class="fa-solid fa-heart"></i>;filled */}
{/* <i class="fa-regular fa-heart"></i>;outline */}

