import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    books: JSON.parse(localStorage.getItem('cartBooks')) || [],
    errorMessage: '',
  }),
  actions: {
    removeBook(idBook) {
      const bookExists = this.books.find(b => b.id == idBook);
      if (!bookExists) {
        this.errorMessage = 'El libro no está en el carrito.';
        return;
      }
      try {
        this.books = this.books.filter(book => idBook !== book.id);
        this.saveToLocalStorage();
      } catch (error) {
        this.errorMessage = 'Error al eliminar el libro. Inténtalo de nuevo.';
        console.error(error);
      }
    },
    addBook(book) {
      if (!this.books) {
        this.errorMessage = 'Error al añadir el libro. Inténtalo de nuevo.';
        return;
      }
      const bookExists = this.books.find(b => b.id === book.id);
      if (bookExists) {
        this.errorMessage = 'El libro ya está en el carrito.';
        return;
      }
      try {
        this.books.push(book);
        this.saveToLocalStorage();
      } catch (error) {
        this.errorMessage = 'Error al añadir el libro. Inténtalo de nuevo.';
        console.error(error);
      }
    },
    clear(){
      this.books = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('cartBooks', JSON.stringify(this.books));
    },
  },
  getters: {
    totalBooks(state) {
      return state.books.length;
    },
    totalPrice() {
      return this.books.reduce((acc, book) => acc + book.price, 0).toFixed(2);
    },
  },
});
