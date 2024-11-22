<template>
	<div id="app">
		<HeaderComponent></HeaderComponent>
		<router-view/>
		<PlayerComponent songs="songs"></PlayerComponent>
	</div>
</template>

<script>

import HeaderComponent from "@/components/Header.vue";
import PlayerComponent from "@/components/Player.vue";

export default {
	name: 'App',
	components: {
		PlayerComponent,
		HeaderComponent
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
