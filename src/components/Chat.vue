<template>
  <div class="chat-container">
    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.role">
        <strong>{{ msg.role === 'user' ? '用户' : '助手' }}:</strong>
        <span>{{ msg.content }}</span>
      </div>
    </div>
    <div class="input-area">
      <input
          v-model="userInput"
          @keyup.enter="handleSend"
          placeholder="请输入您的消息..."
      />
      <button @click="handleSend">发送</button>
    </div>
    <div v-if="loading" class="loading">助手正在回复...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { sendChatMessage } from '@/api/chat';

export default {
  name: 'Chat',
  data() {
    return {
      messages: [
        {
          role: 'system',
          content: '你是豆包，是由字节跳动开发的 AI 人工智能助手',
        },
      ],
      userInput: '',
      loading: false,
      error: '',
      model: 'ep-20241206163424-4wqwd', // 确保替换为有效的模型ID
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
        const response = await sendChatMessage(this.model, this.messages);
        const assistantMessage = response.data.choices[0].message.content;

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
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.messages {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.messages div {
  margin-bottom: 10px;
}

.messages .user {
  text-align: right;
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

.loading {
  margin-top: 10px;
  color: #888;
}

.error {
  margin-top: 10px;
  color: red;
}
</style>
