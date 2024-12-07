<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import {setPlaylistSongs, playSongFromPlaylist, playlist, addSong} from "@/global/playlist";
import {getAlbum, getAlbumSongs} from "@/api/songlistApi";
import {ElMessage} from "element-plus";
import Loading from "@/components/Loading.vue";

const route = useRoute();
const isLoading = ref(false);

// 专辑数据
const albumInfo = ref();

// 歌曲列表数据
const songs = ref([]);

const formatDuration = (seconds) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const getAudioDuration = async (url) => {
	const audio = new Audio(url);
	// get audio duration by url, the url should be a valid audio file
	return new Promise((resolve) => {
		audio.addEventListener('loadedmetadata', () => {
			console.log('Audio duration:', audio.duration);
			resolve(formatDuration(Math.round(audio.duration)));
		});
	});
};

const getAllSongsAudioDuration = async () => {
	for (let i = 0; i < songs.value.length; i++) {
		songs.value[i].duration = await getAudioDuration(songs.value[i].audioUrl);
	}
};

const playSong = (index) => {
	console.log('Playing song:', index);
	let songsToPlay = [];
	console.log(songs.value[index]);
	songsToPlay.push(songs.value[index])
	setPlaylistSongs(songsToPlay)
	playSongFromPlaylist();
	console.log(playlist)
};

const playAll = () => {
	console.log('Playing all songs');
	let songsToPlay = [];
	for (let i = 0; i < songs.value.length; i++) {
		songsToPlay.push(songs.value[i]);
	}
	setPlaylistSongs(songsToPlay);
	playSongFromPlaylist();
};

const addToPlayList = (index) => {
	console.log('Adding to playlist:', index);
	addSong(songs.value[index]);
};

onMounted(async () => {
	console.log('Song list detail view mounted');
	isLoading.value = true;
	//getSongs();
	songs.value = [];
	const songlistId = route.params.song_list_id;
	console.log('Song list id:', songlistId);
	const sig = await getAlbum(Number(songlistId)).then(res => {
		console.log('Album res:', res);
		if (res === undefined) {
			return -1;
		}
		albumInfo.value = res.data.result;
		albumInfo.value.description = albumInfo.value.description.replace(/\\n|\n/g, '<br><br>');
	}).catch(err => {
		console.log(err)
		ElMessage.error('获取专辑信息失败，您可能没有互联网连接');
		return -1;
	});
	if (sig === -1) {
		return;
	}
	for (let i = 0; i < albumInfo.value.songsId.length; i++) {
		await getAlbumSongs(Number(albumInfo.value.songsId[i])).then(res => {
			console.log(res);
			songs.value.push(res.data.result);
		}).catch(err => {
			console.log(err)
			ElMessage.error('获取歌曲信息失败，您可能没有互联网连接');
		});
	}
	await getAllSongsAudioDuration()
	isLoading.value = false;
});


</script>

<template>
	<div class="song-list-detail-main-container">
		<!-- 专辑头部信息 -->
		<div class="album-header">
			<img :src="albumInfo?albumInfo.pictureUrl:''" :alt="albumInfo?albumInfo.name:''" class="album-cover">
			<div class="album-info">
				<div class="album-name">{{ albumInfo?albumInfo.name:'' }}</div>
				<div class="album-artist-name">{{ albumInfo?albumInfo.userName:'' }}</div>
				<p class="album-description" v-html="albumInfo?albumInfo.description:''"></p>
				<div class="album-meta">
					<span class="rating">★ {{ albumInfo?albumInfo.mark:5 }}</span>
					<span class="separator">•</span>
					<span class="date">{{ new Date(albumInfo?albumInfo.createTime:"1970").getFullYear() }}</span>
					<span class="separator">•</span>
					<span class="songs-count">{{ albumInfo?albumInfo.songsId.length:0 }} 首歌曲</span>
				</div>
			</div>
		</div>

		<!-- 播放控制栏 -->
		<div class="controls">
			<button class="play-all-btn" @click="playAll" :disabled="isLoading">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path d="M8 5v14l11-7z"/>
				</svg>
				播放全部
			</button>
		</div>

		<!-- 歌曲列表 -->
		<div class="songs-list" v-if="!isLoading">
			<table>
				<thead>
				<tr>
					<th></th>
					<th>#</th>
					<th>标题</th>
					<th>艺术家</th>
					<th>流派</th>
					<th>时长</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(song, index) in songs" :key="song.id" class="song-row">
					<td class="add-to-playlist-btn" @click="addToPlayList(index)">
						<!--						add to playlist button-->
						<span class="material-icons">playlist_add</span>
					</td>
					<td @click="playSong(index)">{{ index + 1 }}</td>
					<td class="song-title" @click="playSong(index)">
						<img :src="song.pictureUrl" :alt="song.name" class="song-thumbnail">
						<span>{{ song.name }}</span>
					</td>
					<td @click="playSong(index)">{{ song.artist }}</td>
					<td @click="playSong(index)">{{ song.genre }}</td>
					<!-- 根据音频 URL获取时长 -->
					<td @click="playSong(index)">{{ song.duration }}</td>
				</tr>
				</tbody>
			</table>
		</div>
		<Loading v-else />
	</div>
</template>

<style scoped>
.song-list-detail-main-container {
	container-type: inline-size;
	container-name: song-list-detail;
	display: flex;
	height: 95%;
	flex-direction: column;
	align-items: start;
	padding: 40px;
	background-color: var(--color-background-page);
	color: #ffffff;
	overflow: auto;
	flex: 1;
}

.album-header {
	display: flex;
	gap: 32px;
	margin-bottom: 32px;
	width: 100%;
}

.album-cover {
	width: 300px;
	height: 300px;
	object-fit: cover;
	border-radius: 12px;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.album-name {
	font-size: 48px;
	font-weight: bold;
	text-align: start;
}

.album-artist-name{
	font-size: 24px;
	text-align: start;
	color: #b3b3b3;
}

.album-info {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.album-info h1 {
	font-size: 48px;
	font-weight: bold;
	margin: 0 0 16px 0;
}

.album-description {
	font-size: 16px;
	text-align: start;
	color: #b3b3b3;
	margin: 30px 0 30px 0;
	line-height: 1.5;
	white-space: pre-line;
}

.album-meta {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #b3b3b3;
}

.separator {
	color: #666;
}

.controls {
	margin-bottom: 32px;
	width: 100%;
}

.play-all-btn {
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: #1db954;
	border: none;
	border-radius: 24px;
	color: white;
	padding: 12px 32px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	transition: background-color 0.5s ease;
}

.play-all-btn:hover {
	background-color: #1ed760;
}

.play-all-btn:disabled {
	background-color: #666;
	cursor: not-allowed;
}

.play-all-btn svg {
	width: 24px;
	height: 24px;
}

.songs-list {
	width: 100%;
}

table {
	width: 100%;
	border-collapse: collapse;
}

th {
	text-align: left;
	padding: 12px;
	border-bottom: 1px solid #333;
	color: #b3b3b3;
	font-weight: normal;
}

.add-to-playlist-btn {
	cursor: pointer;
	width: 24px;
}

.song-row {
	cursor: pointer;
	transition: background-color 0.2s ease;
}

.song-row:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

td {
	padding: 12px;
	border-bottom: 1px solid #333;
	text-align: start;
}

.song-title {
	display: flex;
	align-items: center;
	gap: 12px;
}

.song-thumbnail {
	width: 40px;
	height: 40px;
	border-radius: 4px;
	object-fit: cover;
}


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


@container song-list-detail (max-width: 820px) {
	.song-list-detail-main-container {
		padding: 20px;
	}

	.album-header {
		flex-direction: column;
	}

	.album-cover {
		width: 200px;
		height: 200px;
	}

	.album-info h1 {
		font-size: 32px;
	}

	th:last-child,
	td:last-child {
		display: none;
	}
}

@container song-list-detail (max-width: 1200px) {
	.album-cover {
		width: 240px;
		height: 240px;
	}
}
</style>