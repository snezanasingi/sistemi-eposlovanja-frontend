<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PerfumeService } from '@/services/perfume.service';
import type { PerfumeModel } from '@/types/perfume.model';

const perfumes = ref<PerfumeModel[]>([]);

async function loadPerfumes() {
  try {
      perfumes.value = await PerfumeService.getAllPerfumes(); 
  } catch (error) {
      console.error('Failed to load perfumes:', error);
  }
}

onMounted(() => {
  loadPerfumes();
});

async function addToCart(model: PerfumeModel) {
  try {
      let perfumesInCart: PerfumeModel[] = JSON.parse(sessionStorage.getItem("perfumes") || "[]");
      perfumesInCart = [...perfumesInCart, model];
      sessionStorage.setItem("perfumes", JSON.stringify(perfumesInCart));
  } catch (error) {
      console.error('Failed to add to cart:', error);
  }
}
</script>
<template>
  <div v-if="perfumes.length > 0">
      <h1 class="h3">Perfumes</h1>
      <table class="table">
          <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Price</th>
                  <th scope="col">Add To Cart</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="p in perfumes" :key="p.perfumeId">
                  <th scope="row">{{ p.perfumeId }}</th>
                  <td>{{ p.name }}</td>
                  <td>{{ p.brand }}</td>
                  <td>{{ p.price }}</td>
                  <td>
                      <div class="btn-group">
                          <button type="button" class="btn btn-sm btn-success" @click="() => addToCart(p)">
                              <i class="fa-solid fa-cart-plus"></i>
                              Buy Now
                          </button>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  <div v-else>Perfumes are being loaded. Please wait!</div>
</template>




<!-- <script setup lang="ts">
import { PerfumeService } from '@/services/perfume.service';
import type { PerfumeModel } from '@/types/perfume.model';
import { ref } from 'vue';


const perfumes = ref<PerfumeModel[]>()
PerfumeService.getAllPerfumes().then(rsp=>perfumes.value = rsp.data) 

async function addToCart(model: PerfumeModel) {

    let perfumes: PerfumeModel[] = JSON.parse(sessionStorage.getItem("perfumes") || "[]")
    perfumes=[...perfumes, model]
    sessionStorage.setItem("perfumes", JSON.stringify(perfumes)) // nadovezala sam jedan na drugi
}

</script>

<template>
    <div v-if="perfumes">
        <h1 class="h3">Perfumes</h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Brand</th>
      <th scope="col">Price</th>
      <th scope="col">Add To Cart</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="p in perfumes">
      <th scope="row">{{  p.perfumeId }}</th>
      <td>{{  p.name }}</td>
      <td>{{  p.brand }}</td>
      <td>{{  p.price }}</td>
      <td>
         <div class="btn-group">
            <button type="button" class="btn btn-sm btn-success" @click="()=>addToCart(p)">
                <i class="fa-solid fa-cart-plus"></i>
                Buy Now
            </button>
        </div>
      </td>
    </tr>
   
  </tbody>
</table>
</div>
<div v-else>Perfumes are beeing loaded. Please wait!</div>
</template>  -->

