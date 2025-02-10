<script setup>
const route = useRoute();
const { data: tour, error } = useFetch(
  `https://dummyjson.com/products/${route.params.id}`
);
console.log(tour);
</script>

<template>
  <div>
    <!-- Back to Tours Page -->
    <NuxtLink to="/">Back to Tours page</NuxtLink>
    <!-- Error Handling -->
    <div v-if="error">Error fetching tours! {{ error.message }}</div>
    <!-- Loading State -->
    <div v-else-if="!tour">loading...</div>
    <!-- Display Tour Data -->
    <div v-else class="tour-card">
      <h1>{{ tour.title }}</h1>
      <img :src="tour.thumbnail" :alt="tour.title"  class="tour-image"/>
      <p class="description">{{ tour.description }}</p>
      <span class="price">{{ tour.price }}</span>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  text-align: center;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: blue;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}

.tour-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.tour-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;
}

.description {
  font-size: 16px;
  color: #555;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: green;
}
</style>