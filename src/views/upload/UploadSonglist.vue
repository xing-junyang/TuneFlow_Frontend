<!-- UploadSonglist.vue -->
<template>
	<div class="upload-container">
		<div class="upload-box">
			<div class="upload-header">
				<h2>
					<span class="material-icons">music_note</span>
					上传歌单
				</h2>
				<p class="subtitle">上传您的心仪歌单！</p>
			</div>

			<div class="upload-form">
				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						名称
					</label>
					<input type="text" v-model="songListName" required :class="{ 'has-value': songListName }" placeholder="请输入歌单名称">
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">person</span>
						作者
					</label>
					<input type="text" v-model="songListArtistName" required :class="{ 'has-value': songListArtistName }" placeholder="请输入作者名称">
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">description</span>
						描述
					</label>
					<input type="text" v-model="songListDescription" required :class="{ 'has-value': songListDescription }" placeholder="请输入歌单描述">
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">album</span>
						专辑封面（JPEG）
					</label>
					<el-upload
						class="avatar-uploader"
						action="http://113.44.139.10:8080/api/tools/upload"
						:headers="uploadHeaders"
						:show-file-list="false"
						:on-success="handleSongListPictureSuccess"
						:on-error="handleUploadError"
						:before-upload="beforePictureUpload"
						:auto-upload="true"
					>
						<img v-if="songListPictureUrl" :src="songListPictureUrl" class="avatar"/>
						<div v-else class="avatar-uploader-icon material-icons">cloud_upload</div>
					</el-upload>
				</div>
				<div class="form-group">
					<label>
						<span class="material-icons">audio_file</span>
						专辑歌曲
					</label>
					<TransitionGroup name="fade">
						<div class="uploaded-song-group" v-for="(song, index) in uploadSongs" v-bind:key="index">
							<div class="uploaded-song-group-left">
								<div class="uploaded-song-cover">
									<img class="uploaded-song-cover-image" :src="song.songPictureUrl"/>
								</div>
								<div class="uploaded-song-title-and-atrist">
									<div class="uploaded-song-title">
										{{ song.songName }}
									</div>
									<div class="uploaded-song-artist">
										{{ song.songArtist }}
									</div>
								</div>
							</div>

							<div class="delete-song">
								<span class="material-icons" @click="handleDeleteSong(index)">delete</span>
							</div>
						</div>
					</TransitionGroup>
				</div>

				<button class="add-btn" @click="handleAddSong">
					<span class="material-icons">add</span>
					添加歌曲
				</button>

				<button class="submit-btn" style="margin-top:50px;" :disabled="!isUploadSongListFormValid" @click="handleUploadSongList">
					<span class="material-icons">upload</span>
					上传歌单
				</button>
			</div>
		</div>
		<transition name="popup">
			<div class="upload-box" v-if="uploadSongVisible">
				<div class="upload-header">
					<h2>
						<span class="material-icons">music_note</span>
						上传歌曲
					</h2>
					<p class="subtitle">分享优美动听的旋律</p>
				</div>

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
									:before-upload="beforeUpload"
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

					<button class="cancel-btn" @click="handleAddSongCancel">
						<span class="material-icons">cancel</span>
						取消添加
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import {ref, computed} from 'vue'
import {ElMessage} from 'element-plus'
import {createSong, deleteSong} from "@/api/songApi";
import {addSongToAlbum, createAlbum, deleteAlbum} from "@/api/songlistApi";

export default {
	name: 'uploadView',
	setup() {
		const uploadSongVisible = ref(false)

		//song list
		const songListName = ref('')
		const songListDescription = ref('')
		const songListPictureUrl = ref('')
		const songListArtistName = ref('')
		const songListSongIds = ref([])

		//song
		const songName = ref('')
		const songGenre = ref('')
		const songArtist = ref('')
		const songPictureUrl = ref('')
		const songDescription = ref('')
		const songAudioUrl = ref('')
		const songLyricUrl = ref('')

		//upload
		const uploadHeaders = {
			Authorization: 'Bearer ' + sessionStorage.getItem('token'),
			token: sessionStorage.getItem('token')
		}
		const uploadAudio = ref(null)
		const uploadLyric = ref(null)
		const uploadSongPicture = ref(null)

		//upload songlist

		/*
		Format:
		[
		{
			songName: string,
			songGenre: string,
			songArtist: string,
			songAudioFile: UploadInstance,
			songPictureFile: UploadInstance,
			songLyricFile: UploadInstance,
			songDescription: string,
			songPictureUrl: string
		}
		]
		 */
		const uploadSongs = ref([])

		// URL checker
		const isSongPictureUrlValid = computed(() => {
			return /^(http|https):\/\/[^ "]+$/.test(songPictureUrl.value)
		})


		const isUploadSongListFormValid = computed(() => {
			return songListName.value && songListDescription.value && songListPictureUrl.value && uploadSongs.value.length > 0
		})

		const isUploadSongFormValid = computed(() => {
			return songName.value && songGenre.value && songArtist.value && songPictureUrl.value && songAudioUrl.value
		})

		const handleSongPictureSuccess = (response) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songPictureUrl.value = response.result;
		};

		const handleSongListPictureSuccess = (response) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songListPictureUrl.value = response.result;
		};

		const handleSongAudioSuccess = (response) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songAudioUrl.value = response.result
		};

		const handleSongLyricSuccess = (response) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songLyricUrl.value = response.result
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

		const handleAddSong = () => {
			uploadSongVisible.value = true
		}

		const handleAddSongCancel = () => {
			uploadSongVisible.value = false
		}

		const handleAddSongConfirm = () => {
			console.log("Add song confirm")
			// 处理添加歌曲逻辑
			uploadSongs.value.push({
				songName: songName.value,
				songGenre: songGenre.value,
				songArtist: songArtist.value,
				songPictureUrl: songPictureUrl.value,
				songDescription: songDescription.value,
                songAudioUrl: songAudioUrl.value,
				songLyricUrl: songLyricUrl.value
			})
			// reset song form
			songName.value = ''
			songGenre.value = ''
			songArtist.value = ''
			songPictureUrl.value = ''
			songDescription.value = ''
			uploadAudio.value.clearFiles()
			uploadLyric.value.clearFiles()
			uploadSongPicture.value.clearFiles()
		}

		const handleDeleteSong = (index) => {
			uploadSongs.value = uploadSongs.value.filter((song, i) => i !== index)
		}

		const handleUploadSongList =async () => {
			// 处理上传逻辑
			console.log('Upload song list:', songListName.value, songListDescription.value, songListPictureUrl.value, songListArtistName.value, songListSongIds.value, uploadSongs.value)
			let flag = true;
			const songIds = ref([]);
			for(let song of uploadSongs.value){
				console.log('Song:', song)
				const songData = {
					name: song.songName,
					genre: song.songGenre,
					artist: song.songArtist,
					pictureUrl: song.songPictureUrl,
					description: song.songDescription,
					audioUrl: song.songAudioUrl,
					lyricUrl: song.songLyricUrl
				}
				const res = await createSong(songData).then((res) => {
					if(res.code === '000'){
						ElMessage.success('上传歌曲 ' + song.songName + ' 成功')
						return res.result
					}else{
						ElMessage.error('上传歌曲 ' + song.songName + ' 失败')
						flag = false
						return -1;
					}
				}).catch((err) => {
					console.error('Failed to create song:', err)
					ElMessage.error('上传歌曲失败，请检查网络连接')
					return -2;
				})
				if(res < 0){
					flag = false
					break
				}
				songIds.value.push(res)
			}
			if(flag){
				//上传歌曲成功，开始创建歌单
				const songListData = {
					name: songListName.value,
					description: songListDescription.value,
					pictureUrl: songListPictureUrl.value,
					userName: songListArtistName.value,
				}
				const res = await createAlbum(songListData).then(
					(res) => {
						if(res.data.code === '000'){
							// ElMessage.success('上传歌单 ' + songListName.value + ' 成功')
							return res.data.result
						}else{
							ElMessage.error('创建歌单 ' + songListName.value + ' 失败')
							return -1;
						}
					}
				).catch((err) => {
					console.error('Failed to create song list:', err)
					ElMessage.error('创建歌单失败，请检查网络连接')
					return -2;
				})
				if(res < 0){
					ElMessage.error('由于创建歌单失败，歌曲没有被创建')
				}else{
					let add_song_complete = true
					console.log("res:::::", res)
					for(let songId of songIds.value){
						const add_song_res = await addSongToAlbum(res, songId).then((res) => {
							if(res.data.code === '000'){
								return 0;
							}else{
								ElMessage.error('添加歌曲到歌单失败')
								return -1;
							}
						}).catch((err) => {
							console.error('Failed to add song to album:', err)
							ElMessage.error('添加歌曲到歌单失败，请检查网络连接')
							return -2;
						})
						if(add_song_res < 0){
							add_song_complete = false
						}
					}
					if(add_song_complete) {
						ElMessage.success('歌单 ' + songListName.value + ' 创建成功')
					}else{
						ElMessage.error('由于添加歌曲到歌单失败，歌单没有被创建')
						deleteAlbum(res)
						//删除已经上传的歌曲
						for(let songId of songIds.value){
							await deleteSong(songId)
						}
					}
				}
			}else{
				ElMessage.error('由于上传歌曲失败，歌单没有被创建')
				//删除已经上传的歌曲
				for(let songId of songIds.value){
					await deleteSong(songId)
				}
			}
		}

		return {
			uploadSongVisible,
			songName,
			songGenre,
			songArtist,
			songPictureUrl,
			songDescription,
			songListName,
			songListArtistName,
			songListDescription,
			songListPictureUrl,
			songListSongIds,
			isSongPictureUrlValid,
			isUploadSongListFormValid,
			isUploadSongFormValid,
			uploadHeaders,
			uploadLyric,
			uploadAudio,
			uploadSongPicture,
			uploadSongs,
			handleSongAudioSuccess,
			handleSongPictureSuccess,
			handleSongListPictureSuccess,
			handleSongLyricSuccess,
			beforeUpload,
			beforePictureUpload,
			handleUploadError,
			handleUploadSongList,
			handleAddSong,
			handleAddSongConfirm,
			handleAddSongCancel,
			handleDeleteSong
		}
	}
}
</script>

<style scoped>
.upload-container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: start;
	background: var(--color-background-page);
	padding: 20px;
}

.upload-box {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 40px;
	margin: 5vh;
	width: 100%;
	max-width: 420px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.popup-enter-active{
	transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
}
.popup-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.popup-enter-from,
.popup-leave-to {
	opacity: 0;
	transform: translateX(50px);
}

.upload-header {
	text-align: center;
	margin-bottom: 40px;
}

.upload-header h2 {
	color: #fff;
	font-size: 2rem;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.upload-header .material-icons {
	color: #1db954;
}

.subtitle {
	color: rgba(255, 255, 255, 0.7);
	font-size: 1rem;
}

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

.uploaded-song-group {
	display: flex;
	width: 100%;
	flex-direction: row;
	border-radius: 18px;
	background: rgba(255, 255, 255, 0.1);
	border: 2px solid rgba(255, 255, 255, 0.1);
	margin-bottom: 20px;
	justify-content: space-between;
}

.uploaded-song-group-left{
	display: flex;
	flex-direction: row;
}

.uploaded-song-cover {
	width: 60px;
	height: 60px;
	margin: 8px 12px 8px 8px;
	border-radius: 12px;
	border: 1px solid var(--el-border-color);
}

.uploaded-song-cover-image{
	width: 100%;
	height: 100%;
	border-radius: 12px;
	object-fit: cover;
}

.uploaded-song-title-and-atrist {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.uploaded-song-title {
	font-size: 1.2rem;
	font-weight: 500;
	color: #fff;
	text-align: start;
}

.uploaded-song-artist {
	font-size: 1rem;
	text-align: start;
	color: rgba(255, 255, 255, 0.7);
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

.delete-song {
	display: flex;
	justify-self: end;
	justify-content: center;
	align-items: center;
	color: #cac9c9;
	padding-right: 8px;
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
input[type="text"] {
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

.checkbox-container input[type="checkbox"] {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

.checkbox-container:hover input ~ .checkmark {
	background-color: rgba(255, 255, 255, 0.2);
}

.checkbox-container input:checked ~ .checkmark {
	background-color: #1db954;
}

.checkbox-container input:checked ~ .checkmark:after {
	display: block;
}

.add-btn {
	width: 90%;
	padding: 12px;
	border: none;
	border-radius: 20px;
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
	margin-left:5%;
}

.add-btn:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);
}

.add-btn .material-icons {
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

.social-btn img {
	width: 20px;
	height: 20px;
}

/* 错误状态样式 */
.form-group.error input {
	border-color: #ff4444;
}

.form-group.error .error-message {
	color: #ff4444;
	font-size: 0.8rem;
	margin-top: 4px;
}

/* 加载状态 */
.submit-btn.loading {
	position: relative;
	pointer-events: none;
}

.submit-btn.loading::after {
	content: '';
	position: absolute;
	width: 20px;
	height: 20px;
	border: 2px solid transparent;
	border-top-color: #fff;
	border-radius: 50%;
	animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
	from {
		transform: rotate(0turn);
	}
	to {
		transform: rotate(1turn);
	}
}

/* 响应式调整 */
@media (max-width: 480px) {
	.upload-box {
		padding: 30px 20px;
	}

	.upload-header h2 {
		font-size: 1.5rem;
	}

	.submit-btn {
		padding: 12px;
	}

	input[type="tel"],
	input[type="password"] {
		padding: 10px 14px;
		font-size: 0.9rem;
	}

	.form-group label {
		font-size: 0.85rem;
	}

	.social-buttons {
		gap: 10px;
	}

	.social-btn {
		width: 35px;
		height: 35px;
	}
}

/* 动画效果 */
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

@keyframes fadeOut {
	from {
		opacity: 1;
		transform: translateY(0);
	}
	to {
		opacity: 0;
		transform: translateY(10px);
	}
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