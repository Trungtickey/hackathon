<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const usersData = JSON.parse(localStorage.getItem('users')) || [];
const user = ref({ name: '', email: '', selectedGender: '', dateOfBirth: '' });
const error = ref('');

onMounted(() => {
  const foundUser = usersData.find(u => u.id === id);
  if (foundUser) {
    user.value = { ...foundUser };
  } else {
    error.value = 'User not found';
  }
});

const submitForm = () => {
  const index = usersData.findIndex(u => u.id === id);
  if (index !== -1) {
    usersData[index] = { ...user.value, id };
    localStorage.setItem('users', JSON.stringify(usersData));
    router.push('/admin/manager-user');
  } else {
    error.value = 'Error updating user';
  }
};
</script>

<template>
  <div class="container">
    <h1>Edit User</h1>
    <h3>User ID: {{ id }}</h3>

    <form @submit.prevent="submitForm" class="edit-form">
      <label for="name">Name:</label>
      <input type="text" v-model="user.name" id="name" required />

      <label for="email">Email:</label>
      <input type="email" v-model="user.email" id="email" required />

      <label for="date">Date of Birth:</label>
      <input type="date" v-model="user.dateOfBirth" id="date" required />

      <label for="sex">Selected Gender:</label>
      <p>
        <input type="radio" id="man" value="Male" v-model="user.selectedGender" required />
        <label for="man">Male</label>
      </p>
      <p>
        <input type="radio" id="woman" value="Female" v-model="user.selectedGender" required />
        <label for="woman">Female</label>
      </p>
      <p>
        <input type="radio" id="other" value="Other" v-model="user.selectedGender" required />
        <label for="other">Other</label>
      </p>

      <button type="submit" class="submit-button">Save</button>
      <button type="submit" class="comeback">Come Back</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.edit-form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 10px 0 5px;
  font-weight: bold;
}

input {
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.comeback {
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>