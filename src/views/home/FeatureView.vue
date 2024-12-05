<script setup>
import { ref} from 'vue';

// 模拟专辑数据
const albums = ref([
	{
		id: 1,
		name: "未来的主人翁",
		userId: "user1",
		songsId: "1,2,3,4",
		mark: "4.8",
		description: "罗大佑",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/4e/52/eb/4e52eb12-24a5-e5eb-47f9-db4f7ff6b6ed/cover.jpg/632x632bb.webp"
	},
	{
		id: 2,
		name: "淡淡幽情",
		userId: "user8",
		songsId: "29,30,31,32",
		mark: "4.8",
		description: "鄧麗君",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://i.scdn.co/image/ab67616d00001e029ae021694717fbc5fb004003"

	},
	{
		id: 3,
		name: "Variety",
		userId: "user2",
		songsId: "5,6,7,8",
		mark: "4.5",
		description: "竹内まりや",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c9/8c/a6/c98ca691-2006-6116-81f6-52ec22f5e25c/825646183807.jpg/632x632bf.webp"
	},
	{
		id:4,
		name: "范特西",
		userId: "user3",
		songsId: "9,10,11,12",
		mark: "4.7",
		description: "周杰伦",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a4/f2/f0/a4f2f0d4-cc80-d1a0-7f20-a0cc842a523c/JAY.jpg/632x632bf.webp"
	},
	{
		id: 5,
		name: "Beyond - 25th Anniversary",
		userId: "user4",
		songsId: "13,14,15,16",
		mark: "4.9",
		description: "Beyond",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl:"https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/fe/95/73/fe957371-e8c8-acd2-f711-e7dd26274e77/08UMGIM02297.rgb.jpg/632x632bb.webp"
	},
	{
		id: 6,
		name: "午夜色彩",
		userId: "user1",
		songsId: "1,2,3,4",
		mark: "4.8",
		description: "深夜里的电子音乐精选",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://th.bing.com/th/id/R.d820b497cc152184d0f6620a9ec15714?rik=NdJJFHHnyGxSVg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2015%2f12%2f40105-gradient-simple_background-colorful-abstract.jpg&ehk=HXCvpXoX%2fSQHIUxEUk8uCjhkgJNzA46%2bX6VinvVPLN8%3d&risl=&pid=ImgRaw&r=0"
	},
	{
		id: 7,
		name: "Fearless (Taylor's Version)",
		userId: "user5",
		songsId: "17,18,19,20",
		mark: "4.9",
		description: "Taylor Swift",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://is1-ssl.mzstatic.com/image/thumb/Video124/v4/7d/a3/88/7da388ea-28b6-acde-a2db-3586884bd28e/Job8bd8b474-05f4-47aa-b79e-7876585e3a01-110587237-PreviewImage_preview_image_nonvideo_sdr-Time1617126173244.png/632x632bb.webp"
	},
	{
		id: 8,
		name: "David Tao",
		userId: "user6",
		songsId: "21,22,23,24",
		mark: "4.8",
		description: "David Tao",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/dd/bb/bd/ddbbbda1-9408-72b2-4c0b-943e648be6c1/190295574086.jpg/632x632bb.webp"
	},
	{
		id: 9,
		name: "永遠是你的朋友",
		userId: "user7",
		songsId: "25,26,27,28",
		mark: "4.8",
		description: "陳慧嫻",
		createTime: "2024-01-01T00:00:00+08:00",
		type: "Album",
		pictureUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/62/4d/51/624d51d3-3336-c246-3d50-22bf9e86bb25/00602488888844.rgb.jpg/632x632bb.webp"
	},

	// ... 更多专辑数据
]);

const navigateToAlbum = (albumId) => {
	// 导航到专辑详情页面的逻辑
	console.log('Navigate to album:', albumId);
};
</script>

<template>
	<div class="feature-main-container">
		<div class="feature-title">为你推荐</div>

		<div class="albums-grid">
			<div v-for="album in albums" :key="album.id" class="album-card" @click="navigateToAlbum(album.id)">
				<div class="album-cover">
					<div class="album-image">
<!--						Display album image-->
						<img :src="album.pictureUrl" :alt="album.name" class="album-image" />
					</div>
					<div class="play-button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
							<path d="M8 5v14l11-7z"/>
						</svg>
					</div>
				</div>
				<div class="album-info">
					<h3 class="album-name">{{ album.name }}</h3>
					<p class="album-description">{{ album.description }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.feature-main-container {
	display: flex;
	height: 95%;
	flex-direction: column;
	align-items: start;
	padding: 40px;
	background-color: var(--color-background-page);
	color: #ffffff;
	overflow: auto;
	flex:1;
}

.feature-title {
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
	border-radius: 8px;
}

.play-button {
	position: absolute;
	bottom: 8px;
	right: 8px;
	width: 40px;
	height: 40px;
	background-color: #1db954;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.play-button svg {
	width: 24px;
	height: 24px;
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

@media (max-width: 768px) {
	.feature-main-container {
		padding: 20px;
	}

	.albums-grid {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 16px;
	}

	.feature-title {
		font-size: 28px;
		margin-bottom: 24px;
	}
}
</style>