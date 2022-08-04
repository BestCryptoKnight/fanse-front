<template>
  <b-row>
    <b-col>
      <b-row class="sticky-top bg-white page-header">
        <b-col class="px-3 border-bottom">
          <h5 class="text-uppercase my-3">{{ $t("general.home") }}</h5>
        </b-col>
      </b-row>
      <div class="display-mobile">
        <app-suggestions/>
      </div>
      
      <ui-posts v-model="posts" />
    </b-col>
  </b-row>
</template>
<style scoped>
.display-mobile {
  display: none;
}
@media only screen and (max-width: 600px) {
  .display-mobile {
    display: block;
  }
}
</style>
<script>
import Post from "../models/Post";
import UiPosts from "../ui/UiPosts.vue";
import AppSuggestions from "./AppSuggestions.vue";
export default {
  data: function () {
    return {
      posts: [],
      page: 1,
      hasMore: false,
      isLoading: false,
    };
  },
  mounted() {
    this.loadPosts();
    window.addEventListener("scroll", this.updateScroll);
  },
  components: {
    UiPosts,
    AppSuggestions,
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
    loadPosts() {
      if (this.page == 1) {
        this.$showSpinner();
      }
      this.isLoading = true;
      this.$get(
        "/posts?page=" + this.page,
        (data) => {
          let posts = [...this.posts];
          for (let obj of data.data) {
            if (obj.has_access !=false || obj.user.username == 'fanse' || obj.user.username == this.$store.state.currentUser.username){
              posts.push(new Post(obj));
            }            
          }
          this.posts = posts;
          this.hasMore = data.next_page_url != null;
          this.isLoading = false;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadPosts();
      }
    },
  },
};
</script>
