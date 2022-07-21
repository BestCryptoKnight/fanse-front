<template>
  <div class="spinner">
    <b-spinner variant="secondary" />
  </div>
</template>
<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<script>
import Post from "../models/Post";
import User from "../models/User";
export default {
  mounted() {
    this.processPayment();
  },
  methods: {
    processPayment() {
      this.$post(
        "/process/" + this.$route.params.gateway,
        this.$route.query,
        (data) => {
          if (data.post) {
            let post = new Post(data.post);
            this.$router.replace(post.url);
          } else if (data.user) {
            let user = new User(data.user);
            this.$router.replace(user.url);
          } else if (data.message) {
            let user = new User(data.message.user);
            this.$router.replace("/messages/" + user.id);
          } else if (data.tip) {
            this.$router.replace("/messages/" + data.tip.to.id);
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
