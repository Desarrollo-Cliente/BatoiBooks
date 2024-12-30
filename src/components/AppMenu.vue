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

<style>
  nav {
    background-color: #333;
    color: white;
    padding: 1em;
  
    ul {
      display: flex;
      justify-content: space-around;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: 0.5em;
        transition: all 0.3s;
        border-radius: 10px;

        a {
          color: white;
          text-decoration: none;
        }

      }

      li:hover{
        transform: scale(1.1);
        background-color: #555;
      }
    }


  }
</style>
