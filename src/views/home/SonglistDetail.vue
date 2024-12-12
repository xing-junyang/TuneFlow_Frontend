<script setup>
import {ref, onMounted, computed} from 'vue';
import {useRoute} from 'vue-router';
import {setPlaylistSongs, playSongFromPlaylist, playlist, addSong} from "@/global/playlist";
import {getAlbum, getAlbumAllSongs} from "@/api/songlistApi";
import {ElMessage} from "element-plus";
import Loading from "@/components/Loading.vue";
import AddSongToSongList from "@/components/management/AddSongToSongList.vue";
import DeleteSongFromSongList from "@/components/management/DeleteSongFromSongList.vue";
import EditSongList from "@/components/management/EditSongList.vue";
import EditSong from "@/components/management/EditSong.vue";
import DeleteSongList from "@/components/management/DeleteSongList.vue";

const route = useRoute();
const isLoading = ref(false);

// 专辑数据
const albumInfo = ref();

// 歌曲列表数据
const songs = ref([]);

const isCollapsed = ref(true);
const limit = 200;
const showExpandButton = computed(() => {return albumInfo.value===undefined? '' : albumInfo.value.description.length > limit});
const shortenedDescription = computed(() => {
	console.log('Album info:', albumInfo.value);
	if(albumInfo.value===undefined){
		return '';
	}
	if (isCollapsed.value && showExpandButton.value) {
		return albumInfo.value.description.slice(0, limit) + '...';
	}
	return albumInfo.value.description;
});

const isAdmin = computed( () => {
	const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
	// console.log(userInfo.role);
	return userInfo && userInfo.role === 'Admin'
})

const addSongModalVisible = ref(false);

const toggleCollapse = () => {
	isCollapsed.value = !isCollapsed.value;
};

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
			resolve(Math.round(audio.duration));
		});
	});
};

const getAllSongsAudioDuration = async () => {
	for (let i = 0; i < songs.value.length; i++) {
		if (songs.value[i].duration !== null) {
			continue;
		}
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

const addAllToPlayList = () => {
	console.log('Adding all to playlist');
	try {
		for (let i = 0; i < songs.value.length; i++) {
			addSong(songs.value[i]);
		}
	} catch (e) {
		console.error('Failed to add all songs to playlist:', e);
		ElMessage.error('添加歌曲到播放列表失败');
		return
	}
	ElMessage.success('已添加所有歌曲到播放列表');
};

const addToPlayList = (index) => {
	console.log('Adding to playlist:', index);
	try{
		addSong(songs.value[index]);
	} catch (e) {
		console.error('Failed to add song to playlist:', e);
		ElMessage.error('添加歌曲到播放列表失败');
		return
	}

	ElMessage.success('成功添加 '+ songs.value[index].name +' 至播放列表')
};

const deleteSongModalVisible = ref(false);
const deleteSongId = ref(0);
const deleteSongName = ref('');
const deleteFromPlayList = async (index) =>{
	deleteSongId.value = songs.value[index].id;
	deleteSongName.value = songs.value[index].name;
	deleteSongModalVisible.value = true;
};

const editSongListModalVisible = ref(false);

const editSongModalVisible = ref(false);
const editSongId = ref(0);
const openEditSong = async (index) => {
	editSongId.value = songs.value[index].id;
	editSongModalVisible.value = true;
};

const deleteSongListModalVisible = ref(false);

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
	await getAlbumAllSongs(Number(songlistId)).then(res => {
		console.log('Songs in album:', res.data.result);
		songs.value = res.data.result;
	}).catch(err => {
		console.error('Failed to get songs in album:', err);
		ElMessage.error('获取专辑歌曲失败，您可能没有互联网连接');
	});
	await getAllSongsAudioDuration()
	isLoading.value = false;
});


</script>

<template>
	<div class="song-list-detail-main-container">
		<!-- 专辑头部信息 -->
		<div class="album-header">
			<img :src="albumInfo?albumInfo.pictureUrl:'http://devops-server-song.oss-cn-nanjing.aliyuncs.com/c3c89d64-6709-4b01-bab8-ca01f1d6ac96_notplaying.jpg'" :alt="albumInfo?albumInfo.name:''" class="album-cover">
			<div class="album-info">
				<div class="album-name">{{ albumInfo?albumInfo.name:'' }}</div>
				<div class="album-artist-name">{{ albumInfo?albumInfo.userName:'' }}</div>
				<p class="album-description" :class="{ collapsed: isCollapsed }" v-html="shortenedDescription"></p>
				<button class="expand-button" v-if="showExpandButton" @click="toggleCollapse">
					{{ isCollapsed ? '展开' : '收起' }}
				</button>
				<div class="album-meta">
					<span class="rating">★ {{ albumInfo?albumInfo.mark:5 }}</span>
					<span class="separator">•</span>
					<span class="date" v-if="albumInfo && albumInfo.year">{{ albumInfo && albumInfo.year?albumInfo.year:"1970" }}</span>
					<span class="separator" v-if="albumInfo && albumInfo.year">•</span>
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
			<button class="edit-song-list-btn" @click="addAllToPlayList" :disabled="isLoading">
				<i class="fa-solid fa-square-plus"></i>
				添加所有歌曲到播放列表
			</button>
			<button class="edit-song-list-btn" @click="addSongModalVisible = true" :disabled="isLoading" v-if="isAdmin">
				添加歌曲
			</button>
			<button class="edit-song-list-btn" @click="editSongListModalVisible = true" :disabled="isLoading" v-if="isAdmin">
				编辑歌单
			</button>
			<button class="delete-song-list-btn" @click="deleteSongListModalVisible = true" :disabled="isLoading" v-if="isAdmin">
				<i class="fa-solid fa-delete-left"></i>
				删除歌单
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
					<th v-if="isAdmin"></th>
					<th v-if="isAdmin"></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(song, index) in songs" :key="song.id" class="song-row">
					<td class="add-to-playlist-btn" @click="addToPlayList(index)">
						<!--						add to playlist button-->
						<i class="fa-solid fa-square-plus"></i>
					</td>
					<td @click="playSong(index)">{{ index + 1 }}</td>
					<td class="song-title" @click="playSong(index)">
						<img :src="song.pictureUrl" :alt="song.name" class="song-thumbnail">
						<span>{{ song.name }}</span>
					</td>
					<td @click="playSong(index)">{{ song.artist }}</td>
					<td @click="playSong(index)">{{ song.genre }}</td>
					<!-- 根据音频 URL获取时长 -->
					<td @click="playSong(index)">{{ formatDuration(song.duration) }}</td>

					<td v-if="isAdmin" class="add-to-playlist-btn" @click="openEditSong(index)">
						<!--						add to playlist button-->
						<i class="fa-solid fa-file-pen"></i>
					</td>
					<td v-if="isAdmin" class="add-to-playlist-btn" @click="deleteFromPlayList(index)">
						<!--						add to playlist button-->
						<i class="fa-solid fa-delete-left"></i>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		<Loading v-else />
		<!-- 添加歌曲弹窗 -->
		<AddSongToSongList v-if="addSongModalVisible" @closeAddSongToSongList="addSongModalVisible = false" :songListId="Number(albumInfo.id)" />

		<!-- 删除歌曲弹窗 -->
		<DeleteSongFromSongList v-if="deleteSongModalVisible" @closeDeleteSongFromSongList="deleteSongModalVisible = false" :songListId="Number(albumInfo.id)" :songId="deleteSongId" :songName="deleteSongName" />

		<!-- 编辑歌单弹窗 -->
		<EditSongList v-if="editSongListModalVisible" @closeEditSongList="editSongListModalVisible = false" :songListId="Number(albumInfo.id)" />

		<!-- 编辑歌曲弹窗 -->
		<EditSong v-if="editSongModalVisible" @closeEditSong="editSongModalVisible = false" :songId="editSongId" />

		<!-- 删除歌单弹窗 -->
		<DeleteSongList v-if="deleteSongListModalVisible" @closeDeleteSongList="deleteSongListModalVisible = false" :songListId="Number(albumInfo.id)" :songListName="albumInfo?albumInfo.name:''" />
	</div>

</template>

<style scoped>
.song-list-detail-main-container {
	container-type: inline-size;
	container-name: song-list-detail;
	display: flex;
	min-height: fit-content;
	flex-direction: column;
	align-items: start;
	padding: 40px;
	background-color: var(--color-background-page);
	color: #ffffff;
	//overflow: auto;
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
	margin: 30px 0 0px 0;
	line-height: 1.5em;
	white-space: pre-line;

}

.expand-button {
	background-color: transparent;
	border: none;
	color: #1db954;
	cursor: pointer;
	font-size: 14px;
	padding: 0;
	text-align: start;
	transition: color 0.5s ease;
}

.expand-button:hover {
	color: #00ff5b;
}

.album-meta {
	display: flex;
	align-items: center;
	gap: 8px;
	color: #b3b3b3;
	margin-top: 30px;
}

.separator {
	color: #666;
}

.controls {
	margin-bottom: 32px;
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 16px;
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

.edit-song-list-btn{
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: #000000;
	border: white solid 2px;
	border-radius: 24px;
	color: white;
	padding: 12px 32px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.5s ease;
}

.edit-song-list-btn:hover {
	background-color: rgba(255, 255, 255, 0.25);
}

.edit-song-list-btn:disabled {
	background-color: #000000;
	color: #666666;
	border: #666666 solid 2px;
	cursor: not-allowed;
}

.edit-song-list-btn svg {
	width: 24px;
	height: 24px;
}

.delete-song-list-btn{
	display: flex;
	align-items: center;
	gap: 8px;
	background-color: #880000;
	border: none;
	border-radius: 24px;
	color: white;
	padding: 12px 32px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
	transition: all 0.5s ease;
}

.delete-song-list-btn:hover {
	background-color: #ff4444;

}

.delete-song-list-btn:disabled {
	background-color: #666;
	border: none;
	cursor: not-allowed;
}

.delete-song-list-btn svg {
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
	line-height: 100%;
}

.add-to-playlist-btn i{
	font-size: 24px;
	transition: color 0.5s ease;
}

.add-to-playlist-btn i:hover {
	color: #1db954;
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

@container song-list-detail (max-width: 600px) {
	.album-cover {
		width: 150px;
		height: 150px;
	}
	th:nth-child(5), td:nth-child(5) {
		display: none;
	}
	th:nth-child(2), td:nth-child(2) {
		display: none;
	}

}

@container song-list-detail (max-width: 450px) {
	.album-cover {
		width: 80px;
		height:80px;
	}
	th:nth-child(4), td:nth-child(4) {
		display: none;
	}
	.play-all-btn {
		padding: 8px 16px;
		font-size: 14px;
	}
	.edit-song-list-btn {
		padding: 8px 16px;
		font-size: 14px;
	}
	.delete-song-list-btn {
		padding: 8px 16px;
		font-size: 14px;
	}
	th{
		display: none;
	}
	.controls {
		flex-direction: column;
		gap: 16px;
	}
}

@container song-list-detail (max-width: 1200px) {
	.album-cover {
		width: 240px;
		height: 240px;
	}
}
</style>