<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const selectedGender = ref('');
const dateOfBirth = ref('');
const email = ref('');
const emailError = ref('');
const dateError = ref('');

const props = defineProps(['updateUserList']);
console.log(props);

const emit = defineEmits(['closeForm']); // Emit sự kiện đóng form

const handleCloseForm = () => {
  emit('closeForm'); // Gửi sự kiện cho component cha
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateDate = (date) => {
  const today = new Date();
  const selectedDate = new Date(date);
  return selectedDate < today;
};


const generateRandomID = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

const handleSubmit = () => {
  emailError.value = '';
  dateError.value = '';

  if (!validateEmail(email.value)) {
    emailError.value = 'Vui lòng nhập đúng định dạng email';
    return;
  }

  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  const emailExists = allUsers.some(user => user.email === email.value);
  if (emailExists) {
    emailError.value = 'Email đã tồn tại';
    return;
  }

  if (!validateDate(dateOfBirth.value)) {
    dateError.value = 'Ngày sinh không hợp lệ';
    return;
  }

  const userData = {
    id: generateRandomID(),
    name: name.value,
    selectedGender: selectedGender.value,
    dateOfBirth: dateOfBirth.value,
    email: email.value,
  };

  allUsers.push(userData);
  localStorage.setItem('users', JSON.stringify(allUsers));

  alert('Thêm thành công');
  name.value = '';
  selectedGender.value = ''
  dateOfBirth.value = '';
  email.value = '';
  props.updateUserList();
  emit('closeForm'); // Gửi sự kiện đóng form
};
</script>

<template>
  <div>
    <h1>Add User</h1>
    <form @submit.prevent="handleSubmit">
      <h3>Name:</h3>
      <input type="text" v-model="name" required />

      <h3>Gender:</h3>
      <p>
        <input type="radio" id="man" value="Male" v-model="selectedGender" required />
        <label for="man">Male</label>
      </p>
      <p>
        <input type="radio" id="woman" value="Female" v-model="selectedGender" required />
        <label for="woman">Female</label>
      </p>
      <p>
        <input type="radio" id="other" value="Other" v-model="selectedGender" required />
        <label for="other">Other</label>
      </p>

      <h3>Date of Birth:</h3>
      <input type="date" v-model="dateOfBirth" required />
      <span v-if="dateError" style="color: red;">{{ dateError }}</span>

      <h3>Email:</h3>
      <input type="email" v-model="email" required />
      <span v-if="emailError" style="color: red;">{{ emailError }}</span>

      <button type="submit">Submit</button>
      <button type="button" @click="handleCloseForm">Close</button>
    </form>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

div {
  max-width: 400px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

h3 {
  margin-bottom: 10px;
}

input[type="text"],
input[type="date"],
input[type="email"],
button {
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

p {
  margin: 10px 0;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>