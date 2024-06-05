<script setup lang="ts">
import Hero from "@/components/Hero.vue";
import RestourantView from "./Restaurant/RestourantView.vue";
import TopRankedRestourantView from "./Restaurant/TopRanked/TopRankedRestourantView.vue";
// import RestaurantView from "@/views/Restaurant/RestourantView.vue";
</script>

<template>
  <Hero />
  <div class="container">
    <!-- <TopRankedRestourantView /> -->
    <RestourantView />
  </div>
</template>
