import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
  }),
  actions: {
    // Método para agregar un mensaje con tipo
    addMessage(message, type = 'error') {
      this.messages.push({ message, type });
    },
    // Método para eliminar un mensaje
    removeMessage(index) {
      this.messages.splice(index, 1);
    },
    // Método para limpiar todos los mensajes
    clearMessages() {
      this.messages = [];
    }
  }
});
