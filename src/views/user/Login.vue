<!-- Login.vue -->
<template>
	<div class="login-container">
		<div class="login-box">
			<div class="login-header">
				<h2>
					<span class="material-icons">music_note</span>
					欢迎回来
				</h2>
				<p class="subtitle">登录您的音乐账号</p>
			</div>

			<form class="login-form" @submit.prevent="handleLogin">
				<div class="form-group">
					<label>
						<span class="material-icons">email</span>
						电子邮箱
					</label>
					<input
						type="email"
						v-model="email"
						required
						:class="{ 'has-value': email }"
						placeholder="请输入邮箱"
					>
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">lock</span>
						密码
					</label>
					<div class="password-input">
						<input
							:type="showPassword ? 'text' : 'password'"
							v-model="password"
							required
							:class="{ 'has-value': password }"
							placeholder="请输入密码"
						>
						<span
							class="material-icons password-toggle"
							@click="showPassword = !showPassword"
						>
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
					</div>
				</div>

				<div class="form-options">
					<label class="checkbox-container">
						<input type="checkbox" v-model="rememberMe">
						<span class="checkmark"></span>
						<span class="remember-text">记住我</span>
					</label>
				</div>

				<button type="submit" class="submit-btn" :disabled="!isFormValid">
					<span class="material-icons">login</span>
					登录
				</button>

				<div class="register-link">
					还没有账号？
					<router-link to="/register">立即注册</router-link>
				</div>

				<div class="register-link" style="margin-top: 10px">
					<router-link to="/register">忘记密码？</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {ref, computed} from 'vue'

export default {
	name: 'LoginView',
	setup() {
		const email = ref('')
		const password = ref('')
		const rememberMe = ref(false)
		const showPassword = ref(false)

		const isFormValid = computed(() => {
			return email.value && password.value
		})

		const handleLogin = () => {
			// 处理登录逻辑
			console.log({
				email: email.value,
				password: password.value,
				rememberMe: rememberMe.value
			})
		}

		return {
			email,
			password,
			rememberMe,
			showPassword,
			isFormValid,
			handleLogin
		}
	}
}
</script>

<style scoped>
.login-container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
	padding: 20px;
}

.login-box {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 40px;
	width: 100%;
	max-width: 420px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);
	animation: fadeIn 0.5s ease forwards;
}

.login-header {
	text-align: center;
	margin-bottom: 40px;
}

.login-header h2 {
	color: #fff;
	font-size: 2rem;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.login-header .material-icons {
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

input[type="email"],
input[type="password"] {
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

.remember-text {
	color: rgba(255, 255, 255, 0.7);
	font-size: 0.9rem;
}

.checkbox-container {
	display: flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	user-select: none;
}

.checkbox-container input[type="checkbox"] {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

.checkmark {
	position: relative;
	height: 20px;
	width: 20px;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	transition: all 0.3s ease;
}

.checkbox-container:hover input ~ .checkmark {
	background-color: rgba(255, 255, 255, 0.2);
}

.checkbox-container input:checked ~ .checkmark {
	background-color: #1db954;
}

.checkmark:after {
	content: "";
	position: absolute;
	display: none;
	left: 7px;
	top: 3px;
	width: 5px;
	height: 10px;
	border: solid white;
	border-width: 0 2px 2px 0;
	transform: rotate(45deg);
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

.social-login {
	margin-top: 30px;
	text-align: center;
}

.social-login-text {
	color: rgba(255, 255, 255, 0.7);
	margin-bottom: 15px;
	position: relative;
}

.social-login-text::before,
.social-login-text::after {
	content: '';
	position: absolute;
	top: 50%;
	width: 30%;
	height: 1px;
	background: rgba(255, 255, 255, 0.2);
}

.social-login-text::before {
	left: 0;
}

.social-login-text::after {
	right: 0;
}

.social-buttons {
	display: flex;
	gap: 15px;
	justify-content: center;
}

.social-btn {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);
	cursor: pointer;
	transition: all 0.3s ease;
}

.social-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: translateY(-2px);
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
	.login-box {
		padding: 30px 20px;
	}

	.login-header h2 {
		font-size: 1.5rem;
	}

	.submit-btn {
		padding: 12px;
	}

	input[type="email"],
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