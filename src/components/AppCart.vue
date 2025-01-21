<template>
  <button @click="buy">Realizar compra</button>
  <button @click="clear">Vaciar carrito</button>
  <div id="cart">
    <div v-if="booksStore.errorMessage" class="error">
      {{ booksStore.errorMessage }}
    </div>
    <h1>Listado de Libros</h1>
    <div id="total">
      <span>Total Libros: {{ cartStore.totalBooks }}</span>
    </div>
    <div id="total">
      <span>Precio Total: {{ cartStore.totalPrice }}</span>
    </div>
    <div id="list">
      <BookItem 
        v-for="book in cartStore.books" 
        :key="book.id" 
        :book="book" 
      >
        <button class="delete" @click="deleteBook(book.id)">
          <i class="bi bi-bag-dash"></i>
        </button>
      </BookItem>
    </div>
    
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useBooksStore } from '../store/books.js';
import { useCartStore } from '../store/cart.js';
import { useMessagesStore } from '../store/messages.js';

import BookItem from './BookItem.vue';


export default {
  components: {
    BookItem,
  },
  setup() {
    const booksStore = useBooksStore();
    const messagesStore = useMessagesStore();
    const cartStore = useCartStore();
    console.log(cartStore.books);
    
    onMounted(() => {
      booksStore.fetchBooks();
    });
    return {
      booksStore,
      messagesStore,
      cartStore,
    };
  },
  methods: {
    addToCart(book) {
      this.useCartStore.addBook(book);
    },
    deleteBook(id) {
      this.cartStore.removeBook(id);
      this.messagesStore.addMessage('Libro eliminado del carrito', 'success');
    },
    buy() {
      if (confirm('¿Desea comprar los libros?<br>El precio sera: '+this.cartStore.totalPrice)) {
        this.cartStore.clear();
        this.messagesStore.addMessage('Compra realizada con exito', 'success');
      }
    },
    clear() {
      this.cartStore.clear();
      this.messagesStore.addMessage('Carrito vaciado', 'success');
    },
  },
};
</script>