<template>
  <div>
    <h3>{{ song.title }}</h3>
    <p>{{ song.artist }}</p>
  </div>
</template>

<script>
export default {
  name: 'SongItem',
  props: {
    song: Object,
  },
};
</script>