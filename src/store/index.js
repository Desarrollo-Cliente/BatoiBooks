import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },
    removeMessage(index) {
      this.messages.splice(index, 1);
    },
  },
});