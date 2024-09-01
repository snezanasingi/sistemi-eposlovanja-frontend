<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { CartService } from '@/services/cart.service';
import { UserService } from '@/services/user.service';
import type { CartModel } from '@/types/cart.model';
import type { PerfumeModel } from '@/types/perfume.model';
import { computed, ref } from 'vue';

const perfumes = ref(JSON.parse(sessionStorage.getItem("perfumes") || "[]"))

async function remove(model: PerfumeModel) {

    const index = perfumes.value.indexOf(model);
    perfumes.value.splice(index, 1);
    sessionStorage.setItem("perfumes", JSON.stringify(perfumes.value));

    }

    const totalPrice = computed(() => {
    return perfumes.value.reduce((totalPrice: number, perfume: { price: any; }) => {
    return totalPrice + parseInt(perfume.price);
  }, 0);
});

    function clearCart() {
    perfumes.value = []; 
    sessionStorage.removeItem("perfumes"); 
    }

      async function placeOrder() {
    
        const user = await AuthService.getUserById(); 
        console.log('user', user)
        const cartData: CartModel = {
            orderId: Date.now(),
            perfumeId: perfumes.value.map((p: { perfumeId: any; }) => p.perfumeId),
            totalPrice: totalPrice.value,
            userId: user.userId, 
        };
        console.log('ALEKSA', cartData);
        const response = await CartService.createCart(cartData);
        if (response) {
            alert('Your order is on your way successfully!');
            clearCart();
        } else {
            alert('Failed to order. Please try again.');
        }
    }



</script>
<template>
    <div v-if="perfumes">
        <h1 class="h3">Your Cart</h1>
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
            <button type="button" class="btn btn-sm btn-warning" @click="remove(p)">
                <i class="fa-solid fa-circle-minus"></i>
                Remove From Cart
            </button>
        </div>
      </td>
    </tr>
    <div>
    <p>Total Price: {{ totalPrice }} $</p>
    </div>
  </tbody>
</table>
</div>
<div v-else>Your cart is beeing loaded. Please wait!</div>
    <button type="button" class="btn btn-success" @click="placeOrder">
        <i class="fa-solid fa-cart-shopping"></i>
                Order Now
        </button>
    <button type="button" class="btn btn btn-danger"  @click="clearCart">
        <i class="fa-solid fa-trash-can"></i>
        Cancel Cart
      </button>
</template> 