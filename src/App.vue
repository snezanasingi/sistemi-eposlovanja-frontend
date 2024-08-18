<script setup lang="ts">
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">
      <i class="fa-solid fa-shop"></i>
      Online Perfume Shop
    </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">HOME</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/perfume">PERFUMES</RouterLink>
        </li>
      </ul>
      <span class="navbar-text">
        User 1
      </span>
    </div>
  </div>
</nav>
<RouterView />
  </div>
  
</template>