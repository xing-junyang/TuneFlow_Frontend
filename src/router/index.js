import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import SongView from '../views/SongView.vue';
import LoginView from "../views/user/Login.vue";
import RegisterView from "@/views/user/Register.vue";

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

export default router;