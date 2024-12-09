<!--<template>-->
<!--	<header class="header">-->
<!--		<div class="header-left">-->
<!--			<h1 class="title" @click="handleHome">-->
<!--				<span class="material-icons">music_note</span>-->
<!--				Tune Flow-->
<!--			</h1>-->
<!--		</div>-->

<!--		<div class="header-right">-->
<!--			<button v-if="hasLogin && isAdmin" class="btn btn-login" @click="handleUploadSongList">-->
<!--                <span class="btn-content">-->
<!--                    <span class="material-icons">music_note</span>-->
<!--                    <span>上传音乐</span>-->
<!--                </span>-->
<!--			</button>-->
<!--			<button v-if="!hasLogin" class="btn btn-login" @click="handleLogin">-->
<!--                <span class="btn-content">-->
<!--                    <span class="material-icons">login</span>-->
<!--                    <span>登录</span>-->
<!--                </span>-->
<!--			</button>-->
<!--			<button v-if="!hasLogin" class="btn btn-register" @click="handleRegister">-->
<!--                <span class="btn-content">-->
<!--                    <span class="material-icons">person_add</span>-->
<!--                    <span>注册</span>-->
<!--                </span>-->
<!--			</button>-->
<!--			<div v-if="hasLogin" class="user-info-container">-->
<!--				<span class="user-info">欢迎，{{userName}}</span>-->
<!--			</div>-->
<!--			<button v-if="hasLogin" class="btn btn-login" @click="handleLogout">-->
<!--				<span class="btn-content">-->
<!--					<span class="material-icons">logout</span>-->
<!--					<span>登出</span>-->
<!--				</span>-->
<!--			</button>-->
<!--		</div>-->
<!--	</header>-->
<!--</template>-->

<!--<script>-->
<!--import {computed} from "vue";-->
<!--import {getUserName} from "@/utils";-->
<!--import router from "@/router";-->

<!--export default {-->
<!--	name: 'HeaderComponent',-->
<!--	components: {},-->
<!--	methods: {-->
<!--		handleLogin() {-->
<!--			this.$emit('login')-->
<!--			this.$router.push('/login')-->
<!--		},-->
<!--		handleRegister() {-->
<!--			this.$emit('register')-->
<!--			this.$router.push('/register')-->
<!--		},-->
<!--		handleUploadSongList() {-->
<!--			this.$emit('upload_song_list')-->
<!--			this.$router.push('/upload_song_list')-->
<!--		},-->
<!--		handleHome() {-->
<!--			this.$emit('home')-->
<!--			this.$router.push('/')-->
<!--		},-->
<!--		handleLogout() {-->
<!--			this.$emit('logout')-->
<!--			sessionStorage.removeItem('token')-->
<!--			sessionStorage.removeItem('userName')-->
<!--			localStorage.removeItem('token')-->
<!--			router.push('/')-->
<!--			//reload-->
<!--			location.reload()-->
<!--		}-->
<!--	},-->
<!--	setup() {-->
<!--		const userName = computed(() => {-->
<!--			return sessionStorage.getItem('userName')-->
<!--		})-->

<!--		const hasLogin = computed(() => {-->
<!--			console.log(sessionStorage.getItem('token'));-->
<!--			return (sessionStorage.getItem('token') != null || localStorage.getItem('token') != null)-->
<!--		})-->

<!--		const isAdmin = computed(() => {-->
<!--			const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))-->
<!--			console.log(userInfo.role);-->
<!--			return userInfo && userInfo.role === 'Admin'-->
<!--		})-->

<!--		return {-->
<!--			userName,-->
<!--			hasLogin,-->
<!--			isAdmin-->
<!--		}-->
<!--	},-->
<!--	beforeRouteEnter() {-->
<!--		getUserName();-->
<!--	}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--/* 引入Material Icons */-->
<!--@import url('https://fonts.googleapis.com/icon?family=Material+Icons');-->

<!--.header {-->
<!--	position: sticky;-->
<!--	top: 0;-->
<!--	left: 0;-->
<!--	width: calc(100% - 4rem);-->
<!--	z-index: 1000;-->
<!--	display: flex;-->
<!--	justify-content: space-between;-->
<!--	align-items: center;-->
<!--	padding: 1rem 2rem;-->
<!--	background: linear-gradient(to right, #1a1a1a, #2d2d2d);-->
<!--	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);-->
<!--}-->

<!--.header-left {-->
<!--	display: flex;-->
<!--	align-items: center;-->
<!--}-->

<!--.title {-->
<!--	color: #fff;-->
<!--	font-size: 1.5rem;-->
<!--	font-weight: 600;-->
<!--	margin: 0;-->
<!--	display: flex;-->
<!--	align-items: center;-->
<!--	gap: 0.5rem;-->
<!--	cursor: pointer;-->
<!--}-->

<!--.title .material-icons {-->
<!--	color: #1db954;-->
<!--	font-size: 1.8rem;-->
<!--}-->

<!--.user-info-container{-->
<!--	display: flex;-->
<!--	align-items: center;-->
<!--}-->

<!--.user-info {-->
<!--	color: #fff;-->
<!--	font-size: 1.2rem;-->
<!--	font-weight: 600;-->
<!--	margin: 0;-->
<!--}-->

<!--.header-right {-->
<!--	display: flex;-->
<!--	gap: 1.2rem;-->
<!--}-->

<!--.btn {-->
<!--	position: relative;-->
<!--	padding: 0.4rem 1.2rem;-->
<!--	border: none;-->
<!--	border-radius: 25px;-->
<!--	font-size: 0.95rem;-->
<!--	font-weight: 500;-->
<!--	cursor: pointer;-->
<!--	transition: all 0.3s ease;-->
<!--	overflow: hidden;-->
<!--}-->

<!--.btn-content {-->
<!--	display: flex;-->
<!--	align-items: center;-->
<!--	gap: 0.5rem;-->
<!--	position: relative;-->
<!--	z-index: 1;-->
<!--}-->

<!--.btn .material-icons {-->
<!--	font-size: 1.2rem;-->
<!--}-->

<!--.btn-login {-->
<!--	background-color: transparent;-->
<!--	color: #fff;-->
<!--	border: 2px solid rgba(255, 255, 255, 0.8);-->
<!--	backdrop-filter: blur(5px);-->
<!--}-->

<!--.btn-login::before {-->
<!--	content: '';-->
<!--	position: absolute;-->
<!--	top: 0;-->
<!--	left: -100%;-->
<!--	width: 100%;-->
<!--	height: 100%;-->
<!--	background: linear-gradient(-->
<!--		to right,-->
<!--		transparent,-->
<!--		rgba(255, 255, 255, 0.1),-->
<!--		transparent-->
<!--	);-->
<!--	transition: left 0.5s ease;-->
<!--}-->

<!--.btn-login:hover::before {-->
<!--	left: 100%;-->
<!--}-->

<!--.btn-login:hover {-->
<!--	border-color: #fff;-->
<!--	transform: translateY(-2px);-->
<!--	box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);-->
<!--}-->

<!--.btn-register {-->
<!--	background: linear-gradient(45deg, #1db954, #1ed760);-->
<!--	color: #fff;-->
<!--	box-shadow: 0 4px 15px rgba(29, 185, 84, 0.3);-->
<!--}-->

<!--.btn-register::before {-->
<!--	content: '';-->
<!--	position: absolute;-->
<!--	top: 0;-->
<!--	left: -100%;-->
<!--	width: 100%;-->
<!--	height: 100%;-->
<!--	background: linear-gradient(-->
<!--		to right,-->
<!--		transparent,-->
<!--		rgba(255, 255, 255, 0.2),-->
<!--		transparent-->
<!--	);-->
<!--	transition: left 0.5s ease;-->
<!--}-->

<!--.btn-register:hover::before {-->
<!--	left: 100%;-->
<!--}-->

<!--.btn-register:hover {-->
<!--	transform: translateY(-2px);-->
<!--	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);-->
<!--}-->

<!--.btn:active {-->
<!--	transform: translateY(1px);-->
<!--}-->

<!--@media (max-width: 600px) {-->
<!--	.header {-->
<!--		width: calc(100% - 2rem);-->
<!--		padding: 1rem;-->
<!--	}-->

<!--	.title {-->
<!--		font-size: 1.2rem;-->
<!--	}-->

<!--	.title .material-icons {-->
<!--		font-size: 1.4rem;-->
<!--	}-->

<!--	.user-info {-->
<!--		font-size: 1rem;-->
<!--	}-->

<!--	.btn {-->
<!--		padding: 0.5rem 1.2rem;-->
<!--		font-size: 0.85rem;-->
<!--	}-->

<!--	.btn .material-icons {-->
<!--		font-size: 1rem;-->
<!--	}-->
<!--}-->
<!--</style>-->

<template>
	<header class="header">
		<div class="header-left">
			<h1 class="title" @click="handleHome">
				<span class="material-icons">music_note</span>
				Tune Flow
			</h1>
		</div>

		<div class="header-right">
			<button v-if="hasLogin && isAdmin" class="btn btn-login" @click="handleUploadSongList">
        <span class="btn-content">
          <span class="material-icons">music_note</span>
          <span class="btn-text">上传音乐</span>
        </span>
			</button>
			<button v-if="!hasLogin" class="btn btn-login" @click="handleLogin">
        <span class="btn-content">
          <span class="material-icons">login</span>
          <span class="btn-text">登录</span>
        </span>
			</button>
			<button v-if="!hasLogin" class="btn btn-register" @click="handleRegister">
        <span class="btn-content">
          <span class="material-icons">person_add</span>
          <span class="btn-text">注册</span>
        </span>
			</button>
			<div v-if="hasLogin" class="user-info-container">
				<span class="user-info">欢迎，{{ userName }}</span>
			</div>
			<button v-if="hasLogin" class="btn btn-login" @click="handleLogout">
        <span class="btn-content">
          <span class="material-icons">logout</span>
          <span class="btn-text">登出</span>
        </span>
			</button>
			<!-- 新增聊天按钮 -->
			<button class="btn btn-chat" @click="openChat" v-if="hasLogin">
        <span class="btn-content">
          <span class="material-icons">chat</span>
          <span class="btn-text">聊天</span>
        </span>
			</button>
		</div>

		<!-- 弹出对话框 -->
		<div v-if="isChatOpen" class="modal-overlay" @click.self="closeChat">
			<div class="modal-content">
				<div class="modal-header">
					<h2>听歌助手小T</h2>
					<button class="close-button" @click="closeChat">
						<span class="material-icons">close</span>
					</button>
				</div>
				<div class="modal-body">
					<Chat/>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import {computed, ref} from "vue";
import {getUserName} from "@/utils";
import router from "@/router";
import Chat from "@/components/Chat.vue"; // 引入 Chat 组件

export default {
	name: 'HeaderComponent',
	components: {
		Chat, // 注册 Chat 组件
	},
	methods: {
		handleLogin() {
			this.$emit('login')
			this.$router.push('/login')
		},
		handleRegister() {
			this.$emit('register')
			this.$router.push('/register')
		},
		handleUploadSongList() {
			this.$emit('upload_song_list')
			this.$router.push('/upload_song_list')
		},
		handleHome() {
			this.$emit('home')
			this.$router.push('/')
		},
		handleLogout() {
			this.$emit('logout')
			sessionStorage.removeItem('token')
			sessionStorage.removeItem('userName')
			localStorage.removeItem('token')
			router.push('/')
			//reload
			location.reload()
		},
		openChat() {
			this.isChatOpen = true;
		},
		closeChat() {
			this.isChatOpen = false;
		}
	},
	setup() {
		const userName = computed(() => {
			return sessionStorage.getItem('userName')
		})

		const hasLogin = computed(() => {
			console.log(sessionStorage.getItem('token'));
			return (sessionStorage.getItem('token') != null || localStorage.getItem('token') != null)
		})

		const isAdmin = computed(() => {
			const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
			// console.log(userInfo.role);
			return userInfo && userInfo.role === 'Admin'
		})

		const isChatOpen = ref(false); // 控制对话框的显示与隐藏

		return {
			userName,
			hasLogin,
			isAdmin,
			isChatOpen,
		}
	},
	beforeRouteEnter() {
		getUserName();
	}
}
</script>

<style scoped>
/* 引入Material Icons */
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.header {
	position: sticky;
	top: 0;
	left: 0;
	width: calc(100% - 4rem);
	z-index: 1000;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 2rem;
	background: linear-gradient(to right, #1a1a1a, #2d2d2d);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-left {
	display: flex;
	align-items: center;
}

.title {
	color: #fff;
	font-size: 1.5rem;
	font-weight: 600;
	margin: 0;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
}

.title .material-icons {
	color: #1db954;
	font-size: 1.8rem;
}

.user-info-container {
	display: flex;
	align-items: center;
}

.user-info {
	color: #fff;
	font-size: 1.2rem;
	font-weight: 600;
	margin: 0;
}

.header-right {
	display: flex;
	gap: 1.2rem;
}

.btn {
	position: relative;
	padding: 0.4rem 1.2rem;
	border: none;
	border-radius: 25px;
	font-size: 0.95rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
	overflow: hidden;
}

.btn-content {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	position: relative;
	z-index: 1;
}

.btn .material-icons {
	font-size: 1.2rem;
}

.btn-login {
	background-color: transparent;
	color: #fff;
	border: 2px solid rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(5px);
}

.btn-login::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to right,
		transparent,
		rgba(255, 255, 255, 0.1),
		transparent
	);
	transition: left 0.5s ease;
}

.btn-login:hover::before {
	left: 100%;
}

.btn-login:hover {
	border-color: #fff;
	transform: translateY(-2px);
	box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.btn-register {
	background: linear-gradient(45deg, #1db954, #1ed760);
	color: #fff;
	box-shadow: 0 4px 15px rgba(29, 185, 84, 0.3);
}

.btn-register::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to right,
		transparent,
		rgba(255, 255, 255, 0.2),
		transparent
	);
	transition: left 0.5s ease;
}

.btn-register:hover::before {
	left: 100%;
}

.btn-register:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);
}

.btn-chat {
	background: #1db954;
	color: #fff;
	border: none;
	box-shadow: 0 4px 12px rgba(29, 185, 84, 0.3);
}

.btn-chat::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to right,
		transparent,
		rgba(255, 255, 255, 0.2),
		transparent
	);
	transition: left 0.5s ease;
}

.btn-chat:hover::before {
	left: 100%;
}

.btn-chat:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);
}

.btn:active {
	transform: translateY(1px);
}

/* 弹出对话框样式 */
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2000;
	animation: fade 0.5s ease forwards;
}

.modal-content {
	background-color: rgba(25,25,25,1);
	width: 90%;
	max-width: 600px;
	border-radius: 20px;
	overflow: hidden;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
	border: 1px solid rgba(255, 255, 255, 0.1);
	animation: fadeIn 0.5s ease forwards;
}

.modal-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 1.5rem;
	background-color: rgba(25,25,25,1);
	color: #fff;
}

.modal-header h2 {
	margin: 0;
	font-size: 1.5rem;
}

.close-button {
	background: none;
	border: none;
	color: #fff;
	cursor: pointer;
}

.modal-body {
	padding: 1rem;
	max-height: 70vh;
	overflow-y: auto;
}

@media (max-width: 600px) {
	.header {
		width: calc(100% - 2rem);
		padding: 1rem;
	}

	.title {
		font-size: 1.2rem;
	}

	.title .material-icons {
		font-size: 1.4rem;
	}

	.user-info {
		font-size: 1rem;
	}

	.btn {
		padding: 0.5rem 1.2rem;
		font-size: 0.85rem;
	}

	.btn .material-icons {
		font-size: 1rem;
	}

	.modal-content {
		width: 95%;
	}

	.btn-text{
		display: none;
	}

	.user-info{
		display: none;
	}
}

@media screen and (max-width: 500px) {
	.btn{
		padding: 0.5rem 0.8rem;
	}

}

@keyframes fade {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

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
</style>
