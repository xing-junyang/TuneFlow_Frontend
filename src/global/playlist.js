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
    jumping: false
})


export function setPlaylistSongs(songs) {
    playlist.songs = songs
    playlist.jumping = false
}

export function playSongFromPlaylist() {
    playlist.jumping = true
    playlist.playing = true
}


export function addSong(song) {
    playlist.jumping = false
    playlist.songs.push(song)
}

export function addSongByDetail(id, name, artist, path, mark, description, createTime) {
    playlist.jumping = true
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
    playlist.jumping = true
    return playlist.playing
}

export function getCurrentIndex() {
    playlist.jumping = true
    return playlist.currentIndex
}