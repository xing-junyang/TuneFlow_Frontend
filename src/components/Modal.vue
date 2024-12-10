<script setup>
defineProps({
	title: String
})

</script>

<template>
	<div class="modal-overlay" @click.self="$emit('closeModal')">
		<div class="modal-content">
			<div class="modal-header">
				<h2>{{ title }}</h2>
				<button class="close-button" @click="$emit('closeModal')">
					<span class="material-icons">close</span>
				</button>
			</div>
			<div class="modal-body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2000;
	animation: fade 0.5s ease forwards;
}

.modal-content {
	background-color: rgba(25,25,25,1);
	width: 90%;
	max-width: 600px;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.1);
	animation: fadeIn 0.5s ease forwards;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 1.5rem;
	background-color: rgba(25,25,25,1);
	color: #fff;
}

.modal-header h2 {
	margin: 0;
	font-size: 1.5rem;
}

.close-button {
	background: none;
	border: none;
	color: #fff;
	cursor: pointer;
}

.modal-body {
	padding: 1rem 1.5rem;
	max-height: 70vh;
	overflow-y: auto;
}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

</style>