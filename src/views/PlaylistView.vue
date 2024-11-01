<template>
  <div>
    <h2>Your Playlist</h2>
    <Playlist />
  </div>
</template>

<script>
import Playlist from '@/components/Playlist.vue';

export default {
  name: 'PlaylistView',
  components: { Playlist },
};
</script>