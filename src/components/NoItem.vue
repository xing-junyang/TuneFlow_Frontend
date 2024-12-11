<script setup>

</script>

<template>
	<div class="no-item-container">
		<div class="no-item">
			<i class="fa-brands fa-soundcloud"></i>
		</div>
		<p class="no-item-text">暂无相关数据</p>
	</div>
</template>

<style scoped>
.no-item-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: #555;
}

.no-item-text {
	margin-top: 16px;
	font-size: 14px;
	color: #666;
	font-weight: bold;
}

.no-item {
	width: 80px;
	height: 40px;
}

.no-item i{
	font-size: 50px;
	color: #666;
}
</style>