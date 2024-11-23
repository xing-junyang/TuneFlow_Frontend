<template>
	<div id="app">
		<HeaderComponent></HeaderComponent>
		<router-view/>
		<PlayerComponent v-show="showPlayer"></PlayerComponent>
	</div>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import HeaderComponent from "@/components/Header.vue"
import PlayerComponent from "@/components/Player.vue"

export default {
	name: 'App',
	components: {
		PlayerComponent,
		HeaderComponent
	},
	setup() {
		const route = useRoute()

		const showPlayer = computed(() => {
			return route.path !== '/login' && route.path !== '/register'
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
</style>