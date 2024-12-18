import { songListStore, addSong, searchSongList, sortSongList, updateSongDataList, removeSongList } from '@/global/songs'
import { ref, computed } from 'vue'
import { SORT_TYPES } from '@/constants/sort'
export const userSongList = () => {

    const searchText = ref('')
    const sortBy = ref(SORT_TYPES.RECENT)

    const songs = computed(() => {
        return (songListStore.searchResults.length > 0 ? songListStore.searchResults : songListStore.userSongList) || []
    })

    const setSearchText = (text) => {
        searchText.value = text
        searchSongList(text)
    }

    const setSortBy = (type) => {
        console.log(type, 'type')
        sortBy.value = type
        sortSongList(type)
    }

    const updateSongList = (songList) => {
        console.log(songList, 'songList')
        updateSongDataList(songList)
    }

    const deleteSongList = (songListId) => {
        console.log(songListId, 'songListId')
        removeSongList(songListId)
    }

    return {
        searchText,
        songs,
        sortBy,
        addSong,
        setSearchText,
        setSortBy,
        updateSongList,
        deleteSongList
    }
}