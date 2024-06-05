<template>
  <hr />
  <div>
    <div class="bg-dark text-white pt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a team of passionate developers creating amazing
              applications.
            </p>
          </div>
          <div class="col-md-4">
            <h5>Links</h5>
            <ul class="list-unstyled">
              <li><RouterLink to="/" class="text-white">Home</RouterLink></li>
              <!-- <li><a href="#" class="text-white">About</a></li>
              <li><a href="#" class="text-white">Services</a></li>
              <li><a href="#" class="text-white">Contact</a></li> -->
            </ul>
          </div>
          <div class="col-md-4">
            <h5>Contact Us</h5>
            <ul class="list-unstyled">
              <li>
                <i class="bi bi-geo-alt-fill"></i> 1234 Street Name, City,
                Country
              </li>
              <li><i class="bi bi-telephone-fill"></i> (123) 456-7890</li>
              <li><i class="bi bi-envelope-fill"></i> email@example.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-dark text-center py-3">
        <p class="mb-0">© 2024 Sasa Jovanovic. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
