<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <label for="title">Title:</label>
        <input id="title" v-model="title" required />
        <label for="author">Author:</label>
        <input id="author" v-model="author" required />
        <button type="submit">Add</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddBook",
    data() {
      return {
        title: "",
        author: "",
      };
    },
    methods: {
      async addBook() {
        // Placeholder for add logic
        alert(`Book added: ${this.title} by ${this.author}`);
      },
    },
  };
  </script>