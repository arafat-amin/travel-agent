<script setup>
import { computed } from 'vue';
import { useFavoritesStore } from './store/favorites';
const { favorites } = useFavoritesStore();

// Ensure localStorage updates after hydration
onMounted(() => { 
  const storedFavorites = localStorage.getItem("favorites");
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
})

watch(favorites, () => {
  console.log('Favorites updated:', favorites.value);
})

const favoriteCount = computed(() => favorites.value.length)
</script>

<template>
  <div>

    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/">Home </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/favorites" 
            :class="{ disabled: favoriteCount === 0 }">Favorites ({{ favoriteCount }}) </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <NuxtPage />
    <!-- <div
      class="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center"
    >
      <h1 class="text-4xl font-bold">Welcome to Travel Agent 🌍 Layout page</h1>
    </div> -->
   
  </div>
</template>

<style scoped>
header {
  background-color: #ccc;
  padding: 10px 15px;
}
ul {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
}
ul li a{
  text-decoration: none;
  font-size: 20px;
  color: black;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
