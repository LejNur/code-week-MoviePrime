//Static text translation

export const translations = {
  en_US: {
    movie: "Movies",
    tv: "Series",
    welcome: " Welcome",
    home: "Home",
    favorites: "Favorites",
    upcoming: "Upcoming",
    topRated: "Top Rated",
    genres: "Genres",
    logout: "LogOut",
    addedToFavorites: "Movie added to favorites!",
    confirmRemoveFromFavorites:
      "Are you sure you want to remove the movie from favorites?",
    removedFromFavorites: "Movie removed from your list of favorites!",
    yes: "Yes",
    no: "No",
  },

  "it-IT": {
    movie: "Film",
    tv: "Serie",
    welcome: " Benvenuto",
    home: "Home",
    favorites: "Preferiti",
    upcoming: "Prossimamente",
    topRated: "Più Votati",
    genres: "Generi",
    logout: "Disconnettersi",
    addedToFavorites: "Film aggiunto ai preferiti!",
    confirmRemoveFromFavorites:
      "Sei sicuro di voler rimuovere il film dai preferiti?",
    removedFromFavorites: "Film rimosso dalla tua lista dei preferiti!",
    yes: "Sì",
    no: "No",
  },

  "fr-FR": {
    movie: "Films",
    tv: "Séries",
    welcome: " Bienvenue",
    home: "Accueil",
    favorites: "Favoris",
    upcoming: "À venir",
    topRated: "Les mieux notés",
    genres: "Genres",
    logout: "Se déconnecter",
    addedToFavorites: "Film ajouté aux favoris !",
    confirmRemoveFromFavorites:
      "Êtes-vous sûr de vouloir supprimer le film des favoris ?",
    removedFromFavorites: "Film retiré de votre liste de favoris !",
    yes: "Oui",
    no: "Non",
  },

  "es-ES": {
    movie: "Películas",
    tv: "Series",
    welcome: " Bienvenido",
    home: "Inicio",
    favorites: "Favoritos",
    upcoming: "Próximamente",
    topRated: "Mejor Calificados",
    genres: "Géneros",
    logout: "Cerrar sesión",
    addedToFavorites: "¡Película añadida a favoritos!",
    confirmRemoveFromFavorites:
      "¿Estás seguro de que quieres quitar la película de favoritos?",
    removedFromFavorites: "¡Película eliminada de tu lista de favoritos!",
    yes: "Sí",
    no: "No",
  },
};


document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('select-language');

  const updateContent = () => {
    const selectedLanguage = languageSelector.value;
    const translation = translations[selectedLanguage];

    document.querySelectorAll('[data-translate-key]').forEach(el => {
      const key = el.getAttribute('data-translate-key');
      const iconElement = el.querySelector("i");
      if (translation[key] && iconElement) {
        el.innerHTML = ""; 
        el.appendChild(iconElement); 
        el.insertAdjacentHTML("beforeend", translation[key]); 
      }
    });
  };

  languageSelector.addEventListener('change', updateContent);
  updateContent();
});
