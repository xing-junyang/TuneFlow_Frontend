<script setup>

</script>

<template>
	<div class="loading-container">
		<div class="spinner"></div>
		<p class="loading-text">加载数据中，请稍候...</p>
	</div>
</template>

<style scoped>
.loading-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: #555;
}

.loading-text {
	margin-top: 16px;
	font-size: 16px;
	color: #666;
	font-weight: bold;
}

.spinner {
	width: 30px;
	height: 30px;
	border: 5px solid #c4c4c4;
	border-top: 5px solid #000000;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

/* 动画关键帧 */
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* 加载文字样式 */
.loading-container p {
	margin-top: 16px;
	font-size: 14px;
	color: #666;
}

</style>