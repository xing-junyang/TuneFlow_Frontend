import {getUserInfo} from "@/api/userApi";

export function getUserName() {
    getUserInfo().then(res => {
        if(res.data.code === '000'){
            console.log(res.data.result)
            sessionStorage.setItem('userName', res.data.result.name)
        }else{
            console.error('获取用户信息失败： ',res.data.msg)
        }
    }).catch(err => {
        console.error(err)
    })
}

export function hasLogin() {
    return (sessionStorage.getItem('token') != null || localStorage.getItem('token') != null)
}