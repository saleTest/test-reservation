<script setup lang="ts">
import type { RestaurantModel } from "@/modals/restaurant.model";
import { RestaurantService } from "@/services/restaurant.service";
import { ref } from "vue";

const restaurants = ref<RestaurantModel[]>();
RestaurantService.getAllRestaurant().then((resto) => {
  restaurants.value = resto.data;
});
// console.log(restaurants.image_url)
const truncateText = function (text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  } else {
    return text;
  }
};
</script>

<template>
  <div class="restaurants" v-if="restaurants">
    <div class="restourant-title">
      <h1>Restaurants</h1>
      <img src="/src/assets/images/title-r.png " />
    </div>
    <div class="grid-container">
      <div v-for="r in restaurants" class="card-restourant">
        <RouterLink :to="`/restaurant/${r._id}`">
          <div class="card-image-container">
            <!-- <img
              v-bind:src="'src/assets/images/' + r.imageUrl"
              :alt="r.name"
              class="card-image"
            /> -->
            <!-- https://media.cntraveler.com/photos/654bd5e13892537a8ded0947/16:9/w_2240,c_limit/phy2023.din.oss.restaurant-lr.jpg -->
            <img
              src="https://media.cntraveler.com/photos/654bd5e13892537a8ded0947/16:9/w_2240,c_limit/phy2023.din.oss.restaurant-lr.jpg"
              :alt="r.name"
              class="card-image"
            />
          </div>

          <div class="body-card">
            <h2 class="title">{{ r.name }}</h2>
            <!-- <div class="details">{{ r.details }}</div> -->
            <div class="details">{{ truncateText(r.details, 100) }}</div>
            <span class="price">{{
              r.price == "0" ? "FREE" : "$ " + r.price
            }}</span>

            <!-- <span class="price">
              {{ r.price === "0" ? "free" : "$ " + r.price }}
            </span> -->
          </div>
          <div class="button">
            <RouterLink
              :to="`/restaurant/${r._id}`"
              class="button w-100 btn btn-warning"
              >Reservate</RouterLink
            >
          </div>
        </RouterLink>

        <!-- 
        <RouterLink :to="`/restaurant/${r.restaurantId}`">
          <img
            v-bind:src="'src/assets/images/' + r.imageUrl"
            class="card-img-top"
            :alt="r.name"
          />
          <div class="card-body">
            <h5 class="card-title">{{ r.name }}</h5>
            <p class="card-text">
              {{ r.details }}
            </p>
            <RouterLink
              :to="`/restaurant/${r.restaurantId}`"
              class="btn btn-warning"
              >Reservate</RouterLink
            >
          </div>
        </RouterLink> -->
      </div>
    </div>
  </div>
</template>

<style>
.card-restourant {
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  background-color: #f2f2f2;
  border: 0;
  flex-direction: column;
  /* gap: 20px; */
  justify-content: center;
  /* padding: 60px; */
  transition: 0.4s;
  position: relative;
  /* max-height: 20rem; */
  /* max-height: 20px; */
  /* z-index: 1; */
}

.card-restourant .card-image-container .card-image {
  max-width: 90%;
  position: absolute;
  bottom: 54%;
  left: 50%;
  transform: translate(-50%, 0%);
}

.card-restourant:nth-child(even) {
  background-color: #bdbdbd30;
}
.card-restourant:nth-child(even) .body-card h2 {
  -webkit-text-fill-color: #0000;
  background: linear-gradient(170deg, #ffffff 102%, #ffc107 0);
  background-clip: text;
  -webkit-background-clip: text;
}

.card-restourant .body-card {
  position: relative;
  margin: 11.4rem auto 10px;
}
.card-restourant .body-card h2 {
  text-align: center;
  -webkit-text-fill-color: #0000;
  background: linear-gradient(170deg, #0a0a0a 102%, #b1b1b1 0);
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 30px;
  font-weight: 800;
}

.details {
  color: #131313;
  text-align: center;
  line-height: 1.3;
  max-height: 5rem;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}

.price {
  display: flex;
  font-weight: 800;
  font-size: 20px;
  justify-content: center;
  color: #222222;
  margin-bottom: 5px;
}
/* .card:nth-child(even) .button {
  background-color: #fffefd;
  color: #000;
  --bs-btn-border-color: none !important;
} */
.card-restourant:nth-child(even) .details,
.card-restourant:nth-child(even) .price {
  /* background-color: #fffefd; */
  color: #fffefd;
  /* --bs-btn-border-color: none !important; */
}
.button {
  color: #fffefd;
  text-transform: uppercase;
  font-weight: 700;
  --bs-btn-border-radius: none !important;
}
/* /////// */
/* //////// */
.restaurants {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  /* position: relative; */
}
.restourant-title {
  position: relative;
}
.restourant-title img {
  bottom: -4px;
  position: absolute;
  left: 151px;
  z-index: -1;
}
.restaurants h1 {
  font-weight: 400;
  font-size: 40px;
  margin-bottom: 2rem;
}
a {
  text-decoration: none;
  color: #fafafa;
}
.restaurants .grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

@media (max-width: 768px) {
  .restaurants .grid-container {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 4rem;
  }

  .card-restourant .body-card {
    margin: 5.9rem auto 10px;
  }
  .card-restourant .card-image-container .card-image {
    bottom: 80%;
  }
  .card-restourant .body-card h2 {
    font-size: 24px;
    font-weight: 700;
  }

  .details {
    color: #131313;
    text-align: center;
    line-height: 1.3;
    max-height: 5rem;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }

  .price {
    font-weight: 800;
    font-size: 18px;
  }
}
</style>
