<script setup>
import Modal from "@/components/Modal.vue";
import {ref} from "vue";
import {deleteAlbum, getAlbum} from "@/api/songlistApi";
import {ElMessage} from "element-plus";
import {deleteSong} from "@/api/songApi";
const props = defineProps({
	songListId: Number,
	songListName: String
})

const songListName = ref('');

const handleAddSongConfirm =async () =>{
	console.log('删除歌单:', props.songListId)
	const album = await getAlbum(props.songListId).then((res) => {
		if(res.data.code === '000'){
			console.log('歌单:', res.data.data)
			return res.data.result
		}else{
			ElMessage.error('获取歌单信息失败，请检查网络连接')
		}
	}).catch((err) => {
		console.error('Failed to delete songlist:', err)
		ElMessage.error('获取歌单信息失败，请检查网络连接')
	})
	if(!album){
		return
	}
	console.log('album gonna be deleted:', album)
	for(let songId of album.songsId){
		console.log('deleting song:', songId)
		const ret = await deleteSong(songId).then((res) => {
			if(res.code === '000'){
				console.log('deleted song:', songId)
				return songId
			}else{
				console.error('Failed to delete song:', songId)
				ElMessage.error('删除歌曲失败，请检查网络连接')
			}
		}).catch((err) => {
			console.error('Failed to delete song:', songId, err)
			ElMessage.error('删除歌曲失败，请检查网络连接')
		})
		if(!ret){
			return
		}
	}
	console.log('deleting album:', props.songListId)
	await deleteAlbum(props.songListId).then((res) => {
		if(res.data.code === '000'){
			ElMessage.success('成功删除歌单'+props.songListName)
		}else{
			ElMessage.error('删除歌单失败')
		}
	}).catch((err) => {
		console.error('Failed to delete album:', err)
		ElMessage.error('删除歌单失败，请检查网络连接')
	})
}
</script>

<template>
	<Modal title="删除歌单或专辑" @closeModal="$emit('closeDeleteSongList')">
		<div class="upload-form">
			<div class="form-group" >
				<label style="color: #ff4444">
					即将删除此歌单或专辑，此操作不可逆！一旦成功，你将永远无法访问到本歌单或专辑。
				</label>
				<label>
					请在下面输入"{{props.songListName}}"以确认删除
				</label>
				<input type="text" v-model="songListName" required :class="{ 'has-value': songListName }" placeholder="请确认删除">
				<span class="mismatch" v-if="songListName && songListName !== props.songListName">输入有误</span>
			</div>

			<button class="submit-btn" @click="handleAddSongConfirm" :disabled="songListName && songListName !== props.songListName">
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
	background: linear-gradient(45deg,#ff4444, #ff0000);
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

.mismatch{
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