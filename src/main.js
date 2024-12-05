import { createApp } from 'vue'
import Provider from './Provider.vue'
import router from "@/router";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'


axios.defaults.baseURL = ("http://localhost:8082")
axios.defaults.timeout = 30000;


createApp(Provider).use(router).use(ElementPlus).mount('#app')
