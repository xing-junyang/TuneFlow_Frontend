import { reactive } from 'vue'

export const userStore = reactive({
    currentUser: null,
})

export function initUserStore() {
    const token = sessionStorage.getItem('token')
    if (token) {
        // 这里可以解析token或者发送请求获取用户信息
        userStore.currentUser = {
            token,
            // 其他用户信息...
        }
    }
}

export function setCurrentUser(user) {
    userStore.currentUser = user
}

export function clearCurrentUser() {
    userStore.currentUser = null
    sessionStorage.removeItem('token')
} 