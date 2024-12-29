<template>
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
        <button @click="removeMessage(index)">X</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useMessagesStore } from "../store";
  
  export default {
    name: "AppMessages",
    setup() {
      const store = useMessagesStore();
      return {
        messages: store.messages,
        removeMessage: store.removeMessage,
      };
    },
  };
  </script>