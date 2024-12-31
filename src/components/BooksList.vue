<script setup>
import { ref, onMounted } from 'vue';
import { useBooksStore } from '../store/books.js';
import { useMessagesStore } from '../store/messages.js';
import BookItem from './BookItem.vue';
import Confirm from './Confirm.vue';

const booksStore = useBooksStore();
const messagesStore = useMessagesStore();

const showModal = ref(false);
const selectedBookId = ref(null);

const inputsconfirm = ref([]);

onMounted(() => {
  booksStore.fetchBooks();
});

const handleDelete = (id) => {
  selectedBookId.value = id;
  showModal.value = true;

  const book = booksStore.books.find((book) => book.id === id);
  inputsconfirm.value = [
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
};

const confirmDelete = () => {
  try {
    booksStore.removeBook(selectedBookId.value);
    messagesStore.addMessage('Borrado exitosamente!', 'success');
    showModal.value = false;
    selectedBookId.value = null;
  } catch (error) {
    messagesStore.addMessage('¡Hubo un error al procesar la solicitud!: ' + error, 'error');
  }
};

const cancelDelete = () => {
  showModal.value = false;
  selectedBookId.value = null;
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
        @delete-book="handleDelete" 
      />
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
