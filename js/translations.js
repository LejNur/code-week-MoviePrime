//Static text translation

export const translations = {
  en_US: {
    movie: "Movies",
    tv: "Series",
    welcome: "Welcome,",
    home: "Home",
    favorites: "Favorites",
    upcoming: "Coming Soon",
    topRated: "Top Rated",
    genres: "Genres",
    logout: "LogOut",
   
  },

  "it-IT": {
    movie: "Film",
    tv: "Serie",
    welcome: "Benvenuto",
    home: "Home",
    favorites: "Preferiti",
    upcoming: "Prossimamente",
    topRated: "Più Votati",
    genres: "Generi",
    logout: "Disconnettersi",
    
  },

  "fr-FR": {
    movie: "Films",
    tv: "Séries",
    welcome: "Bienvenue, ",
    home: "Accueil",
    favorites: "Favoris",
    upcoming: "À venir",
    topRated: "Les mieux notés",
    genres: "Genres",
    logout: "Se déconnecter",
    
  },

  "es-ES": {
    movie: "Películas",
    tv: "Series",
    welcome: "Bienvenido, ",
    home: "Inicio",
    favorites: "Favoritos",
    upcoming: "Próximamente",
    topRated: "Mejor Calificados",
    genres: "Géneros",
    logout: "Cerrar sesión",
    
  },
};


document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('select-language');

  const updateContent = () => {
    const selectedLanguage = languageSelector.value;
    const translation = translations[selectedLanguage];

    document.querySelectorAll('[data-translate-key]').forEach(el => {
      const key = el.getAttribute('data-translate-key');
      if (key in translation) {
          el.textContent = translation[key];
      } else {
        console.log('Error')
      }
    });
  };

  languageSelector.addEventListener('change', updateContent);

  // Initial translation on page load
  updateContent();
});
