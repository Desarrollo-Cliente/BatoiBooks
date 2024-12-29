import { defineStore } from 'pinia';
import apiClient from '../services/api.js';

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [],
    errorMessage: '',
  }),
  actions: {
    async fetchModules() {
      try {
        const response = await apiClient.get('/modules'); // Endpoint de los libros
        this.modules = response.data;
      } catch (error) {
        this.errorMessage = 'Error al cargar los libros. Inténtalo de nuevo.';
        console.error(error);
      }
    },
  },
  getters: {
    totalModules(state) {
      return state.modules.length;
    },
  },
});
