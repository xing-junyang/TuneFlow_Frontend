<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {setPlaylistSongs, playSongFromPlaylist, playlist, addSong} from "@/global/playlist";

const route = useRoute();
const songListId = route.params.song_list_id;

// Mock 专辑数据
const albumInfo = ref({
	id: songListId,
	name: "午夜色彩",
	userId: "user1",
	songsId: "1,2,3,4",
	mark: "4.8",
	description: "深夜里的电子音乐精选，包含多首让人沉醉的电子音乐作品。从深邃的氛围到律动的节拍，带你进入声音的海洋。",
	createTime: "2024-01-01T00:00:00+08:00",
	type: "Album",
	pictureUrl: "https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0"
});

// Mock 歌曲列表数据
const songs = ref([
	{
		id: 1,
		name: "电子梦境",
		artist: "星尘",
		mark: "4.9",
		description: "迷幻电子音乐",
		createTime: "2024-01-01T00:00:00+08:00",
		genre: "Electronic",
		audioUrl: "https://tuneflow.oss-cn-beijing.aliyuncs.com/M500000tt98h4J9oL5.mp3",
		pictureUrl: "https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0",
		lyricUrl: "path/to/lyric1.txt"
	},
	{
		id: 2,
		name: "夜色旋律",
		artist: "月光",
		mark: "4.8",
		description: "舒缓电子乐",
		createTime: "2024-01-02T00:00:00+08:00",
		genre: "Electronic",
		audioUrl: "https://tuneflow.oss-cn-beijing.aliyuncs.com/M500000tt98h4J9oL5.mp3",
		pictureUrl: "https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0",
		lyricUrl: "path/to/lyric1.txt"
	}
]);

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

onMounted(() => {
	console.log('Song list detail view mounted');
	getAllSongsAudioDuration()
});
</script>

<template>
	<div class="song-list-detail-main-container">
		<!-- 专辑头部信息 -->
		<div class="album-header">
			<img :src="albumInfo.pictureUrl" :alt="albumInfo.name" class="album-cover">
			<div class="album-info">
				<div class="album-name">{{ albumInfo.name }}</div>
				<p class="album-description">{{ albumInfo.description }}</p>
				<div class="album-meta">
					<span class="rating">★ {{ albumInfo.mark }}</span>
					<span class="separator">•</span>
					<span class="date">{{ new Date(albumInfo.createTime).getFullYear() }}</span>
					<span class="separator">•</span>
					<span class="songs-count">{{ songs.length }} 首歌曲</span>
				</div>
			</div>
		</div>

		<!-- 播放控制栏 -->
		<div class="controls">
			<button class="play-all-btn" @click="playAll">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					<path d="M8 5v14l11-7z"/>
				</svg>
				播放全部
			</button>
		</div>

		<!-- 歌曲列表 -->
		<div class="songs-list">
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
					<td @click="playSong(index)">{{song.duration}}</td>
				</tr>
				</tbody>
			</table>
		</div>
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

.album-name{
	font-size: 48px;
	font-weight: bold;
	text-align: start;
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
	margin: 0 0 30px 0;
	line-height: 1.5;
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
	transition: background-color 0.2s ease;
}

.play-all-btn:hover {
	background-color: #1ed760;
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

.add-to-playlist-btn{
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
	.album-cover{
		width: 240px;
		height: 240px;
	}
}
</style>