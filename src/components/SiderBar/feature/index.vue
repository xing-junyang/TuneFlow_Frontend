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
                        v-for="(playlist, index) in playlists" :key="playlist.id" :index="index"
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
</template>

<script setup>
import { computed } from 'vue'
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
import {
  playSongFromPlaylist,
} from '@/global/playlist';

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
                onClick: () => {
                    console.log('编辑', playlist)
                    updateSongList(playlist)
                }
            },
            {
                label: '删除',
                icon: 'fas fa-trash',
                onClick: () => {
                    console.log('删除', playlist)
                    deleteSongList(playlist)
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
const playlists = computed(() => {
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
    const song = songs.value.find(s => s.id.toString() === playlist.id);
    playSongFromPlaylist();
    console.log(song);

}

const handleCreatePlaylist = () => {
    const newSong = {
        name: "新歌曲",
        artist: "未知艺术家",
        description: "新添加的歌曲",
        mark: "未分类",
        path: ""
    }
    addSong(newSong)
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
</style>