<script setup></script>

<template>
  <div>

    <header>
      <nav>
        <ul>
          <li>
            <NuxtLink to="/favorites">favorites </NuxtLink>
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
}
ul li a {
  
}
</style>
