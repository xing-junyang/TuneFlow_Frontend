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
                    <span>上传音乐</span>
                </span>
			</button>
			<button v-if="!hasLogin" class="btn btn-login" @click="handleLogin">
                <span class="btn-content">
                    <span class="material-icons">login</span>
                    <span>登录</span>
                </span>
			</button>
			<button v-if="!hasLogin" class="btn btn-register" @click="handleRegister">
                <span class="btn-content">
                    <span class="material-icons">person_add</span>
                    <span>注册</span>
                </span>
			</button>
			<div v-if="hasLogin" class="user-info-container">
				<span class="user-info">欢迎，{{userName}}</span>
			</div>
			<button v-if="hasLogin" class="btn btn-login" @click="handleLogout">
				<span class="btn-content">
					<span class="material-icons">logout</span>
					<span>登出</span>
				</span>
			</button>
		</div>
	</header>
</template>

<script>
import {computed} from "vue";
import {getUserName} from "@/utils";
import router from "@/router";

export default {
	name: 'HeaderComponent',
	components: {},
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
			console.log(userInfo.role);
			return userInfo && userInfo.role === 'Admin'
		})

		return {
			userName,
			hasLogin,
			isAdmin
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

.user-info-container{
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

.btn:active {
	transform: translateY(1px);
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
}
</style>