
<template>
  <b-row>
    <b-col>
      <b-row class="sticky-top bg-white page-header">
        <b-col class="px-3 border-bottom">
          <h5 class="text-uppercase my-3">{{ $t("general.home") }}</h5>
        </b-col>
      </b-row>
      <b-link :to="user.url" class="rounded suggestion w-100 bg-light d-block">
    <b-img :src="user.cover" v-if="user.cover != null" class="rounded cover" onContextMenu="return false;"  />
    <b-avatar
      :src="user.avatar"
      :text="user.initials"
      size="100px"
      class="avatar m-2"
    />
    <div class="buttons m-2">
      <b-dropdown no-caret right variant="link">
        <template slot="button-content"
          ><i class="bi-three-dots-vertical text-white"
        /></template>
        <b-dropdown-item @click.prevent="copyLink">{{
          $t("general.copy-link-to-profile")
        }}</b-dropdown-item>
        <b-dropdown-item @click.prevent="addToList(user)">{{
          $t("general.add-to-list")
        }}</b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="overflow-hidden w-100 subprofile py-2 pr-2">
      <ui-username :user="user" :asLink="false" class="text-white " style="color:white;"  />
      
      <div class="text-white small username-white d-block ">
        {{ "@" + user.username }}
      </div>
    </div>
      </b-link>
      <ui-posts v-model="posts" />
    </b-col>
  </b-row>
</template>
<script>
import User from "../models/User";
import UiUsername from "./UiUsername.vue";
export default {
  components: { UiUsername },
  props: {
    user: User,
  },
  methods: {
    copyLink() {
      const link = `${process.env.VUE_APP_APP_URL}${this.user.url}`;
      this.$copyText(link);
    },
    addToList(user) {
      this.$store.state.addToListUser = user;
    },
  },
};
</script>
<script>
import Post from "../models/Post";
import UiPosts from "../ui/UiPosts.vue";
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
