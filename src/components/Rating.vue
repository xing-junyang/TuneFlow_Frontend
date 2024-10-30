<template>
  <div>
    <span v-for="star in 5" :key="star" @click="rate(star)">&#9733;</span>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  methods: {
    rate(star) {
      console.log('Rated:', star);
    },
  },
};
</script>