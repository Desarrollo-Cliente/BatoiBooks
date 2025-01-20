<template>
    <div class="card" :id="book.id">
      <img
        :src="bookImage"
        :alt="`Libro con id: ${book.id}`"
        class="card-img"
      />
      <div class="card-content">
        <h3>{{ getModule }}</h3>
        <h4>Editorial: {{ book.publisher }}</h4>
        <p>Precio: {{ book.price }}€</p>
        <p>Páginas: {{ book.pages }}</p>
        <p>Estado: {{ book.status }}</p>
        <p>Comentarios: {{ book.comments }}</p>
        <p>Fecha de venta: {{ book.soldDate }}</p>
        <div class="icons">
          <button class="addCart" @click="$emit('add-to-cart', book)">
            <i class="bi bi-bag-plus"></i>
          </button>
          <button class="edit" @click="$emit('edit-book', book)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="delete" @click="$emit('delete-book', book.id)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useModulesStore } from '../store/modules.js';

  export default {
    name: "BookItem",
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
    computed: {
      bookImage() {
        return "https://dummyimage.com/100x100/fff/000"; // Imagen por defecto
      },
      getModule() {
        const modulesStore = useModulesStore();
        return modulesStore.moduleById(this.book.moduleCode);
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .card-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
  .card-content {
    text-align: center;
  }
  .card-content p{
    margin: 10px;
  }
  .icons {
    border-top: #ddd 1px solid;
    padding-top: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  button {
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
    transition: all ease 0.4s;
  }
  button:hover {
    color: #646cff;
  }
  </style>
  