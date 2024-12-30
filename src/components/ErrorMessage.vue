<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  }
});
</script>

<template>
  <div v-if="props.show" class="error-message">
    <p>{{ props.message }}</p>
    <button @click="$emit('close')">X</button>
  </div>
</template>

<style scoped>
.error-message {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 5px;
  font-size: 1.2em;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button {
  margin-top: 10px;
  background-color: #ccc;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #bbb;
}
</style>
