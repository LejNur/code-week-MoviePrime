export function singleMovie(movie, container) {
  container.innerHTML = "";

  const movieContainerEl = document.createElement("div");
  const posterEl = document.createElement("img");
  const movieDetailsEl = document.createElement("div");
  const titleEl = document.createElement("h2");
  const subtitleEl = document.createElement("p");
  const descriptionEl = document.createElement("p");
  const taglineEl = document.createElement("p");

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "X";

  //Cast container
  const castEl = document.createElement("div");

  movieContainerEl.classList.add("movie-container", "overlay");
  movieContainerEl.id = "MOVIE";
  movieContainerEl.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${movie.backdrop_path}')`;
  posterEl.className = "movie-poster";
  posterEl.src = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
  movieDetailsEl.className = "movie-content";

  titleEl.textContent = movie.title;
  subtitleEl.textContent = `Original Language: ${
    movie.original_language
  } | Duration: ${movie.runtime}minutes | Vote: ${movie.vote_average.toFixed(
    1
  )}`;
  subtitleEl.className = "subtitle-paragraph";
  descriptionEl.className = "description-paragraph";
  taglineEl.className = "tagline";
  descriptionEl.textContent = movie.overview;
  taglineEl.textContent = `"${movie.tagline}"`;

  castEl.className = "cast-container";
  const credits = movie.credits.cast.slice(0, 6);

  credits.forEach((credit) => {
    const castBox = document.createElement("div");
    castBox.className = "cast-box";
    const castImg = document.createElement("img");
    castImg.src = `https://image.tmdb.org/t/p/w185${credit.profile_path}`;

    const castName = document.createElement("p");
    castName.textContent = `${credit.original_name}`;
    castBox.appendChild(castImg);
    castBox.appendChild(castName);
    castEl.appendChild(castBox);
  });

  movieContainerEl.appendChild(posterEl);
  movieDetailsEl.appendChild(titleEl);
  movieDetailsEl.appendChild(subtitleEl);
  movieDetailsEl.appendChild(descriptionEl);
  movieDetailsEl.appendChild(taglineEl);
  movieDetailsEl.appendChild(closeBtn);
  movieContainerEl.appendChild(movieDetailsEl);
  container.appendChild(movieContainerEl);

  container.appendChild(castEl);
}

export function videoTrailer(trailers, container) {
  trailers.forEach((trailer) => {
    if (trailer.type === "Trailer" && trailer.name === "Official Trailer") {
      const iframeEl = document.createElement("iframe");

      iframeEl.className = "video";
      iframeEl.src = `https://www.youtube-nocookie.com/embed/${trailer.key}`;
      iframeEl.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframeEl.allowFullscreen = true;

      container.append(iframeEl);
    }
  });
}
