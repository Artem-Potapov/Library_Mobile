import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/books',
    component: () => import ('../views/Home.vue')
  },
  {
    path: '/favorite',
    component: () => import ('../views/Favorite.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/books'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
