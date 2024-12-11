<script setup>

import Modal from "@/components/Modal.vue";
import {computed, ref} from "vue";
import {ElMessage} from "element-plus";
import {updateAlbumInformation} from "@/api/songlistApi";

const props = defineProps({
	songListId: Number
})

const songListName = ref('')
const songListDescription = ref('')
const songListPictureUrl = ref('')
const songListArtistName = ref('')
const songListYear = ref("2023")
const isYearValid = computed(() => {
	//check whether the input is number and a valid year
	if(songListYear.value === ''){
		return true
	}
	for (let i = 0; i < songListYear.value.length; i++) {
		if (songListYear.value[i] < '0' || songListYear.value[i] > '9') {
			return false
		}
	}
	return Number(songListYear.value) > 1800 && Number(songListYear.value) < 2030
})
const isUploadSongListFormValid = computed(() => {
	return songListName.value && songListDescription.value && songListPictureUrl.value && isYearValid.value
})

const uploadHeaders = {
	Authorization: 'Bearer ' + sessionStorage.getItem('token'),
	token: sessionStorage.getItem('token')
}
const handleSongListPictureSuccess = (response) => {
	// 将上传的文件生成临时 URL，并绑定到 imageUrl
	ElMessage.success('上传成功');
	songListPictureUrl.value = response.result;
};
const handleUploadError = (err) => {
	ElMessage.error('上传失败，请检查网络连接');
	console.log(err);
};
const beforePictureUpload = (rawFile) => {
	// 判断文件格式是否为 JPEG
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('专辑图片应该是 JPEG 格式');
		return false;
	}
	// 判断文件大小是否超过 2MB
	if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('专辑图片大小不能超过 2MB');
		return false;
	}
	return true;
};

const handleUploadSongList = async () => {
	// 上传歌单信息
	console.log('上传歌单信息', props.songListId)
	//TODO: upload song list information
	const updateData = {
		name: songListName.value,
		userName: songListArtistName.value,
		description: songListDescription.value,
		pictureUrl: songListPictureUrl.value,
	}
	console.log(updateData)
	updateAlbumInformation(updateData).then((res) => {
		if(res.data.code === '000'){
			ElMessage.success('成功更新歌单信息')
		}else{
			ElMessage.error('更新歌单信息失败')
		}
	}).catch((err) => {
		console.error('Failed to update song list information', err)
		ElMessage.error('更新歌单信息失败，请检查网络连接')
	})
}

</script>

<template>
	<Modal title="编辑歌单" @closeModal="$emit('closeEditSongList')">
		<div class="upload-form">
			<div class="form-group">
				<label>
					<span class="material-icons">music_note</span>
					名称
				</label>
				<input type="text" v-model="songListName" required :class="{ 'has-value': songListName }" placeholder="请输入歌单名称">
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">person</span>
					作者
				</label>
				<input type="text" v-model="songListArtistName" required :class="{ 'has-value': songListArtistName }" placeholder="请输入作者名称">
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">calendar_month</span>
					年份
				</label>
				<input type="text" v-model="songListYear" required :class="{ 'has-value': songListYear }" placeholder="请输入发行年份">
				<span v-if="!isYearValid" class="error-message">请输入正确的年份</span>
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">description</span>
					描述
				</label>
				<input type="text" v-model="songListDescription" required :class="{ 'has-value': songListDescription }" placeholder="请输入歌单描述">
			</div>

			<div class="form-group">
				<label>
					<span class="material-icons">album</span>
					专辑封面（JPEG）
				</label>
				<el-upload
					class="avatar-uploader"
					action="http://113.44.139.10:8080/api/tools/upload"
					:headers="uploadHeaders"
					:show-file-list="false"
					:on-success="handleSongListPictureSuccess"
					:on-error="handleUploadError"
					:before-upload="beforePictureUpload"
					:auto-upload="true"
				>
					<img v-if="songListPictureUrl" :src="songListPictureUrl" class="avatar"/>
					<div v-else class="avatar-uploader-icon material-icons">cloud_upload</div>
				</el-upload>
			</div>
		</div>
		<button class="submit-btn" style="margin-top:50px;" :disabled="!isUploadSongListFormValid" @click="handleUploadSongList">
			<span class="material-icons">upload</span>
			保存修改
		</button>
		<button class="cancel-btn" @click="$emit('closeEditSongList')">
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

.audio-and-lyric-upload {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 50%;
}

.song-upload-group {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.avatar-uploader {
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
	//width: fit-content;
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar-uploader:hover {
	border-color: var(--color-primary);
}

.avatar-uploader-icon {
	border: 2px solid rgba(255, 255, 255, 0.1);
	background: rgba(255, 255, 255, 0.05);
	margin-top: 20px;
	border-radius: 12px;
	font-size: 56px;
	color: #c0c6d0;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.avatar {
	width: 178px;
	height: 178px;
	border-radius: 12px;
	object-fit: cover;
	border: 2px solid var(--el-border-color);
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