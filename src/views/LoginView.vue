<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { login } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

const username = ref<string>('');
const password = ref<string>('');
const router = useRouter(); 

async function doLogin() {
    try {
        if (username.value === '') return;
        if (password.value === '') return;
        const rsp = await login(username.value, password.value);
        console.log('Login Response:', rsp.data);
        AuthService.saveAuth(rsp.data);
        //const user = response.data.user;
        router.push('/perfume'); // Navigacija na /perfume
    } catch (e) {
        alert(e);
    }
}
</script>

<template>
    <div class="login">
        <h1 class="h3 text-center">Welcome!</h1>
        <form v-on:submit.prevent="doLogin">
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username"> 
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password"> 
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
<style>
.login {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
</style>