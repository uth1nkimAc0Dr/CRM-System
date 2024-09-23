<template>
  <div class="addTask">
    <input type="text" v-model="newTaskTitle" placeholder="Введите задачу" />
    <button @click="createTaskHandler(newTaskTitle)">Add</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { createTask } from '@/api';

const emit = defineEmits(['addTask']);
const newTaskTitle = ref<string>('');

const createTaskHandler = async (title: string) => {
  if (newTaskTitle.value.trim() == '') {
    alert('задача не может быть пустой');
    return;
  }
  try {
    await createTask(title);
    emit('addTask');
  } catch (error) {
    console.error('createTaskHandler error is', error);
  }
  newTaskTitle.value = '';
};
</script>
