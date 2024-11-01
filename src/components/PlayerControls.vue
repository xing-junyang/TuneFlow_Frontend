<template>
  <div>
    <!-- 播放、暂停、上一曲、下一曲按钮 -->
    <button @click="play">Play</button>
    <button @click="pause">Pause</button>
    <button @click="previous">Previous</button>
    <button @click="next">Next</button>
  </div>
</template>

<script>
export default {
  name: 'PlayerControls',
  methods: {
    play() {},
    pause() {},
    previous() {},
    next() {},
  },
};
</script>