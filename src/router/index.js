import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/frontend',
  },
  {
    path: '/frontend',
    name: 'frontend',
    component: () => import(/* webpackChunkName: "frontend" */ '../views/frontend/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes,
});

export default router;
