<template>
	<div class="home-view-container">
		<!--		<h1>Welcome to the Music Player</h1>-->
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component"/>
			</transition>
		</router-view>

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
	overscroll-behavior: none;
	//justify-content: center;
}

/* 定义过渡动画 */
.fade-enter-active, .fade-leave-active {
	transition: all 0.5s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
	opacity: 0;
	transform: scale(0.95) translateY(20px);
}

.fade-enter-to, .fade-leave-from {
	opacity: 1;
	transform: scale(1) translateY(0);
}

</style>