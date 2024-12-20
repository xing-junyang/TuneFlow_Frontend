<script setup>

import Modal from "@/components/Modal.vue";
import {computed, onMounted, ref} from "vue";
import {commentSong, commentSongList, getSongComments, getSongListComments} from "@/api/commentApi";
import {ElMessage} from "element-plus";

const props = defineProps({
	id: Number,
	isSongList: Boolean
})

const comments = ref([]);
//comment schema:
//"id": "string",
// "mark": "string",
// 	"content": "string",
// 	"userId": "string",
// 	"type": "string",
// 	"songId": "string",
// 	"playlistId": "string",
// 	"createTime": "2019-08-24T14:15:22.123Z"

onMounted(()=>{
	// 获取评论
	if(props.isSongList){
		// 获取歌单评论
		getSongListComments(props.id).then(res=>{
			comments.value = res.data.result;
		})
	}else{
		// 获取歌曲评论
		getSongComments(props.id).then(res=>{
			comments.value = res.data.result;
			console.log(res.data);
		})
	}
	//Mock Data
	// comments.value = [
	// 	{
	// 		id: 1,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 2,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 3,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 4,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 5,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 6,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 7,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 8,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 9,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	},
	// 	{
	// 		id: 10,
	// 		content: '这首歌真好听',
	// 		createTime: '2021-08-24 14:15:22'
	// 	}
	// ]
})

const newComment = ref('');
const newCommentRating = ref(0);
const handleComment = async ()=>{
	// 提交评论
	if(props.isSongList) {
		// 提交歌单评论
		await commentSongList(props.id, newCommentRating.value, newComment.value).catch(err=>{
			console.log(err);
			ElMessage.error('评论失败, 请检查网络连接');
		}).then(res=>{
			console.log(res);
			if(res.data.code === '000'){
				ElMessage.success('评论成功');
			}else{
				ElMessage.error('评论失败, 请检查网络连接');
			}
		})
	}else{
		// 提交歌曲评论
		await commentSong(props.id, newCommentRating.value, newComment.value).catch(err=>{
			console.log(err);
			ElMessage.error('评论失败, 请检查网络连接');
		}).then(res=>{
			console.log(res);
			if(res.data.code === '000'){
				ElMessage.success('评论成功');
			}else{
				ElMessage.error('评论失败, 请检查网络连接');
			}
		})
	}
	newComment.value = '';
	newCommentRating.value = 0;
	// 刷新评论
	if(props.isSongList){
		// 获取歌单评论
		await getSongListComments(props.id).then(res=>{
			comments.value = res.data.result;
		})
	}else{
		// 获取歌曲评论
		await getSongComments(props.id).then(res=>{
			comments.value = res.data.result;
		})
	}
}
const formValidate = computed(()=>{
	return newComment.value !== '' && newCommentRating.value !== 0;
})
const dateFormatter = (dateStr)=>{
	const date = new Date(dateStr);
	// YYYY-MM-DD HH:MM:SS
	// 2021-08-24 14:01:02

	const year = date.getFullYear();
	const month = date.getMonth()+1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();// 1 -> 01
	const second = date.getSeconds();

	return `${year}-${month<10? '0'+month: month}-${day<10? '0'+day: day} ${hour<10? '0'+hour: hour}:${minute<10? '0'+minute: minute}:${second<10? '0'+second: second}`;
}

</script>

<template>
	<Modal :title="props.isSongList? '歌单评论': '歌曲评论'" @closeModal="$emit('closeComment')">
		<div class="comment-container">
			<div v-for="comment in comments" :key="comment.id" class="comment-card">
				<div class="comment-content">{{comment.content}}</div>
				<div class="comment-container-bottom">
					<div class="comment-rating">
						<el-rate v-model="comment.mark" disabled></el-rate>
					</div>
					<div class="comment-time">{{dateFormatter(comment.createTime)}}</div>
				</div>
			</div>
		</div>
		<div class="comment-area-container">
			<textarea v-model="newComment" class="comment-area"></textarea>
			<div class="comment-rating-container">
				<el-rate v-model="newCommentRating"></el-rate>
				<button @click="handleComment" :disabled="!formValidate" class="submit-btn">提交</button>
			</div>

		</div>
	</Modal>
</template>

<style scoped>
	.comment-container{
		display: flex;
		flex-wrap: wrap;
	}
	.comment-card{
		width: 100%;
		//border: 1px solid #e0e0e0;
		background-color: #424242;
		border-radius: 16px;
		margin: 10px;
		padding: 10px 20px;
	}
	.comment-content{
		font-size: 16px;
		padding-top: 6px;
		color: white;
		text-align: start;
	}
	.comment-container-bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.comment-time{
		font-size: 12px;
		color: #999;
		text-align: end;
	}
	.comment-area-container{
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.comment-rating-container{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: row;
		gap: 10px;
		margin-top: 20px;
	}
	.comment-area{
		width: 90%;
		height: 100px;
		padding: 12px;
		margin-bottom: 10px;
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.05);
		transition: all 0.3s ease;
		font-size: 1rem;
	}
	.comment-area:focus {
		outline: none;
		border-color: #1db954;
		box-shadow: 0 0 0 4px rgba(29, 185, 84, 0.1);
		animation: inputPulse 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	.comment-area::placeholder {
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