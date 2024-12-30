<script setup>
import { defineProps, defineEmits, reactive, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirmar acción',
  },
  message: {
    type: String,
    default: '¿Estás seguro de que deseas continuar?',
  },
  inputs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const localInputs = reactive([]);

const syncInputs = () => {
  localInputs.splice(0, localInputs.length, ...props.inputs.map(input => ({ ...input })));
};

watch(() => props.inputs, syncInputs, { immediate: true });

const handleConfirm = () => {
  if (
    localInputs.length !== 0 && 
    localInputs.every((input) => input.result === input.check)
  ) {
    emit('confirm');
  } else {
    emit('cancel');
  }
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<template>
  <div v-if="props.show" class="modal-overlay">
    <div class="modal">
      <h2 class="modal-title">{{ props.title }}</h2>
      <p class="modal-message">{{ props.message }}</p>
      <div v-if="localInputs.length !== 0">
        <div v-for="input in localInputs" :key="input.key">
          <label :for="input.key">{{ input.label }}</label>
          <input 
            :id="input.key" 
            :placeholder="input.placeholder" 
            v-model="input.result" 
          />
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-confirm" @click="handleConfirm">Confirmar</button>
        <button class="btn-cancel" @click="handleCancel">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.modal-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.modal-message {
  font-size: 1em;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn-confirm {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #218838;
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #c82333;
}
</style>
