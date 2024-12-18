<script setup>
import { computed } from "vue";
import { ElMessage } from "element-plus";
import Modal from "@/components/Modal.vue";
import { updateSongList } from "@/api/songApi";
import { getUserSongs } from "@/global/songs";

const props = defineProps(["editSongForm"]);
const emit = defineEmits(["callback", "closeEditMySongList"]);

const formData = computed(() => ({
  ...props.editSongForm,
}));
// 处理表单提交
const handleSubmit = async () => {
  try {
    const reqParams = {
      id: formData.value.id,
      name: formData.value.name,
      description: formData.value.description,
      userId: formData.value.userId,
      songsId: formData.value.songsId,
      createTime: formData.value.createTime,
    };
    const res = await updateSongList(reqParams);
    if (res.code === "000") {
      ElMessage.success("更新成功");
      emit("closeEditMySongList");
      // 刷新列表
      emit("callback");
      getUserSongs();
    } else {
      ElMessage.error(res.msg || "更新失败");
    }
  } catch (error) {
    console.error("更新歌单失败:", error);
    ElMessage.error("更新失败");
  }
};

// 编辑我的歌单
</script>

<template>
  <!-- 添加编辑对话框 -->
  <Modal title="编辑我的歌单" @closeModal="$emit('closeEditMySongList')">
    <div class="form-group">
      <label>
        <span class="material-icons">music_note</span>
        名称
      </label>
      <input
        type="text"
        v-model="formData.name"
        required
        :class="{ 'has-value': formData.name }"
        placeholder="请输入歌单名称"
      />
    </div>
    <div class="form-group">
      <label>
        <span class="material-icons">description</span>
        描述
      </label>
      <input
        type="text"
        v-model="formData.description"
        required
        :class="{ 'has-value': formData.description }"
        placeholder="请输入歌单描述"
      />
    </div>

    <button
      class="submit-btn"
      style="margin-top: 50px"
      :disabled="!formData.name"
      @click="handleSubmit"
    >
      <span class="material-icons">upload</span>
      保存修改
    </button>
    <button class="cancel-btn" @click="$emit('closeEditMySongList')">
      <span class="material-icons">cancel</span>
      取消编辑
    </button>
  </Modal>
</template>

<style scoped>
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

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-group input[type="text"] {
  width: calc(100% - 40px);
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}
.form-group input:focus {
  outline: none;
  border-color: #1db954;
  box-shadow: 0 0 0 4px rgba(29, 185, 84, 0.1);
  animation: inputPulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
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

.cancel-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #cac9c9, rgba(239, 239, 239, 0.5));
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

.cancel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 239, 239, 0.31);
}

.cancel-btn .material-icons {
  font-size: 1.2rem;
}
</style>
