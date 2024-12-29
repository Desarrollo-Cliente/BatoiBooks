<template>
    <div>
      <h1>Books List</h1>
      <ul>
        <li v-for="book in books" :key="book.id">
          {{ book.title }} - {{ book.author }}
          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "BooksList",
    data() {
      return {
        books: [],
      };
    },
    methods: {
      async deleteBook(id) {
        if (confirm(`Are you sure you want to delete book ID ${id}?`)) {
          // Placeholder for delete logic
          alert(`Book with ID ${id} deleted.`);
        }
      },
    },
  };
  </script>