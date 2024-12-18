export function getUserName() {
    const userInfo = sessionStorage.getItem('userInfo') == null? localStorage.getItem('userInfo'): sessionStorage.getItem('userInfo')
    if(userInfo == null) {
        return null
    }
    sessionStorage.setItem('userName', JSON.parse(userInfo).name)
    return JSON.parse(userInfo).name
}

export function hasLogin() {
    return (sessionStorage.getItem('token') != null || localStorage.getItem('token') != null)
}

export function getClientWidth() {
    return document.documentElement.clientWidth
  }