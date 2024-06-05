import HomeView from "@/views/HomeView.vue";
// import RestaurantView from "@/views/Restaurant/RestourantView";

import { createRouter, createWebHistory } from "vue-router";
import RestourantView from "../views/Restaurant/RestourantView.vue";
import SimpleRestaurantView from "@/views/Restaurant/SimpleRestaurantView.vue";
import LoginView from "@/views/Auth/Login/LoginView.vue";
import SignupView from "@/views/Auth/Signup/SignupView.vue";
import EditRestourantView from "@/views/Restaurant/EditRestourantView.vue";
import NewRestorauntView from "@/views/Restaurant/NewRestorauntView.vue";
import RestourantListView from "@/views/Restaurant/RestourantList.View.vue";
import BookingListView from "@/views/Booking/BookingList.View.vue";
import EditBookingView from "@/views/Booking/EditBookingView.vue";
import TopRankedRestourantView from "@/views/Restaurant/TopRanked/TopRankedRestourantView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    //RESTORAN
    {
      path: "/restaurant",
      name: "restaurant",
      component: RestourantView,
    },
    {
      path: "/restaurant/:id",
      name: "restaurant",
      component: SimpleRestaurantView,
    },
    {
      path: "/restaurant/list",
      name: "restaurant-list",
      component: RestourantListView,
    },
    {
      path: "/edit-restaurant/:id",
      name: "edit-restaurant",
      component: EditRestourantView,
    },
    {
      path: "/restaurant/new",
      name: "new-restaurant",
      component: NewRestorauntView,
    },
    //Top RESTORAN
    {
      path: "/restaurant/top",
      name: "top-restaurant",
      component: TopRankedRestourantView,
    },
    // BOOKING
    {
      path: "/booking/list",
      name: "booking-list",
      component: BookingListView,
    },
    {
      path: "/edit-booking/:id",
      name: "edit-booking",
      component: EditBookingView,
    },

    // AUTH
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
  ],
});

export default router;
