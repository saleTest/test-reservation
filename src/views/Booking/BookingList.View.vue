<script setup lang="ts">
import type { BookingModel } from "@/modals/booking.model";
import type { RestaurantModel } from "@/modals/restaurant.model";
import { BookingService } from "@/services/booking.service";
import { RestaurantService } from "@/services/restaurant.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const booking = ref<BookingModel[]>();
// const id = Number.parseInt(route.params.id as any);

BookingService.getAllBooking().then((rsp) => {
  booking.value = rsp.data;
  //   if (booking.value) {
  //     booking.value.forEach((item) => {
  //       const id = Number.parseInt(item.restoranId as any);
  //       RestaurantService.getRestaurantById(id).then((rsp) => {
  //         restaurant.value = rsp.data;
  //       });
  //     });
  //   }
});

async function removeBooking(model: BookingModel) {
  if (confirm("Are you sure you want to delete this booking?")) {
    await BookingService.deleteBooking(model._id);
    booking.value = booking.value?.filter((obj) => obj._id !== model._id);
    alert("Booking deleted successfully.");
  } else {
    alert("Booking deletion canceled.");
  }
}

// async function cancelBooking(id: number) {
//   const statusUpdateData = { statusId: 4 };
//   BookingService.updateBookingStatus(id, statusUpdateData).then((rsp) => {
//     router.push({
//       path: "/booking/list",
//     });
//   });
// }

function cancelBooking(id: string) {
  try {
    const statusUpdateData = { status: "Rejected" };
    BookingService.updateStatusBooking(id, statusUpdateData).then((rsp) => {
      router.push({
        path: "/booking/list",
      });
      window.location.reload();
      alert("Booking status updated successfully.");
    });
  } catch (error) {
    console.error("Greška prilikom otkazivanja rezervacije:", error);
  }
}

function acceptBooking(id: string) {
  try {
    const statusUpdateData = { status: "Accepted" };
    BookingService.updateStatusBooking(id, statusUpdateData).then((rsp) => {
      router.push({
        path: "/booking/list",
      });
      window.location.reload();
      alert("Booking status updated successfully.");
    });
  } catch (error) {
    console.error("Greška prilikom otkazivanja rezervacije:", error);
  }
}
</script>

<template>
  <div class="container">
    <div v-if="booking">
      <h1 class="h3">Booking</h1>
      <RouterLink class="btn btn-success mb-3" to="/booking/new">
        <i class="fa-solid fa-plus"></i> Add new Booking
      </RouterLink>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <!-- <th scope="col">Created At</th>-->
            <th scope="col">Guests</th>
            <th scope="col">Restourant</th>
            <th scope="col">Status</th>
            <th scope="col">Options</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(obj, index) in booking">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ obj.name }} {{ obj.lastname }}</td>
            <td>{{ obj.guests }}</td>
            <td>{{ obj.restoran.name }}</td>
            <td>{{ obj.status }}</td>
            <td>
              <div class="btn-group">
                <RouterLink
                  class="btn btn-sm btn-primary"
                  :to="`/edit-booking/${obj._id}`"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </RouterLink>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  @click="removeBooking(obj)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-success"
                title="Click for confirm booking"
                @click="acceptBooking(obj._id)"
              >
                <i class="fa-solid fa-check"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-secondary"
                title="Click for reject booking"
                @click="cancelBooking(obj._id)"
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </td>
            <!-- <td>
              <RouterLink
                class="btn btn-sm btn-primary"
                :to="`/booking/${obj.bookingId}`"
              >
                <i class="fa-regular fa-eye"></i>
              </RouterLink>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Booking are beeing loaded... Please wait!</div>
  </div>
</template>
