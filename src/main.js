import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { createPinia } from 'pinia';
import './assets/styles.css'; // Archivo CSS general

const app = createApp(App);

// Configuración de Vue Router y Pinia
app.use(router);
app.use(createPinia());

app.mount('#app');
