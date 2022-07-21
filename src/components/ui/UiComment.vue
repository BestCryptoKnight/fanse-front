<template>
  <div v-if="comment != null" class="d-flex w-100 px-3 py-2 mb-2 wrap">
    <b-avatar
      :text="comment.user.initials"
      :src="comment.user.avatar"
      :to="comment.user.url"
      class="bg-secondary text-white"
    />
    <div class="flex-grow-1 mx-2 overflow-hidden">
      <div>
        <ui-username :user="comment.user" />
        <span class="nl2br" v-html="comment.messageParsed" />
      </div>
      <div class="d-flex small">
        <div class="text-muted mr-2">{{ comment.ago }}</div>
        <div class="mr-2" v-if="comment.likesCount > 0">
          {{ $t("general.x-likes", [comment.likesCount]) }}
        </div>
        <a href="#" @click.prevent="reply" class="mr-2">{{
          $t("general.reply")
        }}</a>
        <a href="#" @click.prevent="del" v-if="isOwner">{{
          $t("general.delete")
        }}</a>
      </div>
    </div>
    <a class="small" href="#" @click.prevent="like">
      <i class="bi-heart" v-if="comment.isLiked === false" />
      <i class="bi-heart-fill" v-else />
    </a>
  </div>
</template>
<script>
import Comment from "../models/Comment";
import UiUsername from "./UiUsername.vue";
export default {
  components: { UiUsername },
  props: {
    value: Comment,
  },
  computed: {
    comment: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    isOwner: function () {
      return (
        this.$store.state.currentUser.isAdmin ||
        (this.value && this.value.user.id == this.$store.state.currentUser.id)
      );
    },
  },
  methods: {
    reply() {
      this.$emit("reply", this.comment);
    },
    like() {
      this.$post(
        "/comments/" + this.comment.id + "/like",
        {},

        (data) => {
          this.comment.isLiked = data.is_liked;
          this.comment.likesCount = data.likesCount;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del() {
      this.$post(
        "/comments/" + this.comment.id,
        {
          _method: "DELETE",
        },
        () => {
          this.comment = null;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
