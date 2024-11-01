import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import SongView from '../views/SongView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/playlist', component: PlaylistView },
  { path: '/song', component: SongView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;