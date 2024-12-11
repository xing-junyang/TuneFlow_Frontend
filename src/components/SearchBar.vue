<script setup>
import { ref } from 'vue'
import router from "@/router";

const searchKey = ref('')

const handleSearchChange = () => {
	console.log('searchKey:', searchKey.value)
}

const handleSearch = () => {
	if(searchKey.value === ''){
		return
	}
	console.log('searched:', searchKey.value)
	router.push({ name: 'Search', params: {key_word: searchKey.value } });
}

const handleClearSearch = () => {
	searchKey.value = ''
}

</script>

<template>
<div class="search-bar">
	<input type="search" placeholder="搜索歌曲" v-model="searchKey" @input="handleSearchChange" @keydown.enter="handleSearch" @keydown.esc="handleClearSearch">
</div>
</template>

<style scoped>
.search-bar {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 40px;
}

.search-bar input {
	height: 40px;
	width: 30vw;
	padding: 0 20px;
	font-size: 16px;
	margin: 0 10px;
	border: 2px solid rgb(72, 72, 72);
	background-color: rgba(72, 72, 72);
	color: #a8a8a8;
	font-weight: bold;
	border-radius: 25px;
	transition: all 0.5s ease;
}

.search-bar input:hover {
	background-color: rgba(100, 100, 100);
}

.search-bar input:focus {
	border: 2px solid #1db954;
	outline: none;
	color: #3a3a3a;
	background-color: rgba(255, 255, 255, 0.8);
}

.search-bar input::placeholder {
	color: #a8a8a8;
	font-weight: bold;
}

@media (max-width: 800px) {
	.search-bar {
		margin: 0 10px;
	}
}

@media (max-width: 600px) {
	.search-bar {
		display: none;
	}
}
</style>