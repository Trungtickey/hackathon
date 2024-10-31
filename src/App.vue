<script setup lang="ts">
import {useRouter} from "vue-router";

const router=useRouter()
const changePage=()=>{
  router.push("/admin/user-manager")
}
</script>

<template>
   <div>
     <div class="navbar">
       <div><router-link to="/" class="nav-item">Dashboard</router-link></div>
<!--       <div @click="changePage">change page</div>-->
       <div><router-link to="/admin/user-manager" class="nav-item">Manager User</router-link></div>
       <div><router-link to="/admin/product-manager" class="nav-item">Manager product</router-link></div>
     </div>
     <div><router-view></router-view></div>
</div>
</template>

<style >
  .navbar{
    display: flex;
    flex-direction: row;
    gap: 30px;
    background-color: black;
    color: greenyellow;
    padding: 10px;
  }
  .navbar div{
    padding: 5px;
  }
  .nav-item{
    border: none;
    text-decoration: none;
    color: white;
    font-size: large;
  }
</style>
