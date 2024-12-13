<script setup>
import Loading from "@/components/Loading.vue";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {getAlbumAllSongs, searchSongList} from "@/api/songlistApi";
import {playSongFromPlaylist, setPlaylistSongs} from "@/global/playlist";
import {ElMessage} from "element-plus";
import NoItem from "@/components/NoItem.vue";

const route = useRoute();
const searchKeyword = ref(route.params.key_word);
const albums = ref([]);
const isLoading = ref(false);

onMounted(async () => {
	// 在这里执行初始化逻辑
	console.log('SearchResultView mounted');
	isLoading.value = true;
	await searchSongList(searchKeyword.value).then((res) => {
		console.log('Search result:', res.data.result);
		albums.value = res.data.result;
	}).catch((err) => {
		console.error('Failed to search albums:', err);
		ElMessage.error('搜索专辑失败，您可能没有互联网连接');
	});
	isLoading.value = false;
});

watch(() => route.params.key_word, async (newkey) => {
	searchKeyword.value = newkey;
	isLoading.value = true;
	await searchSongList(newkey).then((res) => {
		console.log('Search result:', res.data.result);
		albums.value = res.data.result;
	}).catch((err) => {
		console.error('Failed to search albums:', err);
		ElMessage.error('搜索专辑失败，您可能没有互联网连接');
	});
	isLoading.value = false;
})

const navigateToAlbum = (albumId) => {
	// 导航到专辑详情页面的逻辑
	console.log('Navigate to album:', albumId);
	//Navigate to the album detail page
	router.push({ name: 'SonglistDetail', params: { song_list_id: albumId } });
};

const playAlbum = async (albumId) => {
	// 播放专辑的逻辑
	console.log('Play album:', albumId);
	getAlbumAllSongs(albumId).then((res) => {
		console.log('Songs in album:', res.data.result);
		// Play the songs in the album
		const songs = res.data.result;
		setPlaylistSongs(songs);
		playSongFromPlaylist();
	}).catch((err) => {
		console.error('Failed to get songs in album:', err);
		ElMessage.error('获取专辑歌曲失败，您可能没有互联网连接');
	});
};

</script>
<template>
	<div class="search-main-container">
		<div class="search-title">"{{searchKeyword}}" 的搜索结果</div>

		<div class="albums-grid" v-if="!isLoading">
			<div v-for="album in albums" :key="album.id" class="album-card">
				<div class="album-cover">
					<div class="album-image" @click="navigateToAlbum(album.id)">
						<!--						Display album image-->
						<img :src="album.pictureUrl" :alt="album.name" class="album-image" />
					</div>
					<div class="play-button" @click="playAlbum(album.id)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path d="M8 5v14l11-7z"/>
						</svg>
					</div>
				</div>
				<div class="album-info">
					<h3 class="album-name">{{ album.name }}</h3>
					<p class="album-description">{{ album.userName }}</p>
				</div>
			</div>
		</div>
		<Loading v-else />
		<NoItem v-if="albums.length === 0 && !isLoading" />
	</div>
</template>

<style scoped>
.search-main-container {
	display: flex;
	min-height: fit-content;
	flex-direction: column;
	align-items: start;
	padding: 40px;
	background-color: var(--color-background-page);
	color: #ffffff;
	//overflow: auto;
	flex:1;
}

.search-title {
	font-size: 36px;
	font-weight: bold;
	color: var(--color-text);
	margin-bottom: 32px;
}

.albums-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 24px;
	width: 100%;
}

.album-card {
	cursor: pointer;
	transition: all 0.5s ease;

	border-radius: 12px;
	overflow: hidden;
}

.album-card:hover {
	transform: scale(1.02);
	background-color: #252525;
}

.album-cover {
	position: relative;
	aspect-ratio: 1;
	width: 100%;
}

.album-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 12px;
}

.play-button {
	position: absolute;
	bottom: 8px;
	right: 8px;
	width: 54px;
	height: 54px;
	background-color: #1db954;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.play-button svg {
	width: 36px;
	height: 36px;
	color: white;
}

.play-button:hover {
	opacity: 1;
}

.album-card:hover {
	opacity: 1;
}

.album-info {
	padding: 16px;
}

.album-name {
	font-size: 16px;
	font-weight: 600;
	margin: 0 0 8px 0;
	color: #ffffff;
}

.album-description {
	font-size: 14px;
	color: #b3b3b3;
	margin: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

@media (max-width: 820px) {
	.search-main-container {
		padding: 20px;
	}

	.albums-grid {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 16px;
	}

	.search-title {
		font-size: 28px;
		margin-bottom: 24px;
	}
}
</style>