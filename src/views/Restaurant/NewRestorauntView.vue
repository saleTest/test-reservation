<script setup lang="ts">
import type { RestaurantModel } from "@/modals/restaurant.model";
import { RestaurantService } from "@/services/restaurant.service";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const restaurant = ref<any>({
  name: "",
  location: "",
  price: "",
  details: "",
  phone: "",
  email: "",
  description: "",
  imageUrl: "",
});

function addRestourant() {
  RestaurantService.addRestourant(restaurant.value).then((rsp) => {
    router.push({
      path: "/restaurant/list",
    });
  });
}
function handleImageUpload(event: Event) {
  const inputElement = event.target as HTMLInputElement | null;
  if (inputElement && inputElement.files) {
    const file = inputElement.files[0];
    if (file && restaurant.value) {
      const filename = file.name;
      restaurant.value.imageUrl = filename;
    }
  }
}
</script>

<template>
  <div class="container">
    <div v-if="restaurant">
      <h1 class="h3">Create state</h1>
      <RouterLink class="btn btn-danger mb-3" to="/restaurant/list">
        <i class="fa-solid fa-rotate-left"></i> Return to restaurant list
      </RouterLink>
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
        <label for="location" class="form-label">Location:</label>
        <input
          type="text"
          class="form-control"
          id="location"
          v-model="restaurant.location"
        />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input
          type="text"
          class="form-control"
          id="price"
          v-model="restaurant.price"
        />
      </div>
      <div class="mb-3">
        <label for="details" class="form-label">Details:</label>
        <textarea
          class="form-control"
          id="details"
          v-model="restaurant.details"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone:</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="restaurant.phone"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="restaurant.email"
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea
          class="form-control"
          id="description"
          v-model="restaurant.description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">Upload Image:</label>
        <input
          type="file"
          class="form-control"
          id="imageUrl"
          accept="image/*"
        />
      </div>
      <button type="button" class="btn btn-success" @click="addRestourant">
        <i class="fa-solid fa-save"></i> Save
      </button>
    </div>
  </div>
</template>
