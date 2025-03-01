<script setup>
const { data: tours, error } = useFetch("https://dummyjson.com/products");

import { useFavoritesStore } from "~/store/favorites.js";

const { favorites, toggleFavorite } = useFavoritesStore();

const filteredTours = computed(() => {
  if (!tours.value) return []; // Ensure tours are available
  return tours.value.products.filter((tour) => {
    // const tourId = tour.id;
    return favorites.value.includes(tour.id);
  })
});

const removeFavorite = (id) => {
  favorites.value = favorites.value.filter((favId) => favId !== id)
   // Save favorites to localStorage
   localStorage.setItem("favorites", JSON.stringify(favorites.value));
}
</script>

<template>
  <div>
    <h1>Welcome to Favorites List</h1>
    <!-- <NuxtPage /> -->

    <div v-if="error">Error fetching tours! {{ error }}</div>
    <div v-else-if="!tours">Loading...</div>

    <div v-else class="tours">
      <!-- The Message when no result match -->
      <div v-if="filteredTours.length === 0">No favorite tours yet.</div>

      <div v-for="tour in filteredTours" :key="tour.id" class="tour-card">
        <NuxtLink :to="`/tour/${tour.id}`">
          <img :src="tour.thumbnail" alt="" />
        </NuxtLink>
        <NuxtLink :to="`/tour/${tour.id}`">
          <h2>{{ tour.title }}</h2>
        </NuxtLink>
        <div class="flex items-center justify-between">
          <span>{{ tour.category }}</span>
          <button
            class="hart-icon"
            @click="removeFavorite(tour.id)"
          >
            x
          </button>
        </div>
        <p>{{ tour.description }}</p>
        <span>{{ tour.price }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.filter {
  display: flex;
  justify-content: center;
}

.filter select {
  width: 150px;
  margin-inline-end: 10px;
  padding: 15px 10px;
  border: 1px solid #929292;
  border-radius: 6px;
}
.tours {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.tour-card {
  width: 30%;
  max-width: 550px;
  padding: 15px 20px;
  border: 1px solid #ccc;
  margin-block: 15px;
}

.tour-card img {
  margin-inline: auto;
  max-width: 100%;
  display: block;
}

.search-input {
  width: 30%;
  height: 20px;
  border: 1px solid #929292;
  border-radius: 6px;
  padding: 20px 15px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.hart-icon {
  font-size: 25px;
}
</style>
