import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import SongView from '../views/SongView.vue';
import LoginView from "../views/user/Login.vue";
import RegisterView from "@/views/user/Register.vue";
import { hasLogin } from '@/utils/index.js';

const routes = [
  { path: '/', component: HomeView },
  { path: '/playlist', component: PlaylistView },
  { path: '/song', component: SongView },
  { path: '/login', component: LoginView},
  { path: '/register', component: RegisterView}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if((to.path === '/login' || to.path === '/register') && hasLogin()) {
    next('/');
  } else {
    next();
  }
});

export default router;