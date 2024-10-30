<template>
  <div>
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in comments" :key="comment.id">{{ comment.text }}</li>
    </ul>
    <input v-model="newComment" placeholder="Add a comment" />
    <button @click="addComment">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'CommentSection',
  data() {
    return {
      comments: [],
      newComment: '',
    };
  },
  methods: {
    addComment() {
      this.comments.push({ text: this.newComment, id: Date.now() });
      this.newComment = '';
    },
  },
};
</script>