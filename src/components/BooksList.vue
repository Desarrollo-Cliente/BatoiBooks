<script>
import { ref, onMounted } from 'vue';
import { useBooksStore } from '../store/books.js';
import { useMessagesStore } from '../store/messages.js';
import { useCartStore } from '../store/cart.js';

import BookItem from './BookItem.vue';
import Confirm from './Confirm.vue';

export default {
  components: {
    BookItem,
    Confirm,
  },
  setup() {
    const booksStore = useBooksStore();
    const cartStore = useCartStore();
    const messagesStore = useMessagesStore();
    const showModal = ref(false);
    const selectedBookId = ref(null);
    const inputsconfirm = ref([]);
    onMounted(() => {
      booksStore.fetchBooks();
    });
    return {
      booksStore,
      cartStore,
      messagesStore,
      showModal,
      selectedBookId,
      inputsconfirm,
    };
  },
  methods: {
    handleDelete(id) {
      this.selectedBookId = id;
      this.showModal = true;
      const book = this.booksStore.books.find((book) => book.id === id);
      this.inputsconfirm = [
        {
          key: `module-${id}`,
          label: 'Modulo: ',
          check: book.moduleCode,
        },
        {
          key: `id-${id}`,
          label: 'Id: ',
          check: book.id,
        },
      ];
    },
    confirmDelete() {
      try {
        this.booksStore.removeBook(this.selectedBookId);
        this.messagesStore.addMessage('Borrado exitosamente!', 'success');
        this.showModal = false;
        this.selectedBookId = null;
      } catch (error) {
        this.messagesStore.addMessage(
          '¡Hubo un error al procesar la solicitud!: ' + error,
          'error'
        );
      }
    },
    cancelDelete() {
      this.showModal = false;
      this.selectedBookId = null;
    },
    editBook(book) {
      this.$router.push({ path: `/edit/${book.id}` });
    },
    addToCart(book) {
      this.cartStore.addBook(book);
      this.messagesStore.addMessage('Libro añadido al carrito', 'success');
    },
    inCart(id) {
      return this.cartStore.books.some((book) => book.id === id);
    },
  },
};
</script>

<template>
  <div id="books">
    <div v-if="booksStore.errorMessage" class="error">
      {{ booksStore.errorMessage }}
    </div>
    <h1>Listado de Libros</h1>
    <div id="list">
      <BookItem 
        v-for="book in booksStore.books" 
        :key="book.id" 
        :book="book" 
      >
        <button class="addCart" @click="addToCart(book)" :disabled="inCart(book.id)">
          <i class="bi bi-bag-plus"></i>
        </button>
        <button class="edit" @click="editBook(book)">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="delete" @click="handleDelete(book.id)">
          <i class="bi bi-trash-fill"></i>
        </button>
      </BookItem>
    </div>
    <p>Total de libros: {{ booksStore.totalBooks }}</p>

    <Confirm 
      :show="showModal" 
      title="Eliminar libro" 
      message="¿Estás seguro de eliminar este libro?" 
      :inputs="inputsconfirm" 
      @confirm="confirmDelete" 
      @cancel="cancelDelete" 
    />
  </div>
</template>

<style scoped>
#error {
  color: red;
  text-align: center;
  margin-bottom: 10px;
}

#list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
