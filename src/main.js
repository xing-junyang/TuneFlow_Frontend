import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";

axios.defaults.baseURL = ("http://localhost:8080")
axios.defaults.timeout = 30000;

createApp(App).use(router).mount('#app')
