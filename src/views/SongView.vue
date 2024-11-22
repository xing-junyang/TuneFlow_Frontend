<template>
  <div>
    <SongItem :song="song" />
    <RatingComponent />
    <CommentSection />
  </div>
</template>

<script>
import SongItem from '@/components/SongItem.vue';
import RatingComponent from '@/components/Rating.vue';
import CommentSection from '@/components/CommentSection.vue';

export default {
  name: 'SongView',
  components: { SongItem, RatingComponent, CommentSection },
  data() {
    return {
      song: { title: 'Sample Song', artist: 'Sample Artist' },
    };
  },
};
</script>