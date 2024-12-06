<!-- UploadSonglist.vue -->
<template>
	<div class="upload-container">
		<div ></div>
		<div class="upload-box">
			<div class="upload-header">
				<h2>
					<span class="material-icons">music_note</span>
					上传歌单
				</h2>
				<p class="subtitle">为 Tune Flow 做出贡献！</p>
			</div>

			<form class="upload-form" @submit.prevent="handleUploadSongList">
				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						名称
					</label>
					<input type="text" v-model="songListName" required :class="{ 'has-value': songListName }" placeholder="请输入歌单名称">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						专辑封面 URL
					</label>
					<el-upload
						class="avatar-uploader"
						action="http://113.44.139.10:8080/api/tools/upload"
						:headers="uploadHeaders"
						:show-file-list="false"
						:on-success="handleSongListPictureSuccess"
						:on-error="handleUploadError"
						:before-upload="beforePictureUpload"
					>
						<img v-if="songListPictureUrl" :src="songListPictureUrl" class="avatar" />
						<div v-else class="avatar-uploader-icon material-icons">cloud_upload</div>
					</el-upload>
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						描述
					</label>
					<input type="text" v-model="songListDescription" required :class="{ 'has-value': songListDescription }" placeholder="请输入歌单描述">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<button type="submit" class="submit-btn" :disabled="!isUploadSongListFormValid">
					<span class="material-icons">upload</span>
					上传歌单
				</button>
			</form>
		</div>
		<div class="upload-box">
			<div class="upload-header">
				<h2>
					<span class="material-icons">music_note</span>
					上传歌曲
				</h2>
				<p class="subtitle">分享优美动听的旋律</p>
			</div>

			<form class="upload-form" @submit.prevent="handleUploadSong">
				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						名称
					</label>
					<input type="text" v-model="songName" required :class="{ 'has-value': songName }" placeholder="请输入歌曲名称">
<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">nightlife</span>
						流派
					</label>
					<input type="text" v-model="songGenre" required :class="{ 'has-value': songGenre }" placeholder="请输入歌曲流派">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">interpreter_mode</span>
						演唱者
					</label>
					<input type="text" v-model="songArtist" required :class="{ 'has-value': songArtist }" placeholder="请输入歌曲演唱者">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="song-upload-group">
					<div class="form-group">
						<label>
							<span class="material-icons">album</span>
							专辑封面 URL
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
							<img v-if="songPictureUrl" :src="songPictureUrl" class="avatar" />
							<div v-else class="avatar-uploader-icon material-icons">cloud_upload</div>
						</el-upload>
						<!--					<input type="text" v-model="songPictureUrl" required :class="{ 'has-value': songPictureUrl }" placeholder="请输入 URL">-->
						<!--					<span class="password-match" v-if="songPictureUrl&&(!isSongPictureUrlValid)" :class="{ error: !isSongPictureUrlValid }">URL 无效</span>-->
					</div>

					<div class="audio-and-lyric-upload">
						<div class="form-group" >
							<label>
								<span class="material-icons">graphic_eq</span>
								音频 URL
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
							<!--					<input type="text" v-model="songAudioUrl" required :class="{ 'has-value': phone }" placeholder="请输入 URL">-->
							<!--					<span class="password-match" v-if="songAudioUrl&&(!isSongAudioUrlValid)" :class="{ error: !isSongAudioUrlValid }">URL 无效</span>-->
						</div>

						<div class="form-group" >
							<label>
								<span class="material-icons">lyrics</span>
								歌词 URL
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
							<!--					<input type="text" v-model="songLyricUrl" required :class="{ 'has-value': phone }" placeholder="请输入 URL">-->
							<!--					<span class="password-match" v-if="songLyricUrl&&(!isSongLyricUrlValid)" :class="{ error: !isSongLyricUrlValid }">URL 无效</span>-->
						</div>
					</div>
				</div>

				<button type="submit" class="submit-btn" :disabled="!isUploadSongFormValid">
					<span class="material-icons">upload</span>
					上传歌曲
				</button>
			</form>
		</div>
	</div>
</template>

<script>
import {ref, computed} from 'vue'
import {ElMessage} from 'element-plus'

export default {
	name: 'uploadView',
	setup() {
		//song list
		const songListName = ref('')
		const songListDescription = ref('')
		const songListPictureUrl = ref('')
		const songListSongIds = ref([])

		//song
		const songName = ref('')
		const songGenre = ref('')
		const songArtist = ref('')
		const songAudioUrl = ref('')
		const songPictureUrl = ref('')
		const songLyricUrl = ref('')
		const songDescription = ref('')

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
			songDescription: string
		}
		]
		 */
		const uploadSongs = ref([])

		// URL checker
		const isSongPictureUrlValid = computed(() => {
			return /^(http|https):\/\/[^ "]+$/.test(songPictureUrl.value)
		})

		const isSongAudioUrlValid = computed(() => {
			return /^(http|https):\/\/[^ "]+$/.test(songAudioUrl.value)
		})

		const isSongLyricUrlValid = computed(() => {
			return /^(http|https):\/\/[^ "]+$/.test(songLyricUrl.value)
		})

		const isUploadSongListFormValid = computed(() => {
			return songListName.value && songListDescription.value && songListPictureUrl.value && songListSongIds.value.length > 0
		})

		const isUploadSongFormValid = computed(() => {
			return songName.value && songGenre.value && songArtist.value && songAudioUrl.value && songPictureUrl.value && isSongPictureUrlValid && isSongAudioUrlValid
		})

		const handleSongPictureSuccess = (response, uploadFile) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songPictureUrl.value = URL.createObjectURL(uploadFile.raw);
		};

		const handleSongListPictureSuccess = (response, uploadFile) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songListPictureUrl.value = URL.createObjectURL(uploadFile.raw);
			console.log(songListPictureUrl.value)
		};

		const handleSongAudioSuccess = (response, uploadFile) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songAudioUrl.value = URL.createObjectURL(uploadFile.raw);
		};

		const handleSongLyricSuccess = (response, uploadFile) => {
			// 将上传的文件生成临时 URL，并绑定到 imageUrl
			ElMessage.success('上传成功');
			songLyricUrl.value = URL.createObjectURL(uploadFile.raw);
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


		const handleUploadSongList = () => {
			// 处理上传逻辑


			// Upload songlist
		}

		const handleUploadSong = () => {
			// 处理上传逻辑


			// Upload songlist
		}

		return {
			songName,
			songGenre,
			songArtist,
			songAudioUrl,
			songPictureUrl,
			songLyricUrl,
			songDescription,
			songListName,
			songListDescription,
			songListPictureUrl,
			songListSongIds,
			isSongPictureUrlValid,
			isSongAudioUrlValid,
			isSongLyricUrlValid,
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
			handleUploadSong,
			handleUploadSongList
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
	animation: fadeIn 0.5s ease forwards;
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

.audio-and-lyric-upload{
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 50%;
}

.song-upload-group{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.avatar-uploader{

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

.avatar{
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