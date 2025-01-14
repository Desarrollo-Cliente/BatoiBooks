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
    async fetchBook(id) {
      try {
        const response =  await apiClient.get(`/books/${id}`);
        
        return response.data;
      } catch (error) {
      this.errorMessage = 'Error al cargar el libro. Inténtalo de nuevo.';
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
    viewEdit(book) {
      this.$router.push({ name: 'edit', params: { id: book.id } });
    },
    async updateBook(book) {
      
      try {
        await apiClient.put(`/books/${book.id}`, book);
        const index = this.books.findIndex(b => b.id === book.id);
        this.books[index] = book;
      } catch (error) {
        this.errorMessage = 'Error al actualizar el libro. Inténtalo de nuevo.';
        console.error(error);
      }
    }
  },
  getters: {
    totalBooks(state) {
      return state.books.length;
    },
  },
});
