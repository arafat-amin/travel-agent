<script setup>
const { data: tours, error } = useFetch("https://dummyjson.com/products");
console.log(tours);
</script>

<template>
  <div>
    <h1>Welcome to Travel Agent 🌍</h1>
    <p>This is your first Nuxt page!</p>

    <div v-if="error">Error fetching tours! {{ error }}</div>
    <div v-else-if="!tours">loading...</div>

    <div v-else class="tours">
      <div v-for="tour in tours.products" :key="tour.id" class="tour-card">
        <NuxtLink :to="`/tour/${tour.id}`">
          <img :src="tour.thumbnail" alt="" />
        </NuxtLink>
        <NuxtLink :to="`/tour/${tour.id}`">
          <h2>{{ tour.title }}</h2>
        </NuxtLink>
        <p>{{ tour.description }}</p>
        <span>{{ tour.price }}</span>
      </div>
    </div>
  </div>
</template>

<style>
.tours {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.tour-card {
  width: 30%;
  padding: 15px 20px;
  border: 1px solid #ccc;
  margin-block: 15px;
}

.tour-card img {
  margin-inline: auto;
  max-width: 100%;
  display: block;
}
</style>