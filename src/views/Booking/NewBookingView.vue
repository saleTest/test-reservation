<script setup lang="ts">
import type { RestaurantModel } from "@/modals/restaurant.model";
import { BookingService } from "@/services/booking.service";
import { RestaurantService } from "@/services/restaurant.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const booking = ref<any>({
  date: "",
  time: "",
  guests: "",
  name: "",
  lastname: "",
  restoran: "",
  user: "66102ff78011dab21f35e092",
  // tableNumber: "",
});

// Function to fetch all restaurants
const restaurants = ref<RestaurantModel[]>([]);

onMounted(async () => {
  try {
    const response = await RestaurantService.getAllRestaurant();
    restaurants.value = response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
  }
});

function addBooking() {
  BookingService.addBooking(booking.value)
    .then((rsp) => {
      router.push({ path: "/booking/list" });
    })
    .catch((error) => {
      console.error("Error adding booking:", error);
    });
}
</script>

<template>
  <div class="container">
    <div>
      <h1 class="h3">Create Booking</h1>
      <div class="mb-3">
        <label for="date" class="form-label">Date:</label>
        <input
          type="date"
          class="form-control"
          id="date"
          v-model="booking.date"
        />
      </div>
      <div class="mb-3">
        <label for="time" class="form-label">Time:</label>
        <input
          type="time"
          class="form-control"
          id="time"
          v-model="booking.time"
        />
      </div>
      <div class="mb-3">
        <label for="guests" class="form-label">Guests:</label>
        <input
          type="number"
          class="form-control"
          id="guests"
          v-model.number="booking.guests"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="booking.name"
        />
      </div>
      <div class="mb-3">
        <label for="lastname" class="form-label">Last Name:</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          v-model="booking.lastname"
        />
      </div>
      <div class="mb-3">
        <label for="restaurant" class="form-label">Restaurant:</label>
        <select v-model="booking.restoran" class="form-control" id="restaurant">
          <option value="" disabled>Select a restaurant</option>
          <option
            v-for="restaurant in restaurants"
            :key="restaurant._id"
            :value="restaurant._id"
          >
            {{ restaurant.name }}
          </option>
        </select>
      </div>
      <!-- <div class="mb-3">
        <label for="tableNumber" class="form-label">Table Number:</label>
        <input
          type="number"
          min="1"
          class="form-control"
          id="tableNumber"
          v-model="booking.tableNumber"
        />
      </div> -->
      <button type="button" class="btn btn-success" @click="addBooking">
        <i class="fa-solid fa-save"></i> Book Now
      </button>
    </div>
  </div>
</template>
