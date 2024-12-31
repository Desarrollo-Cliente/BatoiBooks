<template>
    <div v-if="messages.length" id="messages">
      <div 
        v-for="(msg, index) in messages" 
        :key="index" 
        class="message" 
        :class="msg.type">
        <p>{{ msg.message }}</p>
        <button @click="removeMessage(index)">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useMessagesStore } from '../stores/messages.js';
  
  const messagesStore = useMessagesStore();
  const messages = computed(() => messagesStore.messages);
  const removeMessage = (index) => {
    messagesStore.removeMessage(index);
  };
  </script>
  
  <style scoped>
  #messages {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .message {
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .message.error {
    background-color: #f44336;
    color: white;
  }
  
  .message.success {
    background-color: #4caf50;
    color: white;
  }
  
  button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2em;
  }
  
  button:hover {
    text-decoration: underline;
  }
  </style>
  