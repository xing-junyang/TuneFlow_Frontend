import { reactive } from 'vue'
/*
    song: {
					id: Number,
					name: String,
					artist: String,
					path: String,
					mark: String,
					description: String,
					createTime: String
			}
	songs: song[]
 */
export const playlist = reactive({
    songs: [],
    currentIndex: 0,
    playing: false,
})


export function setPlaylistSongs(songs) {
    playlist.songs = songs
}

export function playSongFromPlaylist() {
    playlist.playing = true
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

export function isPlaying() {
    return playlist.playing
}

export function getCurrentIndex() {
    return playlist.currentIndex
}