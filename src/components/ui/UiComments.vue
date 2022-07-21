<template>
  <div class="comments w-100">
    <div class="list" v-if="comments.length > 0">
      <ui-comment
        v-for="(item, index) in comments"
        :key="index"
        v-model="comments[index]"
        @reply="reply"
      />
    </div>
    <div
      class="w-100 bg-light px-3 py-2 sticky-bottom border-top commentForm"
      ref="commentForm"
    >
      <b-form inline class="w-100 align-items-start">
        <b-avatar
          :text="currentUser.initials"
          :src="currentUser.avatar"
          class="bg-secondary text-white"
        />

        <div class="flex-grow-1 mx-2">
          <b-form-textarea
            class="w-100"
            max-rows="3"
            rows="1"
            v-model="message"
            :placeholder="$t('general.add-a-comment')"
            no-resize
          />
        </div>

        <b-button
          variant="icon"
          class="p-0"
          @click.prevent="submitComment"
          :disabled="message.length == 0"
        >
          <i
            class="bi-arrow-right-circle-fill"
            style="font-size: 200%; line-height: 1"
          />
        </b-button>
      </b-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/assets/scss/_variables.scss";
.comments {
  textarea {
    border: none;
    scroll-behavior: smooth;
    background-color: transparent;
    padding-left: 0;
    padding-right: 0;
    &:focus {
      background-color: transparent;
      border: none;
      box-shadow: none;
    }
  }
}
@include media-breakpoint-down(xs) {
  .comments {
    .sticky-bottom {
      bottom: 4rem;
    }
  }
}
</style>
<script>
import UiComment from "./UiComment.vue";
import Comment from "../models/Comment";
export default {
  components: { UiComment },
  data: function () {
    return {
      comments: [],
      message: "",
      replyTo: null,
      page: 1,
      hasMore: false,
      isLoading: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  props: {
    postId: Number,
  },
  mounted() {
    this.loadComments();
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updateScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      if (
        document.body.offsetHeight &&
        scrollPosition &&
        document.body.offsetHeight - scrollPosition <= 1000 &&
        !this.isLoading &&
        this.hasMore
      ) {
        this.loadMore();
      }
    },
    loadComments() {
      this.isLoading = true;
      this.$get(
        "/comments/" + this.postId + "?page=" + this.page,
        (data) => {
          const comments = [...this.comments];
          for (let d of data.data) {
            comments.push(new Comment(d));
          }
          this.comments = comments;
          this.isLoading = false;
          this.hasMore = data.next_page_url != null;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadComments();
      }
    },
    submitComment() {
      this.$post(
        "/comments/" + this.postId,
        {
          message: this.message,
        },
        (data) => {
          const comments = [...this.comments];
          comments.push(new Comment(data));
          this.comments = comments;
          this.message = "";
          this.replyTo = null;
          this.$nextTick(function () {
            scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          });
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    reply(comment) {
      this.replyTo = comment;
      this.message = "@" + comment.user.username + ", " + this.message;
    },
    unreply() {
      this.replyTo = null;
    },
  },
};
</script>
