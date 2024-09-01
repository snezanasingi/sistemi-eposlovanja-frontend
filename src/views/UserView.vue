<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import type { UserModel } from '@/types/user.model';

const user = ref<UserModel | null>(null);
const isLoading = ref(true);


const isEditing = ref<{ // ovde samo sta ukljucuje da definisem 
  username: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
}>({
  username: false,
  email: false,
  phone: false,
  password: false,
});

const editedUser = ref<Omit<UserModel, 'userId' | 'access' | 'refresh'>>({
  username: '',
  email: '',
  phone: '',
  password: ''
});

async function loadUser() {
  try {
    const auth = AuthService.getAuth();
    const userId = auth.userId;
    if (userId !== undefined) {
      const fetchedUser = await UserService.getUserById(userId);
      user.value = fetchedUser;
      editedUser.value = {
        username: fetchedUser.username,
        email: fetchedUser.email,
        phone: fetchedUser.phone,
        password: ''
      };
    } else {
      console.error('User ID is undefined');
    }
  } catch (error) {
    console.error('Failed to load user:', error);
  } finally {
    isLoading.value = false;
  }
}

// Funkcija za prebacivanje između rezima uređivanja
function toggleEdit(field: keyof Omit<UserModel, 'userId' | 'access' | 'refresh'>) {
  if (field in isEditing.value) {
    isEditing.value[field] = !isEditing.value[field];
  }
}


async function saveChanges() {
    try {
        if (user.value) {
            const updatePayload = {
                username: editedUser.value.username,
                email: editedUser.value.email,
                phone: editedUser.value.phone,
                password: ''
            };
            
          const res = await UserService.updateUser(user.value.userId, updatePayload);
          user.value = res;
            //console.log('PROVERA', res);
            //loadUser();
        }
    } catch (error) {
        console.error('Failed to update user:', error);
    } finally {
        Object.keys(isEditing.value).forEach((key) => {
            if (key in isEditing.value) {
                isEditing.value[key as keyof typeof isEditing.value] = false;
            }
        });
    }
}

onMounted(() => {
  loadUser();
});
</script>

<template>
  <div v-if="isLoading">Your data is being loaded. Please wait!</div>
  <div v-else-if="user">
    <h1 class="h3">User Information</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ user.userId }}</th>
          <td>
            <input
              v-if="isEditing.username"
              v-model="editedUser.username"
              type="text"
              placeholder="Enter username"
            />
            <span v-else>{{ user.username }}</span>
            <button @click="toggleEdit('username')">
              {{ isEditing.username ? 'Save' : 'Edit' }}
            </button>
          </td>
          <td>
            <input
              v-if="isEditing.password"
              v-model="editedUser.password"
              type="password"
              placeholder="Enter password"
            />
            <span v-else>{{ user.password }}</span>
            <button @click="toggleEdit('password')">
              {{ isEditing.password ? 'Save' : 'Edit' }}
            </button>
          </td>
          <td>
            <input
              v-if="isEditing.email"
              v-model="editedUser.email"
              type="email"
              placeholder="Enter email"
            />
            <span v-else>{{ user.email }}</span>
            <button @click="toggleEdit('email')">
              {{ isEditing.email ? 'Save' : 'Edit' }}
            </button>
          </td>
          <td>
            <input
              v-if="isEditing.phone"
              v-model="editedUser.phone"
              type="text"
              placeholder="Enter phone"
            />
            <span v-else>{{ user.phone }}</span>
            <button @click="toggleEdit('phone')">
              {{ isEditing.phone ? 'Save' : 'Edit' }}
            </button>
          </td>
          <td>
            <button v-if="isEditing.username || isEditing.password || isEditing.email || isEditing.phone"
                    @click="saveChanges">
              Save Changes
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>No user data available.</div>
</template>
