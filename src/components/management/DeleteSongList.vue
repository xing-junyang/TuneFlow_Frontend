<script setup>
import Modal from "@/components/Modal.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { deleteAlbum, getAlbum } from "@/api/songlistApi";
import { ElMessage } from "element-plus";
import { deleteSong } from "@/api/songApi";
import { getUserSongs } from "@/global/songs";
const props = defineProps({
  songListId: Number,
  songListName: String,
  isMySongList: Boolean,
});

const router = useRouter();
const route = useRoute();

const emit = defineEmits(["callback", "closeDeleteSongList"]);

const songListName = ref("");

const handleAddSongConfirm = async () => {
        } else {
        }
      })
    if (!album) {
    }
    for (let songId of album.songsId) {
          } else {
          }
        })
      if (!ret) {
    }
  }
      } else {
      }
    })
</script>

<template>
  <Modal title="删除歌单或专辑" @closeModal="$emit('closeDeleteSongList')">
    <div class="upload-form">
      <div class="form-group">
        <label style="color: #ff4444">
          即将删除此歌单或专辑，此操作不可逆！一旦成功，你将永远无法访问到本歌单或专辑。
        </label>
      </div>

        <span class="material-icons">upload</span>
        确认删除
      </button>

      <button class="cancel-btn" @click="$emit('closeDeleteSongList')">
        <span class="material-icons">cancel</span>
        取消删除
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
  align-items: start;
  text-align: start;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: bold;
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
  border-color: #ff0000;
  box-shadow: 0 0 0 4px rgba(185, 29, 29, 0.1);
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
  background: linear-gradient(45deg, #ff4444, #ff0000);
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
  box-shadow: 0 6px 20px #ff4444;
}

.submit-btn:disabled {
  opacity: 0.5;
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

.mismatch {
  display: block;
  font-size: 0.8rem;
  margin-top: 4px;
  color: #ff4444;
  transition: color 0.3s ease;
  font-weight: bold;
}

@keyframes inputPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(185, 29, 29, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(185, 29, 29, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(185, 29, 29, 0);
  }
}
</style>
