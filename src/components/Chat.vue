<template>
  <div class="chat-container">
    <div class="messages">
      <TransitionGroup name="list">
        <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="[msg.role === 'user' ? 'user' : 'assistant']"
        >
          <strong style="color: #949494; font-weight: 900">
            {{ msg.role === 'user' ? currentUsername : '小T' }}:
          </strong>
          <span v-if="msg.role === 'user'">{{ msg.content }}</span>
          <span v-else v-html="renderMarkdown(msg.content)"></span>
        </div>
      </TransitionGroup>
    </div>
    <div class="notice">
      由豆包提供大模型服务
    </div>
    <div class="input-area">
      <input
          v-model="userInput"
          @keyup.enter="handleSend"
          placeholder="请输入您的消息..."
      />
      <button @click="handleSend">发送</button>
    </div>
    <div v-if="loading" class="loading">小T正在思考...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>


<script>
import { marked } from 'marked';
import { sendChatMessage } from '@/api/chat';
import { getUserName } from '@/utils'; // 引入 getUserName 函数

export default {
  name: 'Chat',
  data() {
    return {
      messages: [
        {
          role: 'system',
          content: '嗨，欢迎回来！想听点什么或了解哪首歌呢？',
        },
      ],
      userInput: '',
      loading: false,
      error: '',
      model: 'ep-20241206163424-4wqwd', // 确保替换为有效的模型ID
      currentUsername: getUserName() || '用户', // 动态获取用户名
    };
  },
  methods: {
    async handleSend() {
      const content = this.userInput.trim();
      if (!content) return;

      // 添加用户消息到消息列表
      this.messages.push({
        role: 'user',
        content,
      });

      // 清空输入框
      this.userInput = '';
      this.loading = true;
      this.error = '';

      try {
        // 发送消息给后端，并获取助手的回复
        const response = await sendChatMessage(content);
        const assistantMessage = response.data.result;

        // 添加助手回复到消息列表
        this.messages.push({
          role: 'assistant',
          content: assistantMessage,
        });
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || '请求失败，请稍后重试。';
      } finally {
        this.loading = false;
      }
    },
    renderMarkdown(content) {
      // 将 Markdown 转换为 HTML
      return marked(content);
    },
  },
};
</script>

<style scoped>
.notice {
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #888;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 0;
  border-radius: 8px;
}

.chat-container {
	max-width: 600px;
	margin: 0 auto;
	padding: 0 20px 10px;
}

.messages {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  color: white;
  text-align: left; /* 确保文本内容靠左对齐 */
}

.messages div {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* 确保内容上下堆叠 */
  align-items: flex-start; /* 确保内容靠左对齐 */
}

.messages .user {
  text-align: right; /* 用户消息仍保持右对齐 */
  align-items: flex-end; /* 用户消息框靠右 */
}

.messages .assistant {
  text-align: left; /* 助手消息靠左对齐 */
  align-items: flex-start; /* 助手消息框靠左 */
}
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.list-leave-active {
	position: absolute;
}

.input-area {
	display: flex;
}

.input-area input {
	flex: 1;
	padding: 10px;
	font-size: 16px;
}

.input-area button {
	padding: 10px 20px;
	font-size: 16px;
}

input {
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

.loading {
	margin-top: 10px;
	color: #888;
	animation: fadeIn 1s ease forwards;
}

.error {
	margin-top: 10px;
	color: red;
	animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

button{
	width: 15%;
	border: none;
	margin-left: 10px;
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
}

button:not(:disabled):hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);
}

button:disabled {
	opacity: 0.7;
	cursor: not-allowed;
	transform: none;
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
