<template>
  <div>
    <h2>Your Playlist</h2>
    <PlaylistComponent />
  </div>
</template>

<script>
import PlaylistComponent from '@/components/Playlist.vue';

export default {
  name: 'PlaylistView',
  components: { PlaylistComponent },
};
</script>