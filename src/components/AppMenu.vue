<template>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/add">Add Book</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  
  export default {
    name: "AppMenu",
  };
  </script>