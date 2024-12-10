<script setup>
// 添加歌曲表单数据
import {ElMessage} from "element-plus";
import {computed, ref} from "vue";
import Modal from "@/components/Modal.vue";
import {createSong, deleteSong} from "@/api/songApi";
import {addSongToAlbum} from "@/api/songlistApi";

const props = defineProps({
	songListId: Number
})

const songName = ref('');
const songGenre = ref('');
const songArtist = ref('');
const songDescription = ref('');
const songPictureUrl = ref('');
const songAudioUrl = ref('');
const songLyricUrl = ref('');
const isUploadSongFormValid = computed(() => {
	return songName.value && songGenre.value && songArtist.value  && songPictureUrl.value && songAudioUrl.value;
});
const uploadHeaders = {
	token:  sessionStorage.getItem('token')
};
const handleSongAudioSuccess = (response) => {
	// 将上传的文件生成临时 URL，并绑定到 imageUrl
	ElMessage.success('上传成功');
	songAudioUrl.value = response.result
};

const handleSongAudioRemove = () => {
	songAudioUrl.value = ''
}

const handleSongLyricSuccess = (response) => {
	// 将上传的文件生成临时 URL，并绑定到 imageUrl
	ElMessage.success('上传成功');
	songLyricUrl.value = response.result
};

const handleSongPictureSuccess = (response) => {
	// 将上传的文件生成临时 URL，并绑定到 imageUrl
	ElMessage.success('上传成功');
	songPictureUrl.value = response.result
};

const handleUploadError = (err) => {
	ElMessage.error('上传失败，请检查网络连接');
	console.log(err);
};

const beforeUpload = (rawFile) => {
	// 判断文件大小是否超过 2MB
	if (rawFile.size / 1024 / 1024 > 50) {
		ElMessage.error('文件大小不能超过 50MB');
		return false;
	}
	return true;
};

const beforeAudioUpload = (rawFile) => {
	// 判断文件格式是否为 MP3
	if (rawFile.type !== 'audio/mpeg') {
		ElMessage.error('音频文件应该是 MP3 格式');
		return false;
	}
	// 判断文件大小是否超过 50MB
	if (rawFile.size / 1024 / 1024 > 50) {
		ElMessage.error('音频文件大小不能超过 50MB');
		return false;
	}
	const file_name = rawFile.name
	//file name may be in this format: "Artist - Song Name.mp3" or "Artist-Song Name.mp3", so we can extract artist and song name from it
	const artist_song = file_name.split('-')
	if(artist_song.length < 2){
		return true; //Do not automatically fill in artist and song name
	}
	const artist = artist_song[0].trim()
	const song_name = artist_song[1].split('.')[0].trim()
	console.log('Artist:', artist, 'Song:', song_name)
	songArtist.value = artist
	songName.value = song_name
	return true;
};

const beforePictureUpload = (rawFile) => {
	// 判断文件格式是否为 JPEG
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('专辑图片应该是 JPEG 格式');
		return false;
	}
	// 判断文件大小是否超过 2MB
	if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('专辑图片大小不能超过 2MB');
		return false;
	}
	return true;
};

const handleAddSongConfirm = async () => {
	const songData = {
		name: songName.value,
		genre: songGenre.value,
		artist: songArtist.value,
		description: songDescription.value,
		pictureUrl: songPictureUrl.value,
		audioUrl: songAudioUrl.value,
		lyricUrl: songLyricUrl.value
	};
	console.log("Adding song to playlist "+props.songListId+" with data: ", songData);
	await createSong(songData).then((res) => {
		if(res.code === '000'){

			const songId =  res.result
			//Add song to playlist
			addSongToAlbum(props.songListId, songId).then((res) => {
				if(res.data.code === '000'){
					ElMessage.success(songName.value + ' 已经成功添加')
					return 0;
				}else{
					ElMessage.error('添加歌曲到歌单失败')
					deleteSong(songId)
					return -1;
				}
			}).catch((err) => {
				console.error('Failed to add song to album:', err)
				ElMessage.error('添加歌曲到歌单失败，请检查网络连接')
				return -2;
			})
		}else{
			ElMessage.error('上传歌曲 ' + songName.value + ' 失败')
		}
	}).catch((err) => {
		console.error('Failed to create song:', err)
		ElMessage.error('上传歌曲失败，请检查网络连接')
	})
}
</script>

<template>
	<Modal title="添加歌曲" @closeModal="$emit('closeAddSongToPlaylist')">
		<div class="upload-form">
			<div class="form-group">
				<label>
					<span class="material-icons">music_note</span>
					名称
				</label>
				<input type="text" v-model="songName" required :class="{ 'has-value': songName }" placeholder="请输入歌曲名称">
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">nightlife</span>
					流派
				</label>
				<input type="text" v-model="songGenre" required :class="{ 'has-value': songGenre }" placeholder="请输入歌曲流派">
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">interpreter_mode</span>
					演唱者
				</label>
				<input type="text" v-model="songArtist" required :class="{ 'has-value': songArtist }" placeholder="请输入歌曲演唱者">
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">description</span>
					描述
				</label>
				<input type="text" v-model="songDescription" required :class="{ 'has-value': songDescription }" placeholder="请输入歌曲描述">
			</div>

			<div class="song-upload-group">
				<div class="form-group">
					<label>
						<span class="material-icons">album</span>
						歌曲封面（JPEG）
					</label>
					<el-upload
						ref="uploadSongPicture"
						class="avatar-uploader"
						action="http://113.44.139.10:8080/api/tools/upload"
						:headers="uploadHeaders"
						:show-file-list="false"
						:on-success="handleSongPictureSuccess"
						:on-error="handleUploadError"
						:before-upload="beforePictureUpload"
					>
						<img v-if="songPictureUrl" :src="songPictureUrl" class="avatar"/>
						<div v-else class="avatar-uploader-icon material-icons">cloud_upload</div>
					</el-upload>
				</div>

				<div class="audio-and-lyric-upload">
					<div class="form-group">
						<label>
							<span class="material-icons">graphic_eq</span>
							音频（MP3）
						</label>
						<el-upload
							ref="uploadAudio"
							class="upload-demo"
							action="http://113.44.139.10:8080/api/tools/upload"
							:headers="uploadHeaders"
							:on-success="handleSongAudioSuccess"
							:on-error="handleUploadError"
							:before-upload="beforeAudioUpload"
							:on-remove="handleSongAudioRemove"
						>
							<template #trigger>
								<button class="submit-btn">点击上传</button>
							</template>
						</el-upload>
					</div>

					<div class="form-group">
						<label>
							<span class="material-icons">lyrics</span>
							歌词文件（纯文本）
						</label>
						<el-upload
							ref="uploadLyric"
							class="upload-demo"
							action="http://113.44.139.10:8080/api/tools/upload"
							:headers="uploadHeaders"
							:on-success="handleSongLyricSuccess"
							:on-error="handleUploadError"
							:before-upload="beforeUpload"
						>
							<template #trigger>
								<button class="submit-btn">点击上传</button>
							</template>
						</el-upload>
					</div>
				</div>
			</div>
			<!--				:disabled="!isUploadSongFormValid"-->
			<button class="submit-btn" @click="handleAddSongConfirm" :disabled="!isUploadSongFormValid">
				<span class="material-icons">upload</span>
				确认添加
			</button>

			<button class="cancel-btn" @click="$emit('closeAddSongToPlaylist')">
				<span class="material-icons">cancel</span>
				取消添加
			</button>
		</div>
	</Modal>
</template>

<style scoped>
.form-group {
	margin-bottom: 25px;
	position: relative;
}

.form-group label {
	display: flex;
	align-items: center;
	gap: 8px;
	color: rgba(255, 255, 255, 0.9);
	margin-bottom: 8px;
	font-size: 0.9rem;
}

.form-group label .material-icons {
	font-size: 1.2rem;
	color: #1db954;
}

.audio-and-lyric-upload {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 50%;
}

.song-upload-group {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.avatar-uploader {
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
	//width: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar-uploader:hover {
	border-color: var(--color-primary);
}

.avatar-uploader-icon {
	border: 2px solid rgba(255, 255, 255, 0.1);
	background: rgba(255, 255, 255, 0.05);
	margin-top: 20px;
	border-radius: 12px;
	font-size: 56px;
	color: #c0c6d0;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
	border-radius: 12px;
	object-fit: cover;
	border: 2px solid var(--el-border-color);
}

input[type="tel"],
input[type="password"],
input[type="text"],
input[type="year"],
input[type="number"] {
	width: calc(100% - 40px);
	padding: 12px 16px;
	border: 2px solid rgba(255, 255, 255, 0.1);
	border-radius: 12px;
	background: rgba(255, 255, 255, 0.05);
	color: #fff;
	font-size: 1rem;
	transition: all 0.3s ease;
}

input:focus {
	outline: none;
	border-color: #1db954;
	box-shadow: 0 0 0 4px rgba(29, 185, 84, 0.1);
	animation: inputPulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

input::placeholder {
	color: rgba(255, 255, 255, 0.3);
}

.submit-btn {
	width: 100%;
	padding: 14px;
	border: none;
	border-radius: 12px;
	background: linear-gradient(45deg, #1db954, #1ed760);
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	margin-top: 20px;
}

.submit-btn:not(:disabled):hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);
}

.submit-btn:disabled {
	opacity: 0.7;
	cursor: not-allowed;
	transform: none;
}

.submit-btn .material-icons {
	font-size: 1.2rem;
}

.cancel-btn {
	width: 100%;
	padding: 14px;
	border: none;
	border-radius: 12px;
	background: linear-gradient(45deg, #cac9c9, rgba(239, 239, 239, 0.5));
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	margin-top: 20px;
}

.cancel-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(239, 239, 239, 0.31);
}

.cancel-btn .material-icons {
	font-size: 1.2rem;
}

@keyframes inputPulse {
	0% {
		box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.4);
	}
	70% {
		box-shadow: 0 0 0 10px rgba(29, 185, 84, 0);
	}
	100% {
		box-shadow: 0 0 0 0 rgba(29, 185, 84, 0);
	}
}
</style>