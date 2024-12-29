<script setup>
import { onMounted } from 'vue';
import { useBooksStore } from '../store/books.js';

const booksStore = useBooksStore();

onMounted(() => {
  booksStore.fetchBooks();
});
</script>

<template>
  <div>
    <h1>Listado de Libros</h1>
    <div v-if="booksStore.errorMessage">{{ booksStore.errorMessage }}</div>
    <table v-if="booksStore.books.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Module</th>
          <th>Pages</th>
          <th>Photo</th>
          <th>Price</th>
          <th>Publisher</th>
          <th>SoldDate</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in booksStore.books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.moduleCode }}</td>
          <td>{{ book.pages }}</td>
          <td>{{ book.photo }}</td>
          <td>{{ book.price }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.soldDate }}</td>
          <td>{{ book.status }}</td>
        </tr>
      </tbody>
    </table>
    <p>Total de libros: {{ booksStore.totalBooks }}</p>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  text-align: left;
}
</style>
