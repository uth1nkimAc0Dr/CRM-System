<template>
  <div class="content">
    <AddTask @addTask="updateTasks" />

    <nav>
      <button
        type="button"
        @click="() => changeFilterHandler('all')"
        :class="{ active: currentFilter === 'all' }"
      >
        All
      </button>

      <button
        type="button"
        @click="() => changeFilterHandler('inWork')"
        :class="{ active: currentFilter === 'inWork' }"
      >
        In progress
      </button>

      <button
        type="button"
        @click="() => changeFilterHandler('completed')"
        :class="{ active: currentFilter === 'completed' }"
      >
        Completed Tasks
      </button>
    </nav>

    <div class="todo-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @remove="updateTasks"
        @change="updateTasks"
        @changeCompleted="updateTasks"
      />
      <!-- changeCompleted норм звучит? -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AddTask from '@/components/AddTask.vue';
import TaskItem from '@/components/TaskItem.vue';
import type { Todo } from '@/types/types';

const currentFilter = ref<'all' | 'inWork' | 'completed'>('all');

const changeFilterHandler = async (
  newFilter: 'all' | 'inWork' | 'completed',
) => {
  currentFilter.value = newFilter;
  //трай-кэтч ниже присвоения должен находиться?
  try {
    await updateTasks();
  } catch (error) {
    alert(`failed to change filter:, ${error}`);
  }
};

const updateTasks = async () => {
  try {
    const response = await getTasks(currentFilter.value);
    tasks.value = response.data;
  } catch (error) {
    console.log('failed to fetch tasks:', error);
  }
};

const tasks = ref<Todo[]>([]);
import { getTasks } from '@/api';

onMounted(async () => {
  try {
    await updateTasks();
  } catch (error) {
    console.log('ошибка загрузки данных', error);
    // нужно ли так кэтчить ошибку?
  }
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
