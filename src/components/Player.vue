<template>
	<div class="player-bar" :class="{ 'player-bar-show': show }">
		<div class="player-left">
			<div class="song-container">
				<div class="song-cover" :class="{ 'rotating': isPlaying }">
					<img src="@/assets/default-cover.png" alt="cover">
				</div>
				<div class="song-info">
					<div class="song-name">{{ currentSong.name || '未播放' }}</div>
					<div class="song-artist">{{ currentSong.artist || '-' }}</div>
				</div>
			</div>
			<div class="player-right-thin">
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
					<i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
				</button>
				<button class="next-btn" @click="nextSong">
					<i class="fas fa-step-forward"></i>
				</button>

				<button class="playlist-btn" @click="togglePlaylist" title="播放列表">
					<i class="fas fa-list"></i>
				</button>
			</div>

			<div class="progress-bar">
				<div class="time">{{ formatTime(currentTime) }}</div>
				<div class="progress-wrapper" @click="seek">
					<div class="progress-bg"></div>
					<div class="progress-current" :style="{ width: progress + '%' }"></div>
					<div class="progress-handle" :style="{ left: progress + '%' }"></div>
				</div>
				<div class="time">{{ formatTime(duration) }}</div>
			</div>
		</div>

		<div class="player-right">
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
			:src="currentSong.path"
			@timeupdate="onTimeUpdate"
			@loadedmetadata="onLoadMetadata"
			@ended="onEnded"
		></audio>
	</div>
</template>

<script>
export default {
	name: 'PlayerBar',

	props: {
		currentSong: {
			type: {
				id: Number,
				name: String,
				artist: String,
				path: String,
				mark: String,
				description: String,
				createTime: String
			},
			default: () => ({})
		},
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
			lastVolume: 100,
			playMode: 'loop', // 'loop' | 'single' | 'random'
			playlist: [], // 你的歌曲列表
			showPlaylist: false,
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
		togglePlay() {
			if (!this.currentSong.path) return
			//TODO

			if (this.isPlaying) {
				this.$refs.audioRef.pause()
			} else {
				this.$refs.audioRef.play()
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
		},

		playSong(index) {
			this.currentSongIndex = index
			this.isPlaying = true
			// TODO: 实现播放选中歌曲的逻辑
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
			if (this.playlist.length === 0) return

			if (this.playMode === 'random') {
				const prevIndex = Math.floor(Math.random() * this.playlist.length)
				this.currentSongIndex = prevIndex
			} else if (this.playMode === 'single') {
				this.$refs.audioRef.currentTime = 0
				this.$refs.audioRef.play()
			} else {
				this.currentSongIndex = this.currentSongIndex - 1
				if (this.currentSongIndex < 0) {
					this.currentSongIndex = this.playlist.length - 1
				}
			}

			this.playSong(this.currentSongIndex)
		},

		nextSong() {
			if (this.playlist.length === 0) return

			if (this.playMode === 'random') {
				const nextIndex = Math.floor(Math.random() * this.playlist.length)
				this.currentSongIndex = nextIndex
			} else if (this.playMode === 'single') {
				// 单曲循环，重新播放当前歌曲
				this.$refs.audioRef.currentTime = 0
				this.$refs.audioRef.play()
			} else {
				// 列表循环
				this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length
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

		seek(e) {
			const rect = e.target.getBoundingClientRect()
			const x = e.clientX - rect.left
			const percentage = x / rect.width
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
		}
	},

	watch: {
		currentSong: {
			handler(newSong) {
				if (newSong.path) {
					this.$nextTick(() => {
						this.$refs.audioRef.play()
						this.isPlaying = true
					})
				}
			},
			deep: true
		}
	},

	// 组件销毁时清理全局事件监听
	beforeUnmount() {
		window.removeEventListener('mousemove', this.handleVolumeChange)
		window.removeEventListener('mouseup', this.stopVolumeChange)
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

.rotating {
	animation: rotate 20s linear infinite;
}

@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

.song-container{
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

.mode-btn{
	font-size: 18px !important;
	margin: 0 30px;
}

.playlist-btn {
	font-size: 18px !important;
	margin: 0 30px;
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
	transition: width 0.1s linear;
}

.progress-handle {
	position: absolute;
	top: 50%;
	width: 12px;
	height: 12px;
	background: #fff;
	border-radius: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.2s;
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

@media screen and (max-width: 920px) {
	.player-bar {
		padding: 0 10px;
		height: 120px;
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
	}

	.time {
		min-width: 35px;
		font-size: 10px;
	}
}
</style>