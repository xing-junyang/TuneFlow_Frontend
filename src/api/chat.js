// // src/api/chat.js
// import axios from 'axios';
//
// /**
//  * 发送聊天请求
//  * @param {Array} messages - 消息列表
//  * @param {String} model - 模型ID
//  * @param {Object} options - 其他可选参数
//  * @returns {Promise} - 返回Axios响应
//  */
// export const sendChatMessage = (model, messages, options = {}) => {
//     const data = {
//         model,         // 模型ID
//         messages,      // 消息列表
//         ...options,    // 其他配置（如需要）
//     };
//
//     return axios.post('api/chat/completions', data);  // 请求后端
// };

import axios from 'axios';

/**
 * 发送聊天请求
 * @param {String} userInput - 用户输入的消息
 * @returns {Promise} - 返回Axios响应
 */
export const sendChatMessage = (userInput) => {
    const config = {
        method: 'get',
        url: '/api/tools/chat',
        params: { keyword: userInput },
        headers: {
            'Content-Type': 'application/json',
            'token': sessionStorage.getItem('token') == null? localStorage.getItem('token'): sessionStorage.getItem('token')
        },
    };

    return axios(config);  // 请求后端
};
