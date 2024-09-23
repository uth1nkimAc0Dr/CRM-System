<template>
  <div class="task-item">
    <div class="checkbox-container">
      <input
        type="checkbox"
        v-model="localTask.isDone"
        @click="isCompletedHandler(localTask.isDone)"
      />
    </div>

    <div class="title-container">
      <input :disabled="isEditing" v-model="localTask.title" />
    </div>

    <div class="buttons-container">
      <div class="edit-buttons-container">
        <div v-if="isEditing">
          <button @click="switchEditing()">edit</button>
        </div>

        <div v-if="!isEditing" class="save-cancel-panel">
          <div class="save-button-container">
            <button
              @click="switchEditing(), changeTaskHandler(localTask.title)"
            >
              Сохранить
            </button>
          </div>

          <div class="cancel-button-container">
            <button @click="switchEditing()">Отменить</button>
          </div>
        </div>
      </div>

      <div class="remove-button-container">
        <button type="button" @click="removeTaskHandler(localTask.id)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, reactive } from 'vue';
import { changeTask, removeTask } from '@/api';
import type { ToDo } from '@/types/types';

const isEditing = ref<boolean>(true);
const emit = defineEmits([
  'removeTaskHandler',
  'changeTaskHandler',
  'isCompletedHandler',
]);

const props = defineProps<{ task: ToDo }>();
const localTask = reactive<ToDo>({ ...props.task });

const removeTaskHandler = async (id: number) => {
  await removeTask(id);
  emit('removeTaskHandler');
};

const isCompletedHandler = async (isDone: boolean) => {
  await changeTask(localTask.id, !isDone, localTask.title);
  emit('isCompletedHandler');
};

// имеет ли смысл передавать что-то в эту функцию, если v-model копии. Можно просто async()
const changeTaskHandler = async (title: string) => {
  console.log('local', localTask.title);
  console.log('props is', props.task.title);
  if (props.task.title != title) {
    await changeTask(localTask.id, localTask.isDone, title);
    emit('changeTaskHandler');
  }
};

const switchEditing = () => {
  isEditing.value = !isEditing.value;
};
</script>

<style lang="scss">
.task-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2px 2px;
  padding: 5px;
  border: solid 1px black;
  min-height: 20px;

  .checkbox-container {
    margin-left: 4px;
  }
  .title-container {
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    // margin-right: 40px;

    .edit-buttons-container {
    }
    .remove-button-container {
    }
  }

  // .task-title {
  //   margin: 0 auto;
  // }

  // .righted-task-edit {
  //   margin-right: 5px;
  // }
  // .righted-task-remove {
  //   margin-right: 5px;
  // }
}
</style>
