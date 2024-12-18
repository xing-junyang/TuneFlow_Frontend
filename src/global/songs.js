import {reactive} from 'vue'
import {SORT_TYPES} from '@/constants/sort'
import dayjs from 'dayjs'
import {
    createSongList,
    getUserSongList,
    searchSongList as searchSongListApi,
    deleteSongList,
    updateSongList
} from '@/api/songApi'

export const songListStore = reactive({
    // 用户的歌单列表
    userSongList: [],
    // 搜索结果
    searchResults: [],
    // 当前选中的歌曲
    currentSong: null,
})

// 获取用户的歌曲列表
export function getUserSongs() {
    try {
        getUserSongList().then(res => {
                if (res.code === '000') {
                    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
                    songListStore.userSongList = res.result.filter(i => i.userId === userInfo.id);
                }
                console.log('获取用户歌单成功:', songListStore.userSongList)
                return songListStore.userSongList
            }
        ).catch(error => {
            console.error('获取用户歌单失败(Promise):', error)
        })

    } catch (error) {
        console.error('获取用户歌单失败:', error)
        songListStore.userSongList = [
            {
                id: 1,
                name: "夜曲",
                artist: "周杰伦",
                path: "/songs/1.mp3",
                mark: "1.0",
                description: "《夜曲》是周杰伦演唱的歌曲",
                createTime: "2024-03-20"
            },
            {
                id: 2,
                name: "七里香",
                artist: "周杰伦",
                path: "/songs/2.mp3",
                mark: "流行",
                description: "《七里香》是周杰伦演唱的歌曲",
                createTime: "2024-03-21"
            }
        ]
        return songListStore.userSongList
    }
}

// 添加歌单
export async function addSong(songData) {
    try {
        const newSong = {
            ...songData,
            createTime: new Date().toISOString()
        }
        const res = await createSongList(newSong)
        if (res.code === '200') {
            songListStore.userSongList.push(res.result)
            return res.result
        }
        return null
    } catch (error) {
        console.error('创建歌单失败:', error)
        return null
    }
}

// 搜索歌单
export async function searchSongList(keyword) {
    if (!keyword) {
        songListStore.searchResults = []
        return songListStore.searchResults
    }

    try {
        const res = await searchSongListApi(keyword)
        if (res.code === '200') {
            songListStore.searchResults = res.result
        }
        return songListStore.searchResults
    } catch (error) {
        console.error('搜索歌单失败:', error)
        return []
    }
}

// 删除歌单
export async function removeSongList(songListId) {
    try {
        const res = await deleteSongList(songListId)
        if (res.code === '200') {
            songListStore.userSongList = songListStore.userSongList.filter(
                song => song.id !== songListId
            )
            return true
        }
        return false
    } catch (error) {
        console.error('删除歌单失败:', error)
        return false
    }
}

// 更新歌单
export async function updateSongDataList(songListData) {
    try {
        const res = await updateSongList(songListData)
        if (res.code === '000') {
            const index = songListStore.userSongList.findIndex(
                song => song.id === songListData.id
            )
            if (index !== -1) {
                songListStore.userSongList[index] = {
                    ...songListStore.userSongList[index],
                    ...songListData
                }
            }
            return true
        }
        return false
    } catch (error) {
        console.error('更新歌单失败:', error)
        return false
    }
}

// 排序歌单
export function sortSongList(type) {
    if (!type) {
        songListStore.searchResults = []
        return songListStore.searchResults
    }

    const sortedList = [...songListStore.userSongList]

    switch (type) {
        case SORT_TYPES.RECENT:
            // 最近播放，暂时不处理
            break
        case SORT_TYPES.ADDED:
            // 按创建时间排序，新创建的在前面
            sortedList.sort((a, b) => {
                return dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf()
            })
            break
        case SORT_TYPES.ALPHABETICAL:
            sortedList.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            break
        case SORT_TYPES.CREATOR:
            sortedList.sort((a, b) => {
                return a.artist.localeCompare(b.artist)
            })
            break
        default:
            break
    }

    songListStore.searchResults = sortedList
    return songListStore.searchResults
}