export function singleMovie (movie, container) {
  container.innerHTML = "";

  const movieContainerEl = document.createElement('div');
  const posterEl = document.createElement('img');
  const movieDetailsEl = document.createElement('div');
  const titleEl = document.createElement('h2');
  const subtitleEl = document.createElement('p');
  const descriptionEl = document.createElement('p');
  const taglineEl = document.createElement('p');

  movieContainerEl.className = 'movie-container';
  posterEl.className = 'movie-poster';
  posterEl.src = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
  movieDetailsEl.className = 'movie-content';


  titleEl.textContent = movie.title;
  subtitleEl.textContent = `${movie.original_language},${movie.runtime}`;
  descriptionEl.textContent = movie.overview;
  taglineEl.textContent = movie.tagline;

  movieContainerEl.appendChild(posterEl);
  movieDetailsEl.appendChild(titleEl);
  movieDetailsEl.appendChild(subtitleEl);
  movieDetailsEl.appendChild(descriptionEl);
  movieDetailsEl.appendChild(taglineEl);
  movieContainerEl.appendChild(movieDetailsEl);

  container.appendChild(movieContainerEl);

  container.append(movieContainerEl);

}


// https://api.themoviedb.org/3/movie/{movie_id}