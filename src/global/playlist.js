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
    playlist.jumping = false
    playlist.songs = songs
}

export async function playSongFromPlaylist() {
    playlist.jumping = true
    playlist.currentIndex = 0
    playlist.playing = true
}

export async function playSongFromPlaylistByIndex(index) {
    playlist.jumping = false
    playlist.currentIndex = index
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

export function clearPlaylist() {
    playlist.jumping = false
    playlist.songs = []
    playlist.currentIndex = 0
    playlist.playing = false
}

