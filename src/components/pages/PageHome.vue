<template>
  <b-row>
    <b-col>
      <b-row class="sticky-top bg-white page-header">
        <b-col class="px-3 border-bottom">
          <h5 class="text-uppercase my-3">{{ $t("general.home") }}</h5>
        </b-col>
      </b-row>
      <div class="box-become">
        <div class="inner-box"><p class="p-inner">
          <span class="span-box" style="">Welcome to Fanse 👋</span><br>Start Converting your Fans into <br> Paid followers</p>
          <div style="flex: 1 1 0%;">
            <a class="a-box" tabindex="0" href="/payout">Become a creator</a></div></div></div>
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
<style scoped>
.box-become{
  background: linear-gradient(95.92deg, rgb(28 115 203) 0%, rgb(29 111 194) 20.05%, rgb(61 133 205) 100%);
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 8%) 0px 4px 10px;
    margin-bottom: 8px;
    padding: 10px;
    margin-top: 10px;
}
.inner-box{
  width: 100%;
    -webkit-box-align: center;
    align-items: center;
    display: inline;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    text-align: -webkit-center !important;

        
}
.p-inner{
  flex: 1 1 0%;
    margin: 10px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: rgb(255, 255, 255);
    text-align: initial;
}
.span-box{
  margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: inherit;
    font-weight: bold;
}
.a-box{
    border: none;
    margin: 8px 0px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.75;
    min-width: 64px;
    width: 90%;
    box-shadow: none;
    border-radius: 25px;
    text-transform: initial;
    white-space: nowrap;
    letter-spacing: 0.025em;
    font-weight: 700;
    transition: color 0.01s ease 0s;
    height: 48px;
    font-size: 1rem;
    padding: 6px 24px;
    background: #fff;
    color: #2196f3;
}
@media (max-width:720px){
.p-inner{
text-align: -webkit-center !important;
}
.inner-box{
display: inherit;
}
  
}
</style>
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
