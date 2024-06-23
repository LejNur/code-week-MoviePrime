//Rendering Movie Card List
export function renderCardList(items, container) {
  container.innerHTML = "";

  items.forEach(item => {
    renderCard(item, container)
  })
  

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
  card.id = item.id;

  cardBtn.className = "card-btn";
  cardBtn.textContent = item.isFavorite ? "-" : "+";

  cardBtn.id = `button-${item.id}`;
  cardBtn.dataset.item = JSON.stringify(item);

  cardContent.appendChild(cardBtn);
  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardInfos);

  card.appendChild(cardContent);
  
  container.appendChild(card);
  
  
}



