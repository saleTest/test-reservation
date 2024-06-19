<script setup lang="ts">
import type { RestaurantModel } from "@/modals/restaurant.model";
import { RestaurantService } from "@/services/restaurant.service";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = String(route.params.id as any);
// console.log(id);
const restaurant = ref<RestaurantModel>();
RestaurantService.getRestaurantById(id).then((rsp) => {
  restaurant.value = rsp.data;
});

function updateRestaurant() {
  RestaurantService.updateRestarant(id, restaurant.value).then((rsp) => {
    router.push({
      path: "/",
    });
  });
}
</script>

<template>
  <div class="container">
    <div v-if="restaurant">
      <h1 class="h3">Edit Restaurant</h1>
      <RouterLink class="btn btn-danger mb-3" to="/">
        <i class="fa-solid fa-rotate-left"></i> Return to restaurant list
      </RouterLink>
      <div class="mb-3">
        <label for="id" class="form-label">Id:</label>
        <input
          type="string"
          class="form-control"
          id="id"
          :value="restaurant._id"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="restaurant.name"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Location:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="restaurant.location"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Description:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="restaurant.description"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Details:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="restaurant.details"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Price:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="restaurant.price"
        />
      </div>

      <button type="button" class="btn btn-success" @click="updateRestaurant">
        <i class="fa-solid fa-save"></i> Save
      </button>
    </div>
  </div>
</template>
