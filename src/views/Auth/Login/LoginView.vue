<script setup lang="ts">
import { AuthService } from "@/services/auth.service";
import { login } from "@/services/main.service";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref<string>("");
const password = ref<string>("");
const router = useRouter();
async function doLogin() {
  try {
    if (email.value == "") return;
    if (password.value == "") return;
    const rsp = await login(email.value, password.value);
    AuthService.saveAuth(rsp.data);
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
          <div class="card-header">Login</div>
          <div class="card-body">
            <form v-on:submit.prevent="doLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  v-model="email"
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
                  required
                />
              </div>
              <button type="submit" class="w-100 btn btn-warning">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
