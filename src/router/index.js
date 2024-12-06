import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/home/HomeView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import SongView from '../views/SongView.vue';
import LoginView from "../views/user/Login.vue";
import RegisterView from "@/views/user/Register.vue";
import {hasLogin} from '@/utils/index.js';
import FeatureView from "@/views/home/FeatureView.vue";
import SonglistDetail from "@/views/home/SonglistDetail.vue";
import UploadSongList from "@/views/upload/UploadSonglist.vue";
import NotLogin from "@/views/home/NotLogin.vue";

const routes = [
    {
        path: '/', component: HomeView, redirect: '/feature', children: [
            {path: '/feature', component: FeatureView},
            {path: '/song_list_detail/:song_list_id', name: 'SonglistDetail', component: SonglistDetail},
            {path: '/not_login', component: NotLogin}
        ]
    },
    {path: '/playlist', component: PlaylistView},
    {path: '/song', component: SongView},
    {path: '/login', component: LoginView},
    {path: '/register', component: RegisterView},
    {path: '/upload_song_list', component: UploadSongList},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if ((to.path === '/login' || to.path === '/register') && hasLogin()) {
        next('/');
    } else if((to.path !== '/login' && to.path !== '/register' && to.path !== '/not_login') && !hasLogin()) {
        next('/not_login');
    } else {
        next();
    }
});

export default router;