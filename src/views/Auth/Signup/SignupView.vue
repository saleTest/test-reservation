<script setup lang="ts">
import router from "@/router";
import { AuthService } from "@/services/auth.service";
import { ref } from "vue";

const first_name = ref<string>("");
const last_name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const rePassword = ref<string>("");
const phone_number = ref<string>("");

async function signup() {
  try {
    if (password.value !== rePassword.value) {
      alert("Passwords do not match");
      return;
    }
    if (
      email.value === "" ||
      password.value === "" ||
      first_name.value === "" ||
      last_name.value === ""
    ) {
      alert("All fields are required");
      return;
    }

    await AuthService.SignUp(
      first_name.value,
      last_name.value,
      phone_number.value,
      email.value,
      password.value
    );
    // AuthService.saveAuth(rsp.data);
    router.push({
      path: "/",
    });
  } catch (e) {
    alert(e);
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">Sign Up</div>
          <div class="card-body">
            <form @submit.prevent="signup">
              <div class="form-container mb-2">
                <div class="form-group me-3">
                  <label for="firstName" class="mb-2">First Name:</label
                  ><input
                    type="text"
                    class="form-control"
                    id="firstName"
                    v-model="first_name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="lastName" class="mb-2">Last Name:</label
                  ><input
                    type="text"
                    class="form-control"
                    id="lastName"
                    v-model="last_name"
                    required
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  id="phone"
                  v-model="phone_number"
                  pattern="[0-9]{9,11}"
                  placeholder="06********"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  placeholder="Your Password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="rePassword" class="form-label"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="rePassword"
                  v-model="rePassword"
                  placeholder="Confirm Your Password"
                  required
                />
              </div>
              <button type="submit" class="w-100 btn btn-warning">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
