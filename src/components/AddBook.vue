<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useModulesStore } from '../store/modules.js';
import { useBooksStore } from '../store/books.js';
import { useMessagesStore } from '../store/messages.js';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const mySchema = yup.object({
      moduleCode: yup.string().required('El modulo es obligatorio.'),
      publisher: yup.string().required('El editorial es obligatorio.'),
      status: yup.string().required('El estado es obligatorio.'),
      price: yup.number('El precio tiene que ser u numero.').required('El precio es obligatorio.').min(0, 'El precio no puede ser negativo.'),
      pages: yup.number('El numero de paginas tiene que ser u numero.').required('El numero de paginas es obligatorio.').min(0, 'El numero de paginas no puede ser negativo.'),
      comments: yup.string(),
    });
    return {
      LBL_ADD: { titulo: 'Añadir libro', btn: 'Añadir' },
      LBL_EDIT: { titulo: 'Editar libro', btn: 'Editar' },
      LBL: {},
      form: {
        id: null,
        moduleCode: '',
        publisher: '',
        status: '',
        price: 0,
        pages: 0,
        comments: '',
      },
      bookToEdit: false,
      mySchema
    };
  },
  methods: {
    resetForm() {
      if (this.LBL == this.LBL_EDIT && this.bookToEdit) {
        this.form = { ...this.bookToEdit };
      } else {
        this.form = {
          id: null,
          moduleCode: '',
          publisher: '',
          status: '',
          price: 0,
          pages: 0,
          comments: '',
        };
      }
    },
    async submitForm() {
      debugger
      
      try {
        if (this.LBL === this.LBL_EDIT) {
          this.booksStore.updateBook(this.form);
          this.messagesStore.addMessage('¡Editado exitosamente!', 'success');
        } else {
          if (this.booksStore.books.some((book) =>  book.userId == 2 && 
              book.moduleCode == this.form.moduleCode &&
              book.publisher == this.form.publisher && book.price == this.form.price)) {
              // simula que es el mismo usua
            this.messagesStore.addMessage('¡El libro ya existe, no puedes crearlo de nuevo!', 'error');
            return;
          }

          this.booksStore.addBook({ ...this.form, userId: 2 });
          this.messagesStore.addMessage('¡Añadido exitosamente!', 'success');
        }
        this.router.push('/');
        this.resetForm();
      } catch (error) {
        this.messagesStore.addMessage(
          '¡Hubo un error al procesar la solicitud!: ' + error,
          'error'
        );
      }
    },
  },
  mounted() {
    this.modulesStore.fetchModules();
    this.LBL = this.LBL_ADD;

    const bookId = this.route.params.id;
    if (this.router.currentRoute.value.matched[0].path === '/edit/:id') {
      if (bookId) {
        this.booksStore
          .fetchBook(bookId)
          .then((book) => {
            this.bookToEdit = book;
            if (this.bookToEdit) {
              this.form = { ...this.bookToEdit };
              this.LBL = this.LBL_EDIT;
            } else {
              this.messagesStore.addMessage('¡Libro no encontrado!', 'error');
              this.router.push('/');
            }
          })
          .catch((error) => {
            this.messagesStore.addMessage(
              '¡Error al buscar el libro!: ' + error,
              'error'
            );
          });
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === '/add') {
        this.LBL = this.LBL_ADD;
        this.resetForm();
      }
    },
  },
  setup() {
    return {
      router: useRouter(),
      route: useRoute(),
      messagesStore: useMessagesStore(),
      modulesStore: useModulesStore(),
      booksStore: useBooksStore(),
    };
  },
};
</script>

<template>
  <section id="form">
    <article>
      <Form @submit="submitForm" :validation-schema="mySchema">
        <h2>{{ LBL.titulo }}</h2>

        <div>
          <label for="id-module">Módulo:</label>
          <Field v-model="form.moduleCode" id="id-module" name="moduleCode" as="select" required>
            <option value="" disabled>Selecciona un módulo</option>
            <option v-for="module in modulesStore.modules" :key="module.code" :value="module.code">
              {{ module.cliteral }}
            </option>
          </Field>
          <ErrorMessage name="moduleCode" />
        </div>

        <div>
          <label for="publisher">Editorial:</label>
          <Field v-model="form.publisher" id="publisher" name="publisher" type="text" required />
          <ErrorMessage name="publisher" />
        </div>

        <div>
          <label for="status">Estado:</label>
          <div id="status">
            <label for="new">
              Nuevo
              <Field type="radio" id="new" name="status" value="new" v-model="form.status" required />
            </label>
            <label for="good">
              Bueno
              <Field type="radio" id="good" name="status" value="good" v-model="form.status" />
            </label>
            <label for="damaged">
              Dañado
              <Field type="radio" id="damaged" name="status" value="damaged" v-model="form.status" />
            </label>
          </div>
          <ErrorMessage name="status" />
        </div>

        <div>
          <label for="price">Precio:</label>
          <Field v-model.number="form.price" id="price" name="price" type="number" required min="0" step="0.01" />
          <ErrorMessage name="price" />
        </div>

        <div>
          <label for="pages">Páginas:</label>
          <Field v-model.number="form.pages" id="pages" name="pages" type="number" required min="0" />
          <ErrorMessage name="pages" />
        </div>

        <div>
          <label for="comments">Comentarios:</label>
          <Field v-model="form.comments" id="comments" name="comments" as="textarea" />
          <ErrorMessage name="comments" />
        </div>

        <button type="submit">{{ LBL.btn }}</button>
        <button type="button" @click="resetForm">Reset</button>
      </Form>
    </article>
  </section>
</template>



<style scoped>
#form {
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1em;
  background-color: #333;
  padding: 2em;
  border-radius: 8px;
}

form div {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

#status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  border-radius: 8px;
  flex-direction: row;
}

label {
  font-weight: bold;
  color: #888;
}

input[type="text"],
input[type="number"],
select,
textarea {
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #1a1a1a;
  color: #fff;
}

input[type="radio"] {
  margin-right: 0.5em;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.25s;
}

button:hover {
  background-color: #333;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

#remove {
  background-color: #f44336;
  color: white;
}

#remove:hover {
  background-color: #e41e1e;
}

.remove-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #333;
  padding: 1.5em;
  border-radius: 8px;
  color: #ffffff;
  margin: 1em 0;
  text-align: center;
}

.remove-container h2 {
  color: #ff4444;
  font-size: 1.5em;
}

#bookForm {
  input[type="submit"] {
    background-color: green;
    color: #333;
    transition: all 0.3s;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }

  input[type="submit"]:hover {
    background-color: #4caf50;
    color: #fff;
  }
}
</style>
