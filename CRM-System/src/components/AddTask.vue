<template>
  <div class="addTask">
    <input type="text" v-model="newTaskTitle" placeholder="Введите задачу" />
    <button @click="createTaskHandler">Add</button>
  </div>
</template>

<script lang="ts" setup>
import type { TodoRequest } from '@/types/types';
import { ref } from 'vue';
import { createTask } from '@/api';

const emit = defineEmits(['addTask']);
const newTaskTitle = ref<string>('');

const createTaskHandler = async () => {
  if (newTaskTitle.value.trim() === '') {
    alert('задача не может быть пустой');
    return;
  }

  const newTodo: TodoRequest = {
    title: newTaskTitle.value,
    isDone: false,
  };

  try {
    await createTask(newTodo);
    emit('addTask');
  } catch (error) {
    // console.error('createTaskHandler error is', error);
    alert(`ошибка при создании задачи: ${error} `);
  }
  newTaskTitle.value = '';
};
</script>
