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
        const response = await apiClient.get('/books');
        this.books = response.data;
      } catch (error) {
        this.errorMessage = 'Error al cargar los libros. Inténtalo de nuevo.';
        console.error(error);
      }
    },
    async removeBook(id) {
      try {
        await apiClient.delete(`/books/${id}`);
        this.books = this.books.filter(book => book.id !== id);
      } catch (error) {
        this.errorMessage = 'Error al eliminar el libro. Inténtalo de nuevo.';
        console.error(error);
      }
    },
    async addBook(book) {
      
      try {
        const response = await apiClient.post('/books', book);
        this.books.push(response.data);
      } catch (error) {
        this.errorMessage = 'Error al añadir el libro. Inténtalo de nuevo.';
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
