<script setup>
import { ref, computed } from "vue";

const { data: tours, error } = useFetch("https://dummyjson.com/products");

const searchQuery = ref("");
const categoryList = ref("");
const sortOrder = ref(""); // Added sorting variable

const currentPage = ref(1); // Added for Pagination
const toursPerPage = 6; //Show 6 tours per page

// Generate Unique Categories
const uniqueCategories = computed(() => {
  if (!tours.value) return [];
  return [...new Set(tours.value.products.map((tour) => tour.category))];
});

// Filter & Sort Tours
const filteredTours = computed(() => {
  if (!tours.value) return [];

  // Step 1: Filter by Search & Category
  let filtered = tours.value.products.filter((tour) => {
    const matchesSearch = tour.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = categoryList.value === "" || tour.category === categoryList.value;
    return matchesSearch && matchesCategory;
  });

  // Step 2: Apply Sorting
  if (sortOrder.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
});

// Paginated Tours (Only Show 6 per Page)

const paginatedTours = computed(() => {
  if (!filteredTours.value) return [];

  const start = (currentPage.value - 1) * toursPerPage;
  console.log(start)
  const end = start + toursPerPage;

  return filteredTours.value.slice(start, end);
});

// ✅ Calculate Total Pages
const totalPages = computed(() => Math.ceil(filteredTours.value.length / toursPerPage));

watch([searchQuery, categoryList, sortOrder], () => {
  currentPage.value = 1;
});
</script>

<template>
  <div>
    <div class="filter">
      <!-- Category Filter -->
      <select v-model="categoryList">
        <option disabled value="">Select Category</option>
        <option v-for="category in uniqueCategories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- Sorting Dropdown -->
      <select v-model="sortOrder">
        <option disabled value="">Sort by Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>

      <!-- Search Bar -->
      <input type="text" v-model="searchQuery" placeholder="Search tours..." class="search-input" />
    </div>

    <h1>Welcome to Travel Agent 🌍</h1>

    <div v-if="error">Error fetching tours! {{ error }}</div>
    <div v-else-if="!tours">loading...</div>

    <div v-else class="tours">
      <div v-if="paginatedTours.length === 0">No Results Found.</div>

      <div v-for="tour in paginatedTours" :key="tour.id" class="tour-card">
        <NuxtLink :to="`/tour/${tour.id}`">
          <img :src="tour.thumbnail" alt="Tour Image" />
        </NuxtLink>
        <NuxtLink :to="`/tour/${tour.id}`">
          <h2>{{ tour.title }}</h2>
        </NuxtLink>
        <p>{{ tour.description }}</p>
        <span><strong>Price: ${{ tour.price }}</strong></span>
      </div>
    </div>
    <!-- Pagination -->
    <div class="pagination">
      <button @click="currentPage--" :disabled="currentPage === 1">
        ⬅ Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button @click="currentPage++" :disabled="currentPage >= totalPages || paginatedTours.length === 0">
        Next ➡
      </button>
    </div>

  </div>
</template>

<style>
.filter {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.filter select {
  width: 150px;
  padding: 10px;
  border: 1px solid #929292;
  border-radius: 6px;
}

.search-input {
  width: 30%;
  height: 20px;
  border: 1px solid #929292;
  border-radius: 6px;
  padding: 20px 15px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-block: 30px;
}
.pagination button {
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border: 1px solid #ccc;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
