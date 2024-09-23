<template>
  <div class="content">
    <AddTask @addTask="updateTasks" />

    <nav>
      <button
        type="button"
        @click="changeFilter('all')"
        :class="{ active: currentFilter == 'all' }"
      >
        All
      </button>

      <button
        type="button"
        @click="changeFilter('inWork')"
        :class="{ active: currentFilter == 'inWork' }"
      >
        In progress
      </button>

      <button
        type="button"
        @click="changeFilter('completed')"
        :class="{ active: currentFilter == 'completed' }"
      >
        Completed Tasks
      </button>
    </nav>

    <div class="todo-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @removeTaskHandler="updateTasks"
        @changeTaskHandler="updateTasks"
        @isCompletedHandler="updateTasks"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getTasks } from '@/api';
import AddTask from '@/components/AddTask.vue';
import TaskItem from '@/components/TaskItem.vue';
import type { ToDo } from '@/types/types';

const tasks = ref<ToDo[]>([]);
// interface ToDo {
//   id: number;
//   title: string;
//   created: string; // ISO date string
//   isDone: boolean;
// }
const currentFilter = ref<string>('all');

const changeFilter = async (newFilter: string) => {
  currentFilter.value = newFilter;
  await updateTasks();
};

const updateTasks = async () => {
  try {
    const response = await getTasks(currentFilter.value);
    tasks.value = response.data;
  } catch (error) {
    console.log('failed to fetch tasks:', error);
  }
};

// const removeTaskHandler = async (id: number) => {
//   await removeTask(id);
//   await updateTasks();
// };

// onMounted(async () => {
//   console.log('onMounted вызван');
//   try {
//     await updateTasks();
//   } catch (error) {
//     console.log('Ошибка при вызове updateTasks:', error);
//   }
//   console.log('onMounted завершен');
// });

onMounted(async () => {
  await updateTasks();
});
</script>

<style scoped lang="scss">
nav {
  display: flex;
  justify-content: center;

  .active {
    color: red;
    // text-decoration: dashed blue;
  }
  button {
    margin: 0px 5px;
  }
}

.todo-list {
  display: flex;
  flex-direction: column;
  margin: 5px 50px;
}
</style>
