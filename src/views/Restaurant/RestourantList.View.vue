<script setup lang="ts">
import type { RestaurantModel } from "@/modals/restaurant.model";
import { RestaurantService } from "@/services/restaurant.service";
import { ref } from "vue";

const restaurant = ref<RestaurantModel[]>();
RestaurantService.getAllRestaurant().then(
  (rsp) => (restaurant.value = rsp.data)
);

async function removeRestaurant(model: RestaurantModel) {
  if (confirm("Are you sure you want to delete this restaurant?")) {
    await RestaurantService.deleteRestourant(model.restaurantId);
    restaurant.value = restaurant.value?.filter(
      (obj) => obj.restaurantId !== model.restaurantId
    );
    alert("Restaurant deleted successfully.");
  } else {
    alert("Restaurant deletion canceled.");
  }
}
</script>

<template>
  <div class="container">
    <div v-if="restaurant">
      <h1 class="h3">Restaurant</h1>
      <RouterLink class="btn btn-success mb-3" to="/restaurant/new">
        <i class="fa-solid fa-plus"></i> Add new Restaurant
      </RouterLink>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <!-- <th scope="col">Created At</th>
            <th scope="col">Updated At</th> -->
            <th scope="col">Options</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="obj in restaurant">
            <th scope="row">{{ obj.restaurantId }}</th>
            <td>{{ obj.name }}</td>
            <td>
              <div class="btn-group">
                <RouterLink
                  class="btn btn-sm btn-primary"
                  :to="`/edit-restaurant/${obj.restaurantId}`"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </RouterLink>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="removeRestaurant(obj)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
            <td>
              <RouterLink
                class="btn btn-sm btn-primary"
                :to="`/restaurant/${obj.restaurantId}`"
              >
                <i class="fa-regular fa-eye"></i>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Restaurant are beeing loaded... Please wait!</div>
  </div>
</template>
