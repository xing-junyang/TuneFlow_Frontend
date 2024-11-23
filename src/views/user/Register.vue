<!-- Register.vue -->
<template>
	<div class="register-container">
		<div class="register-box">
			<div class="register-header">
				<h2>
					<span class="material-icons">music_note</span>
					创建账号
				</h2>
				<p class="subtitle">开启您的音乐之旅</p>
			</div>

			<form class="register-form" @submit.prevent="handleRegister">
				<div class="form-group">
					<label>
						<span class="material-icons">person</span>
						用户名
					</label>
					<input
						type="text"
						v-model="username"
						required
						:class="{ 'has-value': username }"
						placeholder="请输入用户名"
					>
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">phone</span>
						手机号码
					</label>
					<input
						type="tel"
						v-model="phone"
						required
						:class="{ 'has-value': phone }"
						placeholder="请输入手机号码"
					>
					<span class="password-match" v-if="phone&&!isPhoneValid" :class="{ error: !isPhoneValid }">手机号无效</span>
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
							@input="checkPasswordStrength"
						>
						<span
							class="material-icons password-toggle"
							@click="showPassword = !showPassword"
						>
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
					</div>
					<div class="password-strength" v-if="password">
						<div class="strength-bars">
							<div
								v-for="n in 4"
								:key="n"
								:class="['strength-bar', { active: passwordStrength >= n }]"
							></div>
						</div>
						<span class="strength-text">{{ strengthText }}</span>
					</div>
				</div>

				<div class="form-group">
					<label>
						<span class="material-icons">lock_clock</span>
						确认密码
					</label>
					<div class="password-input">
						<input
							:type="showConfirmPassword ? 'text' : 'password'"
							v-model="confirmPassword"
							required
							:class="{ 'has-value': confirmPassword }"
							placeholder="请再次输入密码"
						>
						<span
							class="material-icons password-toggle"
							@click="showConfirmPassword = !showConfirmPassword"
						>
              {{ showConfirmPassword ? 'visibility_off' : 'visibility' }}
            </span>
					</div>
					<span class="password-match" v-if="confirmPassword" :class="{ error: !passwordsMatch }">
            {{ passwordsMatch ? '密码匹配' : '密码不匹配' }}
          </span>
				</div>

				<div class="terms">
					<label class="checkbox-container">
						<input type="checkbox" v-model="agreeToTerms">
						<span class="checkmark"></span>
						<span class="terms-text">
              我同意
              <a href="#">服务条款</a>
              和
              <a href="#">隐私政策</a>
            </span>
					</label>
				</div>

				<button type="submit" class="submit-btn" :disabled="!isFormValid">
					<span class="material-icons">person_add</span>
					注册
				</button>

				<div class="login-link">
					已有账号？
					<router-link to="/login">立即登录</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {ref, computed} from 'vue'
import {register} from "@/api/userApi";
import router from "@/router";

export default {
	name: 'RegisterView',
	setup() {
		const username = ref('')
		const phone = ref('')
		const password = ref('')
		const confirmPassword = ref('')
		const showPassword = ref(false)
		const showConfirmPassword = ref(false)
		const agreeToTerms = ref(false)
		const passwordStrength = ref(0)

		const isPhoneValid = computed(() => {
			return /^1[3456789]\d{9}$/.test(phone.value)
		})

		const strengthText = computed(() => {
			if (!password.value) return ''
			switch (passwordStrength.value) {
				case 1:
					return '弱，请重新选择密码'
				case 2:
					return '中'
				case 3:
					return '强'
				case 4:
					return '很强'
				default:
					return '很弱'
			}
		})

		const passwordsMatch = computed(() => {
			return !confirmPassword.value || password.value === confirmPassword.value
		})

		const isFormValid = computed(() => {
			return username.value &&
				phone.value &&
				password.value &&
				confirmPassword.value &&
				passwordsMatch.value &&
				agreeToTerms.value &&
				passwordStrength.value >= 2
		})

		const checkPasswordStrength = () => {
			let strength = 0
			const p = password.value

			if (p.length >= 8) strength++
			if (p.match(/[a-z]/) && p.match(/[A-Z]/)) strength++
			if (p.match(/[0-9]/)) strength++
			if (p.match(/[^a-zA-Z0-9]/)) strength++

			passwordStrength.value = strength
		}

		const handleRegister = () => {
			console.log({
				username: username.value,
				phone: phone.value,
				password: password.value,
				agreeToTerms: agreeToTerms.value
			})
			register("USER", username.value, phone.value, password.value, "Create User")
				.then(response => {
					console.log(response)
					if (response.data.code === '000') {
						console.log('注册成功')
						sessionStorage.setItem('phone', phone.value)
						router.push('/login')
					} else {
						console.error('注册失败', response.data.msg)
					}
				})
				.catch(error => {
					console.error(error)
				})
		}

		return {
			username,
			phone,
			password,
			confirmPassword,
			showPassword,
			showConfirmPassword,
			agreeToTerms,
			isPhoneValid,
			passwordStrength,
			strengthText,
			passwordsMatch,
			isFormValid,
			checkPasswordStrength,
			handleRegister
		}
	}
}
</script>

<style scoped>

.register-container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: start;
	background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
	padding: 20px;
}

.register-box {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	border-radius: 20px;
	padding: 40px;
	margin-top: 5vh;
	width: 100%;
	max-width: 420px;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.1);
}

.register-header {
	text-align: center;
	margin-bottom: 40px;
}

.register-header h2 {
	color: #fff;
	font-size: 2rem;
	margin-bottom: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}

.register-header .material-icons {
	color: #1db954;
}

.subtitle {
	color: rgba(255, 255, 255, 0.7);
	font-size: 1rem;
}

.register-form {
	display: flex;
	flex-direction: column;
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

.password-strength {
	margin-top: 8px;
}

.strength-bars {
	display: flex;
	gap: 4px;
	margin-bottom: 4px;
}

.strength-bar {
	height: 4px;
	flex: 1;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 2px;
	transition: background-color 0.3s ease;
}

.strength-bar.active {
	background: #1db954;
}

.strength-bar.active:nth-child(1) {
	background: #ff4444;
}

.strength-bar.active:nth-child(2) {
	background: #ffa700;
}

.strength-bar.active:nth-child(3) {
	background: #1db954;
}

.strength-bar.active:nth-child(4) {
	background: #00c853;
}

.strength-text {
	font-size: 0.8rem;
	color: rgba(255, 255, 255, 0.7);
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

.terms {
	margin: 20px 0;
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

.terms-text {
	color: rgba(255, 255, 255, 0.7);
	font-size: 0.9rem;
}

.terms-text a {
	color: #1db954;
	text-decoration: none;
	transition: color 0.3s ease;
}

.terms-text a:hover {
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
	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.21);
}

.submit-btn:disabled {
	opacity: 0.7;
	cursor: not-allowed;
	transform: none;
}

.submit-btn .material-icons {
	font-size: 1.2rem;
}

.login-link {
	text-align: center;
	margin-top: 20px;
	color: rgba(255, 255, 255, 0.7);
}

.login-link a {
	color: #1db954;
	text-decoration: none;
	font-weight: 600;
	transition: color 0.3s ease;
}

.login-link a:hover {
	color: #1ed760;
}

/* 输入框焦点和填充状态的动画效果 */
input.has-value,
input:focus {
	background: rgba(255, 255, 255, 0.1);
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
	.register-box {
		padding: 30px 20px;
	}

	.register-header h2 {
		font-size: 1.5rem;
	}

	.submit-btn {
		padding: 12px;
	}

	input[type="tel"],
	input[type="password"],
	input[type="text"] {
		padding: 10px 14px;
		font-size: 0.9rem;
	}

	.form-group label {
		font-size: 0.85rem;
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

.register-box {
	animation: fadeIn 0.5s ease forwards;
}

/* 输入框聚焦时的波纹效果 */
input:focus {
	animation: inputPulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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