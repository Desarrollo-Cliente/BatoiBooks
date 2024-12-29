<script setup>
import { onMounted } from 'vue';
import { useBooksStore } from '../store/books.js';
import BookItem from './BookItem.vue';

const booksStore = useBooksStore();

onMounted(() => {
  booksStore.fetchBooks();
});
</script>

<template>
  <div id="books">
    <div v-if="booksStore.errorMessage">{{ booksStore.errorMessage }}</div>
    <h1>Listado de Libros</h1>
    <div id="list">
      <BookItem v-for="book in booksStore.books" :key="book.id" :book="book" />
    </div>
    <p>Total de libros: {{ booksStore.totalBooks }}</p>
  </div>
</template>

<style scoped>
#list {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

</style>
