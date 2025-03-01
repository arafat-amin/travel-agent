import { ref } from "vue";

export const useFavoritesStore = () => {
  const favorites = ref([]);

  if (import.meta.client) {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      favorites.value = JSON.parse(storedFavorites);
    }
  }

  const toggleFavorite = (id) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter((favId) => favId !== id);
    } else {
      // ✅ Add to favorites (only if not already there)
      favorites.value.push(id);
    }
    console.log(favorites.value);

    // Save favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  return { favorites, toggleFavorite }
};
