import { createRouter, createWebHistory } from 'vue-router';
import ToDoPage from '@/pages/ToDoPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'allToDo' },
    },
    {
      path: '/todos',
      name: 'allToDo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ToDoPage,
    },
  ],
});

export default router;
