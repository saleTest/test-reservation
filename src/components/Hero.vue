<template>
  <div>
    <div class="hero">
      <div class="hero-overlay">
        <div class="container">
          <h1 class="display-4">Welcome to Our Website</h1>
          <p class="lead">
            We provide the best services to help you achieve your goals.
          </p>
          <a href="#" class="btn btn-light btn-lg">Learn More</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hero {
  background-image: url("../assets/images/hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  height: 100vh;
}
.hero-overlay {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
