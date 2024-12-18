<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { userSongList } from "@/hooks/useSongs";
import { getUserSongs } from "@/global/songs";
import Modal from "@/components/Modal.vue";
import { addSongToSongList } from "@/api/songApi";

const { songs } = userSongList();

const props = defineProps({
  songId: Number,
});
const emit = defineEmits(["closeEditSong"]);
const selectedId = ref("");

const handleEditSongConfirm = () => {
  addSongToSongList(selectedId.value, props.songId)
    .then((res) => {
      if (res.code === "000") {
        ElMessage.success("添加成功");
        getUserSongs();
        emit("closeEditSong");
      } else {
        ElMessage.error("添加失败");
      }
    })
    .catch(() => {
      ElMessage.error("添加失败");
    });
};
</script>

<template>
  <Modal title="添加歌曲到歌单" @closeModal="$emit('closeEditSong')">
    <div class="upload-form">
      <div class="form-group">
        <label>
          <span class="material-icons">music_note</span>
          选择歌单
        </label>
        <el-select v-model="selectedId" placeholder="请选择歌单">
          <el-option
            v-for="item in songs"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>

      <button class="submit-btn" @click="handleEditSongConfirm">
        <span class="material-icons">upload</span>
        确认添加
      </button>

      <button class="cancel-btn" @click="$emit('closeEditSong')">
        <span class="material-icons">cancel</span>
        取消添加
      </button>
    </div>
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

input[type="tel"],
input[type="password"],
input[type="text"],
input[type="year"],
input[type="number"] {
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
