<template>
  <div>
    <SongItem :song="song" />
    <Rating />
    <CommentSection />
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue';
import Rating from '@/components/Rating.vue';
import CommentSection from '@/components/CommentSection.vue';

export default {
  name: 'SongView',
  components: { SongItem, Rating, CommentSection },
  data() {
    return {
      song: { title: 'Sample Song', artist: 'Sample Artist' },
    };
  },
};
</script>