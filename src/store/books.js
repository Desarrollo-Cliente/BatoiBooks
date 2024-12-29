import { defineStore } from 'pinia';
import apiClient from '../services/api.js';

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    errorMessage: '',
  }),
  actions: {
    async fetchBooks() {
      try {
        const response = await apiClient.get('/books'); // Endpoint de los libros
        this.books = response.data;
      } catch (error) {
        this.errorMessage = 'Error al cargar los libros. Inténtalo de nuevo.';
        console.error(error);
      }
    },
  },
  getters: {
    totalBooks(state) {
      return state.books.length;
    },
  },
});
