<script setup lang="ts">
import type { BookingModel } from "@/modals/booking.model";
import { BookingService } from "@/services/booking.service";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);

const booking = ref<BookingModel>();
BookingService.getBookingById(id).then((rsp) => {
  booking.value = rsp.data;
});

function updateBooking() {
  BookingService.updateBooking(id, booking.value).then((rsp) => {
    router.push({
      path: "/",
    });
  });
}
</script>

<template>
  <div class="container">
    <div v-if="booking">
      <h1 class="h3">Edit Booking</h1>
      <RouterLink class="btn btn-danger mb-3" to="/">
        <i class="fa-solid fa-rotate-left"></i> Return to booking list
      </RouterLink>
      <div class="mb-3">
        <label for="id" class="form-label">Id:</label>
        <input
          type="number"
          class="form-control"
          id="id"
          :value="booking.bookingId"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">First Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="booking.firstName"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Last Name:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="booking.lastName"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Number of guests:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="booking.guestNumber"
        />
      </div>
      <!-- <div class="mb-3">
        <label for="name" class="form-label">Details:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="booking.details"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Price:</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="booking.price"
        />
      </div> -->

      <button type="button" class="btn btn-success" @click="updateBooking">
        <i class="fa-solid fa-save"></i> Save
      </button>
    </div>
  </div>
</template>
