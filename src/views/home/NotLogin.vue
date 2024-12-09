<!-- NotLogin.vue-->

<script setup>

</script>

<template>
	<div class="notlogin-home">
		<div class="notlogin-home-title">登录以浏览 Tune Flow</div>
<!--		<div class="home-title">登录以浏览音乐</div>-->
		<div class="notlogin-home-content-button">
			<router-link to="/login">
				<button class="notlogin-home-content-button-login">去登录</button>
			</router-link>
		</div>
	</div>

</template>

<style scoped>
.notlogin-home {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	padding-top: 20vh;
	overflow: hidden;
}
.notlogin-home-title {
	font-size: 48px;
	font-weight: bold;
	color: var(--color-text);
	margin-bottom: 32px;
}
.notlogin-home-content-button {
	display: flex;
	gap: 16px;
}
.notlogin-home-content-button-login {
	padding: 12px 24px;
	font-size: 16px;
	font-weight: bold;
	color: #ffffff;
	background-color: var(--color-primary);
	border: none;
	border-radius: 24px;
	cursor: pointer;
}

</style>