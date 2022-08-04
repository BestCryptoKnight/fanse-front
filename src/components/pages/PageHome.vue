<template>
  <b-row>
    <b-col>
      <b-row class="sticky-top bg-white page-header">
        <b-col class="px-3 border-bottom">
          <h5 class="text-uppercase my-3">{{ $t("general.home") }}</h5>
        </b-col>
      </b-row>
      <div v-if="isMobile()" ref="swiper" class="swiper w-100 overflow-hidden" style="margin-top:15px;">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide d-block"
            v-for="(item, key) in chunkedArr"
            :key="key"
          >
            <ui-suggestion
              :user="user"
              v-for="(user, k) in item"
              :key="k"
              class="mb-2"
            />
          </div>
        </div>
      </div>
      <ui-posts v-model="posts" />
    </b-col>
  </b-row>
</template>
<script>
import { Swiper } from "swiper";
import "swiper/swiper-bundle.css";
import User from "../models/User";
import Post from "../models/Post";
import UiPosts from "../ui/UiPosts.vue";
import UiSuggestion from "../ui/UiSuggestion.vue";
export default {
  data: function () {
    return {
      posts: [],
      page: 1,
      hasMore: false,
      isLoading: false,
      users: [],
      swiper: null,
    };
  },
  components: {
    UiPosts,
    UiSuggestion,
  },
  mounted() {
    this.loadPosts();
    window.addEventListener("scroll", this.updateScroll);
     this.swiper = new Swiper(this.$refs.swiper, {
      // Optional parameters
      direction: "horizontal",
    });
    this.loadSuggestions();
  },
  computed: {
    chunkedArr() {
      const result = [];
      for (let i = 0; i < this.users.length; i += 2)
        result.push(this.users.slice(i, i + 2));
      return result;
    },
  },
  methods: {
    loadSuggestions() {
      this.$get(
        "/users",
        (data) => {
          let users = [];
          for (let obj of data.users) {
            if (obj.role == 1){
              users.push(new User(obj));
            }
          }
          this.users = users;
          this.$nextTick(function () {
            this.swiper.update();
          });
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    slideLeft() {
      this.swiper.slidePrev();
    },
    slideRight() {
      this.swiper.slideNext();
    },
    isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true
    } else {
     return false
     }
   },
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
