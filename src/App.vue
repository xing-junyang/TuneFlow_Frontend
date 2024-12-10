<template>
	<div class="root-app">
		<HeaderComponent></HeaderComponent>
		<div class="main-container">
			<nav class="sidebar-box">
				<Sidebar v-if="showSideBar" :showPlayer="showPlayer" />
			</nav>
			<main class="content">
				<router-view />
			</main>
		</div>
		<PlayerBar :show="showPlayer"></PlayerBar>
	</div>
</template>
<script setup>
import {computed, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from "@/components/Header.vue"
import PlayerBar from "@/components/Player.vue"
import Sidebar from "@/components/SiderBar/feature/index.vue"
import {getUserInfo} from "@/api/userApi";
import {getUserName} from "@/utils";

const route = useRoute()

const showPlayer = computed(() => {
	return !['login', 'register','upload_song_list'].includes(route.path.slice(1))
})

const showSideBar = computed(() => {
	return !['login', 'register','upload_song_list'].includes(route.path.slice(1))
})

onMounted(() => {
	getUserInfo().then(res => {
		sessionStorage.setItem('userInfo', JSON.stringify(res.data.result))
		getUserName();
	})
})
</script>

<style lang="less">
* {
	user-select: none;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.root-app {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

/* CSS 变量 */
:root {
	--color-primary: #1db954;
	--color-primary-dark: #1aa34a;
	--color-background-page: #000000;
	--color-background: #282828;
	--color-background-light: #333333;
	--color-background-hover: #404040;
	--color-background-tag: rgba(255, 255, 255, 0.1);
	--color-text: #ffffff;
	--color-text-secondary: #b3b3b3;
	--color-border: #404040;
	--player-height: 80px;
	--now-playing-width: 300px;
	--sidebar-padding: 12px 16px 8px;
	--sidebar-collapsed-padding: 8px;
	--sidebar-collapsed-gap: 0;
	--color-border: var(--color-text-secondary);
	--drawer-height: 70vh;
}

@media screen and (max-width: 920px) {
	:root {
		--player-height: 130px;
	}
}

@media screen and (max-width: 400px) {
	.sidebar-box {
		display: none;
	}
}

@media screen and (max-height: 800px) {
	:root {
		--drawer-height: 60vh;
	}
}

.main-container {
	display: flex;
	flex: 1;
	min-height: calc(100vh - var(--player-height));
}

.sidebar-box {
	padding: 8px;
	background-color: var(--color-background-page);
}

.sidebar-container{
	border-radius: 8px;
	background-color: var(--color-background);
}

.content {
	flex: 1;
	margin-left: 0;
	overflow: auto;
}
</style>
