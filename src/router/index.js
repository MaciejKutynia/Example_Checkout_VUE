import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home';
import Checkout from '../views/Checkout';
import Success from '../views/Success';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:id',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
