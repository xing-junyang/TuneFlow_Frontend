<template>
	<div id="app">
		<HeaderComponent></HeaderComponent>
		<router-view/>
		<PlayerBar :show="showPlayer"></PlayerBar>
	</div>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import HeaderComponent from "@/components/Header.vue"
import PlayerBar from "@/components/Player.vue"

export default {
	name: 'App',
	components: {
		PlayerBar,
		HeaderComponent
	},
	setup() {
		const route = useRoute()

		const showPlayer = computed(() => {
			if (route.path !== '/login' && route.path !== '/register') {
				return true;
			} else {
				return false;
			}
		})

		return {
			showPlayer
		}
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

/* CSS 变量 */
:root {
	--color-primary: #1db954;
	--color-primary-dark: #1aa34a;
	--color-background: #282828;
	--color-background-light: #333333;
	--color-background-hover: #404040;
	--color-background-tag: rgba(255, 255, 255, 0.1);
	--color-text: #ffffff;
	--color-text-secondary: #b3b3b3;
	--color-border: #404040;
	--player-height: 80px;
	--now-playing-width: 300px;
}

@media screen and (max-width: 920px) {
	:root {
		--player-height: 120px;
	}
}
</style>