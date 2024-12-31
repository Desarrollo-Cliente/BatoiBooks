<template>
  <div class="messages">
    <div 
      v-for="(message, index) in messages" 
      :key="index" 
      class="message" 
      :class="message.type">
      {{ message.message }}
      <button @click="removeMessage(index)">X</button>
    </div>
  </div>
</template>

<script>
import { useMessagesStore } from "../store/messages.js";

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

<style scoped>
.messages {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999; /* Asegúrate de que se muestre encima de otros elementos */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 200px; /* Asegúrate de que los mensajes tengan un ancho mínimo */
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
