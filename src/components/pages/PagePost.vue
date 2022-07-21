<template>
  <b-row v-if="post != null" class="post">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link to="/">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2">
            {{ $t("general.post") }}
          </h5>
        </div>
      </b-row>
      <b-row v-if="post != null">
        <ui-post v-model="post" @del="del" />
        <ui-comments :postId="post.id" v-if="post.hasAccess" />
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import Post from "../models/Post";
import UiPost from "../ui/UiPost.vue";
import UiComments from "../ui/UiComments.vue";
export default {
  data: function () {
    return {
      post: null,
    };
  },
  components: {
    UiPost,
    UiComments,
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      this.$get(
        "/posts/" + this.$route.params.id,
        (data) => {
          this.post = new Post(data);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del() {
      this.$router.replace("/");
    },
  },
};
</script>
