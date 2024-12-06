<template>
    <SidebarRoot :style="{ height: showPlayer ? `calc(100% - var(--player-height))` : '100%' }">
        <SidebarHeader>
            <div class="header-content" :class="{ 'collapsed': !isExpanded }">
                <div class="music-lib" @click="toggleSidebar">
                    <LibraryIcon :expanded="isExpanded" />
                    <span class="title" v-if="isExpanded">音乐库</span>
                </div>

                <el-tooltip v-if="isExpanded && showLeftIcon" placement="top" :show-after="300" effect="dark"
                    :show-arrow="false">
                    <template #content>
                        <div>显示更多</div>
                    </template>
                    <span class="IconWrapper" @click="updateWidth(SIDEBAR_MAX_WIDTH)">
                        <i class="fa-solid fa-arrow-right"></i>
                    </span>
                </el-tooltip>

                <el-tooltip v-else-if="isExpanded" placement="top" :show-after="300" effect="dark" :show-arrow="false">
                    <template #content>
                        <div>收起</div>
                    </template>
                    <span class="IconWrapper" @click="updateWidth(SIDEBAR_MIN_WIDTH)">
                        <i class="fa-solid fa-arrow-left"></i>
                    </span>
                </el-tooltip>
            </div>
        </SidebarHeader>
        <FilterToolbar v-if="isExpanded" />
        <SidebarContent>
            <SidebarGroup :title="isExpanded ? '播放列表' : ''">
                <SidebarMenu>
                    <SidebarMenuItem :rightMenuOptions="getRightMenuOptions(playlist)"
                        v-for="(playlist, index) in songList" :key="playlist.id" :index="index"
                        :collapsed="!isExpanded" @click="handlePlay(playlist)">
                        <template #expanded>
                            <PlaylistItemExpanded :playlist="playlist" @play="handlePlay" />
                        </template>

                        <template #collapsed>
                            <PlaylistItemCollapsed :playlist="playlist" />
                        </template>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter v-if="isExpanded">
            <button class="create-playlist-button" @click="handleCreatePlaylist">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                        d="M2 0v2H0v1.5h2v2h1.5v-2h2V2h-2V0H2zm11.5 2.5H8.244A5.482 5.482 0 0 0 7.966 1H15v11.75A2.75 2.75 0 1 1 12.25 10h1.25V2.5zm0 9h-1.25a1.25 1.25 0 1 0 1.25 1.25V11.5zM4 8.107a5.465 5.465 0 0 0 1.5-.593v5.236A2.75 2.75 0 1 1 2.75 10H4V8.107zM4 11.5H2.75A1.25 1.25 0 1 0 4 12.75V11.5z" />
                </svg>
                <span dir="auto" class="button-text">创建新歌单</span>
            </button>
        </SidebarFooter>
    </SidebarRoot>

    <!-- 添加编辑对话框 -->
    <el-dialog
        v-model="dialogVisible"
        title="编辑歌单"
        width="30%"
        :before-close="handleClose"
    >
        <el-form
            ref="formRef"
            :model="editForm"
            :rules="rules"
            label-width="80px"
        >
            <el-form-item label="歌单名称" prop="name">
                <el-input 
                    v-model="editForm.name" 
                    placeholder="请输入歌单名称"
                    maxlength="50"
                    show-word-limit
                />
            </el-form-item>
            
            <el-form-item label="描述" prop="description">
                <el-input
                    v-model="editForm.description"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入歌单描述"
                    maxlength="200"
                    show-word-limit
                />
            </el-form-item>
        </el-form>
        
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
    SidebarRoot,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarGroup,
    SidebarFooter,
    useSidebar
} from "@/components/SiderBar"
import {
    SIDEBAR_MIN_WIDTH,
    SIDEBAR_MAX_WIDTH
} from "@/components/SiderBar/SidebarContext"
import PlaylistItemExpanded from './components/PlaylistItemExpanded.vue'
import PlaylistItemCollapsed from './components/PlaylistItemCollapsed.vue'
import FilterToolbar from './components/FilterToolbar.vue'
import LibraryIcon from './components/LibraryIcon.vue'
import { userSongList } from '@/hooks/useSongs'
import { setPlaylistSongs } from '@/global/playlist'
const { songs, addSong, updateSongList, deleteSongList } = userSongList()

defineProps({
    showPlayer: {
        type: Boolean,
        default: true
    }
})

const getRightMenuOptions = (playlist) => {
    return {
        items: [
            {
                label: '编辑',
                icon: 'fas fa-edit',
                onClick: () => handleEdit(playlist)
            },
            {
                label: '删除',
                icon: 'fas fa-trash',
                onClick: () => {
                    console.log('删除', playlist)
                    deleteSongList(playlist.id)
                }
            }
        ],
        enable: true
    }
}


const { width, updateWidth, isExpanded, toggleSidebar } = useSidebar()
const showLeftIcon = computed(() => {
    return SIDEBAR_MIN_WIDTH >= width.value
})
const songList = computed(() => {
    return songs.value.map(song => ({
        id: song.id.toString(),
        name: song.name,
        description: song.description || '',
        images: [],
        owner: {
            name: '我的音乐'
        },
        capabilities: {
            canEdit: true,
            canView: true
        },
        songCount: 1
    }))
})

const handlePlay = (playlist) => {
    const song = songs.value.find(s => s.id.toString() === playlist.id)
    console.log(song)
    setPlaylistSongs(song)
}

const handleCreatePlaylist = () => {
    const newSong = {
        name: "新歌曲",
        artist: "未知艺术家",
        description: "新添加的歌曲",
        mark: "4.8",
        path: ""
    }
    addSong(newSong)
}

// 表单ref
const formRef = ref(null)

// 对话框可见性
const dialogVisible = ref(false)

// 编辑表单数据
const editForm = reactive({
    id: '',
    name: '',
    description: '',
    userId: '',
    songsId: '',
    createTime: ''
})

// 表单验证规则
const rules = {
    name: [
        { required: true, message: '请输入歌单名称', trigger: 'blur' },
        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    description: [
        { max: 200, message: '描述不能超过200个字符', trigger: 'blur' }
    ]
}

// 处理关闭对话框
const handleClose = (done) => {
    formRef.value?.resetFields()
    done()
}

// 打开编辑对话框
const handleEdit = (playlist) => {
    Object.assign(editForm, {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        userId: playlist.userId,
        songsId: playlist.songsId,
        createTime: playlist.createTime
    })
    dialogVisible.value = true
}

// 处理表单提交
const handleSubmit = async () => {
    if (!formRef.value) return
    
    await formRef.value.validate(async (valid) => {
        if (valid) {
            try {
                const res = await updateSongList(editForm)
                if (res.code === '200') {
                    ElMessage.success('更新成功')
                    dialogVisible.value = false
                    // 刷新列表
                    // await getUserSongs()
                } else {
                    ElMessage.error(res.msg || '更新失败')
                }
            } catch (error) {
                console.error('更新歌单失败:', error)
                ElMessage.error('更新失败')
            }
        }
    })
}
</script>

<style lang="less" scoped>
.header-content {
    display: flex;
    align-items: center;
    gap: 8px;
    transition: padding 0.2s;

    &.collapsed {
        justify-content: center;

        .music-lib {
            margin-right: 0;
            gap: 0;
        }
    }

    .music-lib {
        height: 32px;
        line-height: 32px;
        padding: 4px 8px;
        margin-right: auto;
        display: flex;
        gap: 12px;
        color: rgb(179, 179, 179);
        align-items: center;
        cursor: pointer;

        svg {
            width: 24px;
            height: 24px;
            transition: transform 0.2s;
            user-select: none;
        }

        .title {
            font-size: 16px;
            font-weight: 700;
            transition: opacity 0.2s;
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .IconWrapper {
        cursor: pointer;
        display: flex;
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s;

        svg,
        i {
            width: 16px;
            height: 16px;
        }
    }
}

.menu-item-content {
    &:hover {
        .play-button {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .item-cover {
        width: 48px;
        height: 48px;
        background: var(--color-background-light);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border-radius: 4px;

        .play-button {
            display: none;
            position: absolute;
            right: 4px;
            bottom: 4px;
            background: var(--color-primary);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            color: black;
            cursor: pointer;
            transition: transform 0.2s;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;

        .item-name {
            color: var(--color-text);
            text-decoration: none;
            font-weight: 500;
        }

        .item-details {
            color: var(--color-text-secondary);
            font-size: 0.875rem;
            margin-top: 4px;
        }
    }
}

.create-playlist-button {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    cursor: pointer;
    text-align: left;
    transition: color 0.2s ease;

    &:hover {
        color: var(--color-text);
    }

    svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
        flex-shrink: 0;
    }

    .button-text {
        font-size: 0.875rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

:deep(.el-dialog) {
    border-radius: 8px;
    background-color: var(--color-background);
    color: var(--color-text);
    
    .el-dialog__header {
        margin-bottom: 20px;
        padding: 20px;
        border-bottom: 1px solid var(--color-border);
        
        .el-dialog__title {
            color: var(--color-text);
        }
    }
    
    .el-dialog__body {
        padding: 0 20px;
    }
    
    .el-dialog__footer {
        padding: 20px;
        border-top: 1px solid var(--color-border);
    }

    .el-input__wrapper {
        background-color: var(--color-background-light);
    }

    .el-input__inner {
        color: var(--color-text);
    }

    .el-textarea__inner {
        background-color: var(--color-background-light);
        color: var(--color-text);
    }

    .el-form-item__label {
        color: var(--color-text);
    }
}
</style>