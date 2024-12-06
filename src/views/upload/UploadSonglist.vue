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
					<input type="text" v-model="songListName" required :class="{ 'has-value': phone }" placeholder="请输入歌单名称">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						专辑封面 URL
					</label>
					<input type="text" v-model="songListPictureUrl" required :class="{ 'has-value': phone }" placeholder="请输入 URL">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">music_note</span>
						描述
					</label>
					<input type="text" v-model="songListDescription" required :class="{ 'has-value': phone }" placeholder="请输入歌单描述">
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
					<input type="text" v-model="songName" required :class="{ 'has-value': phone }" placeholder="请输入歌曲名称">
<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">nightlife</span>
						流派
					</label>
					<input type="text" v-model="songGenre" required :class="{ 'has-value': phone }" placeholder="请输入歌曲流派">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">interpreter_mode</span>
						演唱者
					</label>
					<input type="text" v-model="songArtist" required :class="{ 'has-value': phone }" placeholder="请输入歌曲演唱者">
					<!--					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>-->
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">graphic_eq</span>
						音频 URL
					</label>
					<input type="text" v-model="songAudioUrl" required :class="{ 'has-value': phone }" placeholder="请输入 URL">
					<span class="password-match" v-if="songAudioUrl&&(!isSongAudioUrlValid)" :class="{ error: !isSongAudioUrlValid }">URL 无效</span>
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">album</span>
						专辑封面 URL
					</label>
					<input type="text" v-model="songPictureUrl" required :class="{ 'has-value': songPictureUrl }" placeholder="请输入 URL">
					<span class="password-match" v-if="songPictureUrl&&(!isSongPictureUrlValid)" :class="{ error: !isSongPictureUrlValid }">URL 无效</span>
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">lyrics</span>
						歌词 URL
					</label>
					<input type="text" v-model="songLyricUrl" required :class="{ 'has-value': phone }" placeholder="请输入 URL">
					<span class="password-match" v-if="songLyricUrl&&(!isSongLyricUrlValid)" :class="{ error: !isSongLyricUrlValid }">URL 无效</span>
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

export default {
	name: 'uploadView',
	setup() {
		const phone = ref(sessionStorage.getItem('phone') || '')
		const password = ref('')
		const rememberMe = ref(false)
		const showPassword = ref(false)

		const isFormValid = computed(() => {
			return phone.value && password.value
		})

		const isPhoneValid = computed(() => {
			return /^1[3456789]\d{9}$/.test(phone.value)
		})

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
			return songName.value && songGenre.value && songArtist.value && songAudioUrl.value && songPictureUrl.value && songLyricUrl.value && isSongPictureUrlValid && isSongAudioUrlValid && isSongLyricUrlValid
		})

		const handleUploadSongList = () => {
			// 处理上传逻辑
			console.log({
				phone: phone.value,
				password: password.value,
				rememberMe: rememberMe.value
			})

			// Upload songlist
		}

		const handleUploadSong = () => {
			// 处理上传逻辑
			console.log({
				phone: phone.value,
				password: password.value,
				rememberMe: rememberMe.value
			})

			// Upload songlist
		}

		return {
			phone,
			password,
			rememberMe,
			showPassword,
			isFormValid,
			isPhoneValid,
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

.password-match {
	display: block;
	font-size: 0.8rem;
	margin-top: 4px;
	color: #1db954;
	transition: color 0.3s ease;
	font-weight: bold;
}

.password-match.error {
	color: #ff4444;
	font-weight: bold;
}


.password-input {
	position: relative;
}

.password-toggle {
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	color: rgba(255, 255, 255, 0.5);
	cursor: pointer;
	transition: color 0.3s ease;
}

.password-toggle:hover {
	color: rgba(255, 255, 255, 0.8);
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

.forgot-password {
	color: #1db954;
	text-decoration: none;
	font-size: 0.9rem;
	transition: color 0.3s ease;
}

.forgot-password:hover {
	color: #1ed760;
	text-decoration: underline;
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

.register-link {
	text-align: center;
	margin-top: 20px;
	color: rgba(255, 255, 255, 0.7);
}

.register-link a {
	color: #1db954;
	text-decoration: none;
	font-weight: 600;
	transition: color 0.3s ease;
}

.register-link a:hover {
	color: #1ed760;
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