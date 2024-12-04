<template>
    <SidebarProvider>
        <App />
    </SidebarProvider>
</template>

<script setup>
import { initUserStore } from '@/global/user'
import { getUserSongs } from '@/global/songs'
import App from './App.vue'
import {
    SidebarProvider,
} from "@/components/SiderBar"


// 初始化用户状态
initUserStore()
// 初始化歌单列表2
getUserSongs()
</script>