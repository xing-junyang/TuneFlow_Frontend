<template>
	<div class="player-bar" :class="{ 'player-bar-show': show }">
		<div class="player-left">
			<div class="song-container">
				<div class="song-cover">
					<img :src="(currentSong.pictureUrl || 'http://devops-server-song.oss-cn-nanjing.aliyuncs.com/c3c89d64-6709-4b01-bab8-ca01f1d6ac96_notplaying.jpg')" alt="cover">
				</div>
				<div class="song-info">
					<div class="song-name">{{ currentSong.name || '未播放' }}</div>
					<div class="song-artist">{{ currentSong.artist || '-' }}</div>
				</div>
			</div>
			<div class="player-right-thin" v-if="!isWideScreen">
				<button class="volume-btn" @click="toggleMute">
					<i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
				</button>
				<div
					class="volume-slider"
					ref="volumeSlider"
					@mousedown.prevent="startVolumeChange"
				>
					<div class="volume-bg"></div>
					<div class="volume-current" :style="{ width: volume + '%' }"></div>
					<div class="volume-handle" :style="{ left: volume + '%' }"></div>
				</div>
			</div>
		</div>

		<div class="player-center">
			<div class="control-buttons">
				<button class="mode-btn" @click="togglePlayMode" :title="playModeTitle">
					<i v-if="playMode === 'single'" class="fas fa-redo"></i>
					<i v-else-if="playMode === 'loop'" class="fas fa-repeat"></i>
					<i v-else class="fas fa-random"></i>
				</button>

				<button class="prev-btn" @click="prevSong">
					<i class="fas fa-step-backward"></i>
				</button>
				<button class="play-btn" @click="togglePlay">
					<i :class="['fas', isPlaying ? 'fa-pause' : 'fa-play']"></i>
				</button>
				<button class="next-btn" @click="nextSong">
					<i class="fas fa-step-forward"></i>
				</button>

				<button class="playlist-btn" :class="{ active: showPlaylist }" @click="togglePlaylist" title="播放列表">
					<i class="fa-solid fa-list-ol"></i>
				</button>

				<button class="lyric-btn" :class="{ active: showLyric }" @click="toggleLyric" title="歌词" :disabled="!currentSong||currentSong.lyricUrl === undefined||currentSong.lyricUrl === ''">
					<i class="fa-solid fa-square-poll-horizontal"></i>
				</button>
			</div>

			<div class="progress-bar">
				<div class="time">{{ formatTime(currentTime) }}</div>
				<div class="progress-wrapper" ref="progressSlider" @click="seek" @mousedown.prevent="startProgressChange">
					<div class="progress-bg"></div>
					<div class="progress-current" :style="{ width: progress + '%' }"></div>
					<div class="progress-handle" :style="{ left: progress + '%' }"></div>
				</div>
				<div class="time">{{ formatTime(duration) }}</div>
			</div>
		</div>

		<div class="player-right" v-if="isWideScreen">
			<button class="volume-btn" @click="toggleMute">
				<i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
			</button>
			<div
				class="volume-slider"
				ref="volumeSlider"
				@mousedown.prevent="startVolumeChange"
			>
				<div class="volume-bg"></div>
				<div class="volume-current" :style="{ width: volume + '%' }"></div>
				<div class="volume-handle" :style="{ left: volume + '%' }"></div>
			</div>
		</div>

		<audio
			ref="audioRef"
			:src="currentSong.audioUrl"
			@timeupdate="onTimeUpdate"
			@loadedmetadata="onLoadMetadata"
			@ended="onEnded"
		></audio>
	</div>
	<!-- 播放列表上拉栏 -->
	<div
		class="playlist-drawer"
		:class="{ 'drawer-open': showPlaylist && show }"
	>
		<div class="playlist-content">
			<div class="playlist-header">
				<div class="header-left">
					<i style="color: #00c853" class="fa-solid fa-list-ol"></i>
					<h3>播放列表</h3>
					<span class="song-count">({{ playlist.songs.length }}首)</span>
				</div>
				<div class="header-right">
					<button class="header-btn" @click="togglePlaylist" title="关闭">
						<i class="fas fa-times"></i>
					</button>
				</div>
			</div>

			<div class="playlist-actions">
				<button
					class="play-all-btn"
					@click="playAll"
					:disabled="!playlist.songs.length"
				>
					<i class="fas fa-play"></i>
					<span>播放全部</span>
				</button>
				<button
					class="delete-btn"
					@click="clickClearPlaylist"
				>
					<i class="fas fa-trash-alt"></i>
					<span>清空列表</span>
				</button>
<!--				<button-->
<!--					class="collect-btn"-->
<!--					@click="collectAll"-->
<!--					:disabled="!playlist.songs.length"-->
<!--				>-->
<!--					<i class="fas fa-heart"></i>-->
<!--					<span>收藏全部</span>-->
<!--				</button>-->
			</div>

			<div class="playlist-container">
				<TransitionGroup
					name="list"
					tag="ul"
					class="playlist-items"
				>
					<li
						v-for="(song, index) in playlist.songs"
						:key="song.id"
						:class="{
            active: currentSongIndex === index,
            'is-playing': currentSongIndex === index && isPlaying
          }"
						@click="playSong(index)"
					>
						<div class="song-index">
							<span v-if="currentSongIndex !== index || !isPlaying">{{ index + 1 }}</span>
							<i v-else class="fas fa-volume-up playing-icon"></i>
						</div>

						<div class="song-info">
							<div class="primary-info">
								<span class="song-name">{{ song.name }}</span>
							</div>
							<span class="song-artist">{{ song.artist }}</span>
						</div>

<!--						<div class="song-actions">-->
<!--							<button-->
<!--								class="action-btn like-btn"-->
<!--								:class="{ 'is-liked': song.isLiked }"-->
<!--								@click.stop="toggleLike(index)"-->
<!--								:title="song.isLiked ? '取消喜欢' : '喜欢'"-->
<!--							>-->
<!--								<i :class="song.isLiked ? 'fas fa-heart' : 'far fa-heart'"></i>-->
<!--							</button>-->
<!--							<button-->
<!--								class="action-btn remove-btn"-->
<!--								@click.stop="removeSong(index)"-->
<!--								title="删除"-->
<!--							>-->
<!--								<i class="fas fa-times"></i>-->
<!--							</button>-->
<!--						</div>-->
					</li>
				</TransitionGroup>

				<div v-if="!playlist.songs.length" class="empty-playlist">
					<i class="fas fa-music"></i>
					<p>播放列表为空</p>
				</div>
			</div>
		</div>
	</div>
	<!--歌词上拉栏-->
	<div
		class="playlist-drawer"
		:class="{ 'drawer-open': showLyric && show }"
	>
		<div class="playlist-content">
			<div class="playlist-header">
				<div class="header-left">
					<i class="fa-solid fa-square-poll-horizontal" style="color: #00c853;"></i>
					<h3>歌词</h3>
				</div>
				<div class="header-right">
					<button class="header-btn" @click="toggleLyric" title="关闭">
						<i class="fas fa-times"></i>
					</button>
				</div>
			</div>

			<div class="playlist-container">
				<Loading v-if="isLoadingLyric" />
				<div v-else class="song-lyric">
					<div v-html="songLyric" class="song-lyric-content"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {clearPlaylist, playlist, playSongFromPlaylistByIndex} from "@/global/playlist";
import Loading from "@/components/Loading.vue";
import {recordPlayHistory} from "@/api/userApi";

export default {
	name: 'PlayerBar',
	components: {Loading},
	props: {
		show: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isPlaying: false,
			isMuted: false,
			volume: 100,
			currentTime: 0,
			duration: 0,
			isDraggingVolume: false,
			isDraggingProgress: false,
			lastVolume: 100,
			playMode: 'loop', // 'loop' | 'single' | 'random'
			playlist,
			showPlaylist: false,
			showLyric: false,
			songLyric: '',
			isLoadingLyric: false,
			currentSong: {
				type: {
					id: Number,
					name: String,
					artist: String,
					audioUrl: String,
					pictureUrl: String,
					genre: String,
					lyricUrl: String,
					mark: String,
					description: String,
					createTime: String
				},
				default: () => ({})
			},
			currentSongIndex: 0,
			isWideScreen: true,
			isChanging: false,
		}
	},

	computed: {
		progress() {
			return this.duration ? (this.currentTime / this.duration) * 100 : 0
		},
		playModeTitle() {
			const modes = {
				loop: '列表循环',
				single: '单曲循环',
				random: '随机播放'
			}
			return modes[this.playMode]
		}
	},

	methods: {
		async togglePlay() {
			if(this.playlist.songs.length === 0) return;

			console.log(this.currentSong.id)

			if ( !this.currentSong || this.currentSong.id === undefined || this.currentSong.id === 0){//Not Loaded
				console.log("Playing first song in playlist")
				await this.playSong(0)
				return;
			}

			if (this.currentSong.audioUrl === '') return;

			if (this.isPlaying) {
				this.$refs.audioRef.pause()
			} else {
				await this.$refs.audioRef.play()
			}
			this.isPlaying = !this.isPlaying
		},

		togglePlayMode() {
			const modes = ['loop', 'single', 'random']
			const currentIndex = modes.indexOf(this.playMode)
			const nextIndex = (currentIndex + 1) % modes.length
			this.playMode = modes[nextIndex]
		},

		togglePlaylist() {
			this.showPlaylist = !this.showPlaylist
			this.showLyric = false
		},

		toggleLyric() {
			this.showLyric = !this.showLyric
			this.showPlaylist = false
		},

		async loadLyric(){
			if(this.currentSong.lyricUrl === ''){
				this.showLyric = false
				return;
			}
			this.isLoadingLyric = true
			try {
				const request = new Request(this.currentSong.lyricUrl)
				const response = await fetch(request)
				console.log("Lyric response", response)
				this.songLyric = await response.text()
				this.songLyric = this.songLyric + "<br><br>"
			}catch (e){
				console.log("Error loading lyric", e)
			}
			this.isLoadingLyric = false
		},

		async changeSong(newSong) {
			if(this.isChanging) return;
			this.isChanging = true
			try {
				if (!newSong || newSong.id === undefined || newSong.id === '') {
					return
				}
				if (newSong.audioUrl && newSong.audioUrl !== '') {
					//Record History
					recordPlayHistory(newSong.id).catch(e => {
						console.log("Error recording play history", e)
					})
					//Before playing the song, check if it is already playing.
					console.log("Is playing?" , this.isPlaying)
					if (!this.isPlaying) {
						this.currentSong = newSong
						console.log("Playing song", newSong)
						await this.$refs.audioRef.load()
						this.$refs.audioRef.currentTime = 0
						await this.$refs.audioRef.play()
						this.isPlaying = true
					} else {
						this.$refs.audioRef.pause()
						this.currentSong = newSong
						await this.$refs.audioRef.load()
						this.$refs.audioRef.currentTime = 0
						await this.$refs.audioRef.play()
					}
					await this.loadLyric()
					//After this, the song should play.
				} else if(newSong.pictureUrl === 'http://devops-server-song.oss-cn-nanjing.aliyuncs.com/c3c89d64-6709-4b01-bab8-ca01f1d6ac96_notplaying.jpg'){
					if(this.isPlaying){
						this.$refs.audioRef.pause()
						this.isPlaying = false
					}
					this.currentSong = newSong
				}
				this.isChanging = false
			} catch (e) {
				console.log("Error playing song inside change Song", e)
				this.isChanging = false
			}
		},

		async playSong(index) {
			if (this.playlist.songs.length === 0) return
			console.log("Playing song", this.playlist.songs[index])
			await this.changeSong(this.playlist.songs[index]).catch(
				e => {
					console.log("Error playing song in Change Song", e)
				}
			)
			try{
				this.currentSongIndex = index
				await playSongFromPlaylistByIndex(index)
			}catch (e){
				console.log("Error playing song", e)
			}
		},

		removeSong(index) {
			// 从播放列表中移除歌曲
			this.playlist.splice(index, 1)
			if (index < this.currentSongIndex) {
				this.currentSongIndex--
			} else if (index === this.currentSongIndex) {
				// 如果删除的是当前播放的歌曲，播放下一首
				this.nextSong()
			}
		},

		prevSong() {
			if (this.playlist.songs.length === 0) return

			if(this.isPlaying){
				try {
					this.$refs.audioRef.pause();
					this.isPlaying = false
					this.playlist.playing = false;
				}catch (e){
					console.log("Error pausing song", e)
				}
			}

			if (this.playMode === 'random') {
				this.currentSongIndex = Math.floor(Math.random() * this.playlist.songs.length)
			} else if (this.playMode === 'single') {
				this.isPlaying = true
				try {
					this.$refs.audioRef.currentTime = 0
					this.$refs.audioRef.play()
				}catch (e){
					console.log("Error playing song", e)
				}
				return;
			} else {
				this.currentSongIndex = this.currentSongIndex - 1
				if (this.currentSongIndex < 0) {
					this.currentSongIndex = this.playlist.songs.length - 1
				}
			}

			this.playSong(this.currentSongIndex)
		},

		nextSong() {
			if (this.playlist.songs.length === 0) return

			if (this.playMode === 'random') {
				const nextIndex = Math.floor(Math.random() * this.playlist.songs.length)
				this.currentSongIndex = nextIndex
			} else if (this.playMode === 'single') {
				// 单曲循环，重新播放当前歌曲
				try {
					this.$refs.audioRef.currentTime = 0
					this.$refs.audioRef.play()
				}catch (e){
					console.log("Error playing song", e)
				}
				return;
			} else {
				// 列表循环
				this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.songs.length
			}

			this.playSong(this.currentSongIndex)
		},

		startVolumeChange(e) {
			this.isDraggingVolume = true
			this.updateVolume(e)

			// 添加全局事件监听
			window.addEventListener('mousemove', this.handleVolumeChange)
			window.addEventListener('mouseup', this.stopVolumeChange)
		},

		handleVolumeChange(e) {
			if (this.isDraggingVolume) {
				e.preventDefault()
				this.updateVolume(e)
			}
		},

		stopVolumeChange() {
			if (this.isDraggingVolume) {
				this.isDraggingVolume = false
				// 移除全局事件监听
				window.removeEventListener('mousemove', this.handleVolumeChange)
				window.removeEventListener('mouseup', this.stopVolumeChange)
			}
		},

		updateVolume(e) {
			const volumeSlider = this.$refs.volumeSlider
			const rect = volumeSlider.getBoundingClientRect()
			const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
			const percentage = (x / rect.width) * 100
			this.volume = Math.round(Math.min(Math.max(percentage, 0), 100))
			this.$refs.audioRef.volume = this.volume / 100

			if (this.isMuted) {
				this.isMuted = false
				this.$refs.audioRef.muted = false
			}
		},

		toggleMute() {
			this.isMuted = !this.isMuted
			this.$refs.audioRef.muted = this.isMuted
			if (this.isMuted) {
				this.lastVolume = this.volume
				this.volume = 0
			} else {
				this.volume = this.lastVolume
			}
			this.$refs.audioRef.volume = this.volume / 100
		},

		startProgressChange(e) {
			this.isDraggingProgress = true
			this.seek(e)
			window.addEventListener('mousemove', this.handleProgressChange)
			window.addEventListener('mouseup', this.stopProgressChange)
		},

		handleProgressChange(e) {
			if (this.isDraggingProgress) {
				e.preventDefault()
				this.seek(e)
			}
		},

		stopProgressChange() {
			if (this.isDraggingProgress) {
				this.isDraggingProgress = false
				window.removeEventListener('mousemove', this.handleProgressChange)
				window.removeEventListener('mouseup', this.stopProgressChange)
			}
		},

		seek(e) {
			const progressSlider = this.$refs.progressSlider
			const rect = progressSlider.getBoundingClientRect()
			const x = e.clientX - rect.left
			const percentage = Math.min(x / rect.width, 0.999); //防止闪烁
			const newTime = this.duration * percentage
			this.currentTime = newTime
			this.$refs.audioRef.currentTime = newTime
		},

		onTimeUpdate() {
			this.currentTime = this.$refs.audioRef.currentTime
		},

		onLoadMetadata() {
			this.duration = this.$refs.audioRef.duration
		},

		onEnded() {
			this.isPlaying = false
			this.nextSong()
		},

		formatTime(time) {
			const minutes = Math.floor(time / 60)
			const seconds = Math.floor(time % 60)
			return `${minutes}:${seconds.toString().padStart(2, '0')}`
		},

		async playAll(){
			this.currentSongIndex = 0
			await this.changeSong(this.playlist.songs[0]).catch(e => {
				console.log("Error playing song", e)
			})
			this.isPlaying = true
			this.playlist.playing = true
			this.playlist.currentIndex = 0
		},

		async resetCurrentSong(){
			try {
				this.$refs.audioRef.pause()
			}catch (e){
				console.log("Error pausing song", e)
			}
			const emptySong = {
				id: 0,
				name: '',
				artist: '',
				audioUrl: '',
				pictureUrl: 'http://devops-server-song.oss-cn-nanjing.aliyuncs.com/c3c89d64-6709-4b01-bab8-ca01f1d6ac96_notplaying.jpg',
				genre: '',
				lyricUrl: '',
				mark: '',
				description: '',
				createTime: ''
			}
			await this.changeSong(emptySong)
			this.currentSongIndex = 0
			this.isPlaying = false
			this.duration = 0
			this.currentTime = 0
		},

		clickClearPlaylist(){
			this.resetCurrentSong()
			clearPlaylist();
		},

		checkScreenWidth() {
			this.isWideScreen = window.innerWidth >= 920;
		},
	},


	watch: {
		// currentSong: {
		// 	handler(newSong) {
		// 		if(!newSong||newSong.id===undefined||newSong.id===''){
		// 			return
		// 		}
		// 		if (newSong.audioUrl && newSong.audioUrl !== '') {
		// 			this.$nextTick(() => {
		// 				this.changeSong().catch(e => {
		// 					console.log("Error playing song", e)
		// 				})
		// 			})
		// 		}
		// 	},
		// 	deep: true,
		// 	flush: "post"
		// },
		playlist:{
			async handler(newPlaylist){
				console.log("Watched playlist change", newPlaylist)
				this.playlist = newPlaylist
				if(newPlaylist.jumping){
					console.log("Playing song from playlist", newPlaylist.currentIndex)
					await this.playSong(newPlaylist.currentIndex);
				}
			},
			deep: true,
		}
	},
	mounted() {
		this.checkScreenWidth(); // 初始化检查
		window.addEventListener("resize", this.checkScreenWidth);
	},

	// 组件销毁时清理全局事件监听
	beforeUnmount() {
		window.removeEventListener('mousemove', this.handleVolumeChange)
		window.removeEventListener('mouseup', this.stopVolumeChange)
		window.removeEventListener('mousemove', this.handleProgressChange)
		window.removeEventListener('mouseup', this.stopProgressChange)
		window.removeEventListener("resize", this.checkScreenWidth);
	}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.player-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 80px;
	background: #1a1a1a;
	display: flex;
	align-items: center;
	padding: 0 20px;
	transform: translateY(100%);
	transition: transform 0.3s ease;
	z-index: 1000;
}

.player-bar-show {
	transform: translateY(0);
}

.player-left {
	display: flex;
	align-items: center;
	width: 300px;
}

.song-cover {
	width: 60px;
	height: 60px;
	border-radius: 8px;
	overflow: hidden;
	margin-right: 15px;
}

.song-cover img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.song-container {
	display: flex;
	align-items: center;
}

.song-info {
	color: #fff;
}

.song-name {
	font-size: 16px;
	font-weight: 500;
	margin-bottom: 4px;
}

.song-artist {
	font-size: 14px;
	color: #999;
}

.player-center {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.control-buttons {
	margin-bottom: 5px;
}

.control-buttons button {
	background: transparent;
	border: none;
	color: #fff;
	font-size: 20px;
	padding: 5px 10px;
	cursor: pointer;
	transition: all 0.2s;
}

.control-buttons button:hover {
	color: #1db954;
}

.play-btn {
	font-size: 24px !important;
	margin: 0 20px;
}

/* 播放按钮动画 */
.play-btn i {
	transition: transform 0.3s ease-in-out;
}

.play-btn i.fa-play {
	transform: scale(1);
}

.play-btn i.fa-pause {
	transform: scale(1.2);
}

.mode-btn {
	font-size: 18px !important;
	margin: 0 15px 0 30px;
}

.playlist-btn {
	font-size: 18px !important;
	margin: 0 0 0 15px;
}

.playlist-btn.active {
	color: #1db954;
}

.lyric-btn{
	font-size: 18px !important;
}

.lyric-btn.active {
	color: #1db954;
}

.lyric-btn:disabled{
	color: #999;
}

.lyric-btn:disabled:hover{
	color: #999;
}

.progress-bar {
	width: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
}

.time {
	color: #999;
	font-size: 12px;
	min-width: 40px;
}

.progress-wrapper {
	flex: 1;
	height: 4px;
	position: relative;
	cursor: pointer;
}

.progress-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #4d4d4d;
	border-radius: 2px;
}

.progress-current {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	background: #1db954;
	border-radius: 2px;
	//transition: width 0.1s linear;
}

.progress-handle {
	position: absolute;
	top: 50%;
	width: 12px;
	height: 12px;
	background: #fff;
	border-radius: 50%;
	transform: translate(-50%, -50%);
	//transition: all 0.2s;
	opacity: 0;
}

.progress-wrapper:hover .progress-handle {
	opacity: 1;
}

.player-right {
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.player-right-thin {
	display: none;
}

.volume-btn {
	background: transparent;
	border: none;
	color: #fff;
	font-size: 18px;
	padding: 10px;
	cursor: pointer;
}

.volume-slider {
	width: 100px;
	height: 4px;
	position: relative;
	cursor: pointer;
}

.volume-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #4d4d4d;
	border-radius: 2px;
}

.volume-current {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	background: #1db954;
	border-radius: 2px;
	//transition: width 0.05s linear;
}

.volume-handle {
	position: absolute;
	top: 50%;
	width: 12px;
	height: 12px;
	background: #fff;
	border-radius: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
	transition: opacity 0.4s ease;
}

.volume-slider:hover .volume-handle {
	opacity: 1;
}

.playlist-drawer {
	position: fixed;
	right: 0;
	bottom: var(--player-height);
	width: var(--now-playing-width);
	background: var(--color-background);
	color: var(--color-text);
	transform: translateY(100%);
	opacity: 0;
	transition: all 0.5s ease;
	z-index: 1 !important;
	border-top-right-radius: 12px;
	border-top-left-radius: 12px;
	box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
	overflow: hidden;
}

.drawer-open {
	transform: translateY(0);
	opacity: 1;
}

.playlist-content {
	height: var(--drawer-height);
	max-height: 600px;
	display: flex;
	flex-direction: column;
}

.playlist-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px 20px;
	background: var(--color-background-light);
}

.header-left {
	display: flex;
	align-items: center;
	gap: 12px;
}

.playlist-icon {
	color: var(--color-primary);
	font-size: 18px;
}

.playlist-header h3 {
	margin: 0;
	font-size: 16px;
	font-weight: 600;
}

.song-count {
	color: var(--color-text-secondary);
	font-weight: bold;
	font-size: 14px;
}

.header-right {
	display: flex;
	gap: 8px;
}

.header-btn {
	padding: 4px 8px;
	color: var(--color-text-secondary);
	background-color: var(--color-background-light);
	transition: all 0.2s ease;
	border-radius: 20px;
	font-size: 16px;
	border: solid 2px var(--color-border);
}

.header-btn:hover {
	color: var(--color-primary);
	transform: scale(1.1);
}

.playlist-actions {
	display: flex;
	gap: 12px;
	padding: 4px 20px 16px;
	background: var(--color-background-light);
}

.play-all-btn,
.delete-btn {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 4px 16px;
	border-radius: 20px;
	font-size: 12px;
	transition: all 0.2s ease;
}

.play-all-btn {
	background: var(--color-primary);
	border: 1px solid var(--color-border);
	color: white;
}

.play-all-btn:hover {
	background: var(--color-primary-dark);
	transform: translateY(-1px);
}

.delete-btn {
	background: transparent;
	border: 1px solid var(--color-border);
	color: var(--color-text);
}

.delete-btn:hover {
	border-color: var(--color-primary);
	color: var(--color-primary);
}

.play-all-btn:disabled,
.delete-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.playlist-container {
	flex: 1;
	overflow: hidden;
	position: relative;
}

.playlist-items {
	list-style: none;
	margin: 0;
	padding: 0;
	overflow-y: auto;
	height: 100%;
}

.playlist-items li {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 12px 20px;
	cursor: pointer;
	transition: all 0.2s ease;
}

.playlist-items li:hover {
	background: var(--color-background-hover);
}

.song-index {
	width: 24px;
	text-align: center;
	color: var(--color-text-secondary);
	font-size: 14px;
}

.playing-icon {
	color: var(--color-primary);
	animation: pulse 1s infinite;
}

.song-info {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.primary-info {
	display: flex;
	align-items: center;
	gap: 8px;
}

.song-name {
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.song-artist {
	color: var(--color-text-secondary);
	font-size: 14px;
	white-space: nowrap;
	text-align: start;
	overflow: hidden;
	text-overflow: ellipsis;
}

.song-actions {
	display: flex;
	gap: 8px;
	opacity: 0;
	transition: opacity 0.2s ease;
}

.playlist-items li:hover .song-actions {
	opacity: 1;
}

.action-btn {
	padding: 6px;
	color: var(--color-text-secondary);
	transition: all 0.2s ease;
}

.action-btn:hover {
	color: var(--color-primary);
	transform: scale(1.1);
}

.like-btn.is-liked {
	color: var(--color-primary);
}

.empty-playlist {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	text-align: center;
	color: var(--color-text-secondary);
}

.empty-playlist i {
	font-size: 48px;
	margin-bottom: 16px;
}

.lyric-container {
	flex: 1;
	overflow: scroll;
	position: relative;
}


.song-lyric{
	overflow: scroll;
	display: flex;
	overflow-y: auto;
	height: 100%;
}

.song-lyric-content{
	flex: 1;
	white-space: pre-wrap;
	padding: 20px;
	text-align: start;
	font-size: 14px;
	font-weight: normal;
	color: #eee;
}

.song-lyric-content:after{
	content: '';
	display: block;
	height: 20px;
}

i{
	animation: change 0.2s forwards;
}

@keyframes change {
	0% {
		transform: scale(0.8);
	}
	100% {
		transform: scale(1);
	}
}

/* 列表动画 */
.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

.list-leave-active {
	position: absolute;
}

/* 播放动画 */
@keyframes pulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

@media screen and (max-width: 920px) {
	.player-bar {
		padding: 0 10px;
		height: var(--player-height);
		flex-direction: column;
		justify-content: center;
	}

	.player-left {
		width: calc(100% - 20px);
		justify-content: space-between;
		margin: 10px 10px;
	}

	.song-cover {
		width: 40px;
		height: 40px;
	}

	.player-center {
		width: 100%;
	}

	.control-buttons {
		margin-bottom: 8px;
	}

	.control-buttons button {
		padding: 3px 8px;
		font-size: 16px;
	}

	.play-btn {
		font-size: 20px !important;
		margin: 0 15px;
	}

	.mode-btn, .playlist-btn {
		margin: 0 15px;
	}

	.player-right {
		display: none;
	}

	.player-right-thin {
		width: 100px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.progress-bar {
		padding: 0 10px;
		margin-bottom: 10px;
	}

	.time {
		min-width: 35px;
		font-size: 10px;
	}

	.song-name {
		text-overflow: ellipsis;
		max-width: 30vw;
	}
}
</style>