<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService } from './services/auth.service';


const router = useRouter()
function logout() {
  AuthService.clearAuth()
  sessionStorage.clear()
  router.push({
    path: '/login'
  })
}

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
    <div class="collapse navbar-collapse" id="navbarText" v-if="AuthService.hasAuth()">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/user">USER PROFILE</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/perfume">PERFUMES</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/cart">CART</RouterLink>
        </li>
        <li class="nav-item">
          <button type="button" class="nav-link" @click="logout">Logout</button>
        </li>
      </ul>
      <span class="navbar-text">
        <i class="fa-regular fa-user"></i> {{ AuthService.getUsernameLog() }}
      </span>
    </div>
  </div>
</nav>
<RouterView :key="$route.fullPath"/>
  </div>
  
</template>