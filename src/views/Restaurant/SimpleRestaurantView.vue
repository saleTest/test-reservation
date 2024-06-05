<script setup lang="ts">
import type { RestaurantModel } from "@/modals/restaurant.model";
import { AuthService } from "@/services/auth.service";
// import router from "@/router";
import { BookingService } from "@/services/booking.service";
import { RestaurantService } from "@/services/restaurant.service";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const id = route.params.id as any as string;
// console.log(typeof id);
const restaurants = ref<RestaurantModel>();
RestaurantService.getRestaurantById(id).then((resto) => {
  restaurants.value = resto.data;
  // booking.value.restaurantId = restaurants.value.id;
});

const booking = ref<any>({
  // date: "",
  // time: "",
  // people: "",
  guestNumber: "",
  firstName: "",
  lastName: "",
  restaurantId: id,
  userId: 1,
  // firstName: "",
  // lastName: "",
  // email: "",
  // phone: "",
  // comments: "",
});

function submitBooking() {
  BookingService.createBooking(booking.value).then((rsp) => {
    router.push({
      path: "/",
    });
  });
}

// console.log(restaurants.image_url)
</script>

<template>
  <div v-if="restaurants">
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ restaurants.name }}
          </li>
        </ol>
      </nav>
      <hr />
      <div class="row">
        <div class="col-md-6">
          <!-- <img
            v-bind:src="'../src/assets/images/' + restaurants.imageUrl"
            class="card-img-top"
            :alt="restaurants.name"
          /> -->
          <img
            src="https://media.cntraveler.com/photos/654bd5e13892537a8ded0947/16:9/w_2240,c_limit/phy2023.din.oss.restaurant-lr.jpg"
            class="card-img-top"
            :alt="restaurants.name"
          />
        </div>

        <div class="col-md-6">
          <div class="">
            <div class="card-body">
              <div class="rating">
                <span>Rating: {{ restaurants.rating }}</span>
                <span>Views: {{ restaurants.views }}</span>
              </div>
              <h4 class="card-title mt-2">{{ restaurants.name }}</h4>
              <div class="information mt-4">
                <div>
                  <i class="me-1 fa-solid fa-location-dot"></i>
                  <a
                    :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      restaurants.location
                    )}`"
                    target="_blank"
                  >
                    {{ restaurants.location }}
                  </a>
                </div>
                <div>
                  <i class="me-1 fa-solid fa-phone"></i>
                  <a :href="`tel:${restaurants.phone}`">
                    {{ restaurants.phone }}
                  </a>
                </div>
                <div>
                  <i class="me-1 fa-regular fa-envelope"></i>
                  <a :href="`mailto:${restaurants.email}`">
                    {{ restaurants.email }}
                  </a>
                </div>
              </div>
              <div class="mt-4">
                <span class="font">Description:</span>
                <p class="card-text">{{ restaurants.description }}</p>
              </div>

              <form class="mt-3" @submit="submitBooking">
                <!-- <div class="form-group">
                  <label for="date">Datum:</label>
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    v-model="booking.date"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="time">Vreme:</label>
                  <input
                    type="time"
                    class="form-control"
                    id="time"
                    v-model="booking.time"
                    required
                  />
                </div>-->
                <div class="form-group">
                  <label for="people">Number of guests:</label>
                  <input
                    type="number"
                    min="1"
                    class="form-control"
                    id="people"
                    v-model="booking.guestNumber"
                    required
                  />
                </div>

                <div class="form-container">
                  <div class="form-group me-5">
                    <label for="firstName">First Name:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="booking.firstName"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="booking.lastName"
                      required
                    />
                  </div>
                </div>

                <!-- <div class="form-group">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="booking.email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Telefon:</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="booking.phone"
                    required
                  />
                </div>-->
                <div class="form-group">
                  <label for="comments">Comments:</label>
                  <textarea
                    class="form-control"
                    id="comments"
                    v-model="booking.comments"
                  ></textarea>
                </div>
                <div v-if="AuthService.hasAuth()">
                  <button type="submit" class="mt-3 w-100 btn btn-warning">
                    Booking
                  </button>
                </div>
                <div v-else>
                  <RouterLink :to="`/login`" class="mt-3 w-100 btn btn-danger"
                    >Go To Login</RouterLink
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  margin-top: 5rem;
}
.col-md-6 {
  display: flex;
  /* justify-items: center; */
  align-items: center;
}
.form-container {
  display: flex;
  width: 100%;
}

.form-group {
  flex: 1;
  /* margin-right: 1.6rem; */
  margin-top: 0.5rem;
}

.form-group:last-child {
  margin-right: 0;
}
.rating {
  display: flex;
  justify-content: space-between;
}
.card-text {
  font-size: 17px;
  line-height: 1.5;
  /* color: #666; */
}
.rating span {
  font-size: 13px;
}
.font {
  font-size: 13px;
}
.information {
  display: flex;
  justify-content: space-around;
}
/* .btn {
  width: 100%;
} */
hr {
  margin-top: 8px;
  color: #ffc107;
}
.breadcrumb {
  font-size: 12px;
}
ol {
  margin-bottom: 0 !important;
}
</style>
