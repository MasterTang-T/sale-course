import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/frontend'
  },
  {
    path: '/frontend',
    name: 'Frontend',
    component: () => import('../views/frontend/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
