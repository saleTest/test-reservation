<script setup lang="ts">
import { AuthService } from "@/services/auth.service";
import { useRouter } from "vue-router";

// var isAdmin = true;
// var isStaff = true;
// console.log(AuthService.getEmail());
// console.log(localStorage.getItem("auth"));
// console.log(AuthService.getAccessToken());
// console.log(AuthService.getRefreshToken());

const router = useRouter();
function logout() {
  AuthService.clearAuth();
  router.push({
    path: "/login",
  });
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/"
        ><img
          src="../assets/images/reservee.png"
          alt="Reservation"
          width="100"
          height="50"
      /></RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarText"
        v-if="AuthService.hasAuth()"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
          <div v-if="AuthService.getRole() === 'admin'" class="dropdown">
            <a
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin Settings
            </a>

            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/restaurant/list"
                  >Restaurant List</RouterLink
                >
              </li>
            </ul>
          </div>

          <div v-if="AuthService.getRole() === 'admin'" class="dropdown">
            <a
              class="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Stuff Settings
            </a>

            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/booking/list"
                  >Booking List</RouterLink
                >
              </li>
            </ul>
          </div>
        </ul>
        <span class="navbar-text">
          <i class="fa-solid fa-user"></i> {{ AuthService.getEmail() }}
        </span>
        <span class="navbar-text">
          <button type="button" class="ms-3 btn btn-danger" @click="logout">
            <i class="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </span>
      </div>
      <div class="collapse navbar-collapse" id="navbarText" v-else>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/"
              >Home</RouterLink
            >
          </li>
        </ul>
        <span class="navbar-text">
          <RouterLink class="nav-link" to="/login"
            ><button class="btn btn-warning">
              <i class="fa-solid fa-right-to-bracket"></i> Login
            </button></RouterLink
          >
        </span>
        <span class="navbar-text">
          <RouterLink class="nav-link ms-3" to="/signup"
            ><button class="btn btn-secondary">
              <i class="fa-solid fa-user-plus"></i> Sign Up
            </button></RouterLink
          >
        </span>
      </div>
    </div>
  </nav>

  <RouterView :key="$route.fullPath" />
</template>

<style></style>
