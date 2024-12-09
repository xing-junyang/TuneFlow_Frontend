<template>
	<div class="home-view-container">
<!--		<h1>Welcome to the Music Player</h1>-->
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'HomeView',
};
</script>

<style>
.home-view-container {
	background-color: var(--color-background-page);
	display: flex;
	height: calc(100% - var(--player-height));
	flex-direction: column;
	overflow: auto;
	//justify-content: center;
}

</style>