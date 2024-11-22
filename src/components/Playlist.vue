<template>
  <div>
    <h2>Playlist</h2>
    <ul>
      <li v-for="song in songs" :key="song.id">{{ song.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PlaylistComponent',
  data() {
    return {
      songs: [],
    };
  },
};
</script>