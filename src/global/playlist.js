import { reactive } from 'vue'

export const playlist = reactive({
    songs: [],
    currentIndex: 0,
    playing: false,
})

export function setPlaylistSongs(songs) {
    playlist.songs = songs
}

export function addSong(song) {
    playlist.songs.push(song)
}

export function addSongByDetail(id, name, artist, path, mark, description, createTime) {
    playlist.songs.push({
        id,
        name,
        artist,
        path,
        mark,
        description,
        createTime,
    });
}