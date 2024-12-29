<template>
    <div>
      <h1>Cart</h1>
      <ul>
        <li v-for="item in cart" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "AppCart",
    data() {
      return {
        cart: [],
      };
    },
  };
  </script>