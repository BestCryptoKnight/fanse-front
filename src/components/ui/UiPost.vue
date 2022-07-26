<template>
  <div class="post w-100 border-bottom" v-if="post != null">
    <div class="d-flex p-3 w-100 align-items-start nowrap">
      <b-avatar
        :text="post.user.initials"
        :src="post.user.avatar"
        :to="post.user.url"
        class="bg-secondary text-white"
      />

      <div class="flex-grow-1 px-2 overflow-hidden d-block align-items-center">
        <ui-username :user="post.user" />
        <b-link
          :to="'/' + post.user.username"
          class="small text-secondary username d-block small-username" 
          >@{{ post.user.username }}
        </b-link>
      </div>

      <div class="d-flex align-items-center">
        <div class="text-muted mr-3">{{ post.ago }}</div>
        <b-dropdown no-caret right variant="link">
          <template slot="button-content"><i class="bi-three-dots" /></template>
          <b-dropdown-item @click.prevent="copyLink">{{
            $t("general.copy-link-to-post")
          }}</b-dropdown-item>
          <b-dropdown-item @click.prevent="addToList(post.user)">{{
            $t("general.add-to-list")
          }}</b-dropdown-item>
          <b-dropdown-divider v-if="isOwner"></b-dropdown-divider>
          <b-dropdown-item :to="'/posts/edit/' + post.id" v-if="isOwner">{{
            $t("general.edit")
          }}</b-dropdown-item>
          <b-dropdown-item @click.prevent="del" v-if="isOwner">{{
            $t("general.delete")
          }}</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <b-card no-body no-footer class="poll m-3" v-if="post.poll.length > 0">
      <b-list-group flush>
        <b-list-group-item
          v-for="(poll, index) in post.poll"
          :key="index"
          href="#"
          @click.prevent="vote(poll.id)"
          class="item"
        >
          <div class="title d-flex align-items-center">
            <div class="flex-grow-1">{{ poll.option }}</div>
            <div class="votes text-muted small" v-if="post.hasVoted">
              {{ poll.votes_count }}
            </div>
          </div>
          <div class="percent p-1">
            <div
              :style="'width: ' + calcPercent(poll.id) + '%'"
              class="rounded"
            />
          </div>
        </b-list-group-item>
      </b-list-group>
      <b-card-footer>{{ $tc("general.x-votes", [totalVotes]) }}</b-card-footer>
    </b-card>
    <div class="px-3 pb-3 w-100 overflow-hidden nl2br wrap">
      {{ post.message }}
    </div>
    <div class="media" v-if="post.media.length > 0 && hasAccess">
      <div ref="swiper" class="swiper w-100" v-if="post.media.length > 1">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide w-100"
            v-for="(item, key) in post.media"
            :key="key"
          >
            <img 
              v-if="item.type == 0"
              :src="item.url"
              @click.prevent="$showPhotoSwipe(post.media, item.id)"
              onContextMenu="return false;" 
            />
            <div v-else-if="item.type == 1" class="video w-100">
              <video
                ref="video"
                data-video-instance
                class="video-js vjs-big-play-centered"
                controls
                preload="metadata"
                playsinline
                controlsList="nodownload"
                :poster="item.screenshot"
              >
                <source :src="item.url" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="w-100">
        <img onContextMenu="return false;" 
          v-if="post.media[0].type == 0"
          :src="post.media[0].url"
          @click.prevent="$showPhotoSwipe(post.media, 0)"
         
        />
        <div v-else-if="post.media[0].type == 1" class="video w-100">
          <video
            ref="video"
            data-video-instance
            class="video-js vjs-big-play-centered"
            controls
            preload="metadata"
            playsinline
            controlsList="nodownload"
            :poster="post.media[0].screenshot"
          >
            <source :src="post.media[0].url" type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        v-if="post.media.length > 1"
        class="switcher rounded text-white px-2 py-1 small"
      >
        <i class="bi-image" /> <span class="current">{{ slide }}</span
        >/{{ post.media.length }}
      </div>
    </div>
    <div class="bg-light w-100" v-else-if="!hasAccess">
      <b-aspect aspect="4:3">
        <div class="w-100 h-100 position-relative">
          <div class="d-flex align-items-center h-100">
            <div class="mx-auto">
              <i
                class="bi-lock-fill align-self-center text-muted"
                style="font-size: 300%; line-height: 1"
              />
              <div class="d-flex text-muted small justify-content-center mt-2">
                <div class="mr-1" v-if="post.images > 0">
                  <i class="bi-image" /> {{ post.images }}
                </div>
                <div class="ml-1" v-if="post.videos > 0">
                  <i class="bi-camera-video" /> {{ post.videos }}
                </div>
              </div>
            </div>
          </div>
         
          
       <div v-if="post.user.price<1"
            class="position-absolute p-3"
            style="bottom: 0; left: 0; right: 0"
          >
            <!-- <b-button variant="primary" block @click.prevent="subscribe">{{
              post.isFree
                ? $t("general.subscribe-to-see")
                : $t("general.unlock-post-for-x", [post.priceFormatted])
            }}</b-button> -->
          </div> 
           <div v-if="post.user.price>1"
            class="position-absolute p-3"
            style="bottom: 0; left: 0; right: 0"
          >
            <b-button variant="primary" block @click.prevent="unlock">{{
              post.isFree
                ? $t("general.subscribe-to-see")
                : $t("general.unlock-post-for-x", [post.priceFormatted])
            }}</b-button>
          </div> 
          
        </div>
      </b-aspect>
    </div>
    <div class="d-flex align-items-center py-2 w-100">
      <b-link
        href="#"
        class="ml-3 mr-2"
        @click.prevent="like"
        :disabled="!hasAccess"
      >
        <i class="bi-heart" v-if="post.isLiked === false" />
        <i class="bi-heart-fill" v-else />
      </b-link>
      <b-link class="mx-2" :to="post.url" :disabled="!hasAccess">
        <i class="bi-chat" />
      </b-link>
      <b-link
        class="mx-2 nounderline"
        :disabled="!hasAccess"
        @click.prevent="tip"
        v-if="!isOwner"
      >
        <i class="bi-coin" /> {{ $t("general.send-tip") }}
      </b-link>
      <b-link href="#" class="ml-2 mr-3 ml-auto" @click.prevent="bookmark">
        <i class="bi-bookmark" v-if="post.isBookmarked === false" />
        <i class="bi-bookmark-fill" v-else />
      </b-link>
    </div>
    <div class="d-flex align-items-center pb-2 small px-3">
      <div>
        {{ $t("general.x-likes", [post.likesCount]) }}
      </div>
      <i class="bi-dot" />
      <b-link :to="post.url" :disabled="!hasAccess">
        {{ $t("general.x-comments", [post.commentsCount]) }}
      </b-link>
    </div>
  </div>
</template>
<style lang="scss">
@import "~@/assets/scss/_variables.scss";
.post {
  .dropdown {
    .btn {
      padding: 0;
    }
  }
  .switcher {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
  .poll {
    .item {
      position: relative;
      .percent {
        z-index: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        & > div {
          background-color: lighten($primary, 40%);
          height: 100%;
          transition: width 0.5s ease-in-out;
        }
      }
      .title {
        position: relative;
        z-index: 1;
      }
    }
  }
  .media {
    max-height: calc(100vh - 100px);
    text-align: center;
    overflow: hidden;
    position: relative;
    .swiper-slide {
      height: unset;
    }
    img {
      cursor: pointer;
      width: 100%;
      display: inline-block;
      max-height: calc(100vh - 100px);
      -o-object-fit: cover;
      object-fit: cover;
      position: relative;
      z-index: 1;
    }
    .video {
      transform: unset;
      top: 0;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      max-height: calc(100vh - 100px);
      position: relative;
      background: #000;
      overflow: hidden;
      z-index: 1;
      .video-js {
        height: 100% !important;
        .vjs-tech {
          height: 100% !important;
        }
      }
    }
  }
}
</style>
<script>
import { Swiper } from "swiper";
import "swiper/swiper-bundle.css";
import videojs from "video.js";
import User from "../models/User";
import "video.js/dist/video-js.css";
import Post from "../models/Post";
import Payment from "../models/Payment";
import UiUsername from "./UiUsername.vue";
export default {
  components: { UiUsername },
  data: function () {
    return {
      slide: 1,
      players: [],
    };
  },
  props: {
    value: Post,
  },
  computed: {
    post: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    username: function () {
      return this.$route.params.username;
    },
    isOwner: function () {
      return (
        this.$store.state.currentUser.isAdmin ||
        (this.value && this.value.user.id == this.$store.state.currentUser.id)
      );
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    hasAccess: function () {
      return this.$store.state.currentUser.isAdmin || this.post.hasAccess;
    },
    totalVotes() {
      let total = 0;
      for (let p of this.value.poll) {
        total += p.votes_count;
      }
      return total;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    username: function (oldV, newV) {
      if (oldV && newV && oldV != newV) {
        this.reset();
        this.loadUser();
      }
    },
  },
  methods: {
    init() {
      var that = this;
      if (that.$refs.swiper) {
        let s = new Swiper(that.$refs.swiper, {
          // Optional parameters
          direction: "horizontal",
          noSwipingClass: "vjs-control",
        });
        s.on("activeIndexChange", function () {
          that.slide = this.activeIndex + 1;
        });
        s.on("slideChange", function () {
          for (let p of that.players) {
            p.pause();
          }
        });
      }
      if (that.$refs.video) {
        if (Array.isArray(that.$refs.video)) {
          for (let v of that.$refs.video) {
            that.players.push(videojs(v, {}));
          }
        } else {
          that.players.push(videojs(that.$refs.video, {}));
        }
      }
    },
    calcPercent(id) {
      if (!this.post.hasVoted) {
        return 0;
      }

      for (let p of this.post.poll) {
        if (p.id == id) {
          return Math.round((p.votes_count / this.totalVotes) * 100);
        }
      }
      return 0;
    },
    like() {
      this.$post(
        "/posts/" + this.post.id + "/like",
        {},
        (data) => {
          this.post.isLiked = data.is_liked;
          this.post.likesCount = data.likes_count;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    bookmark() {
      this.$post(
        "/bookmarks/" + this.post.id,
        {},
        (data) => {
          this.post.isBookmarked = data.is_bookmarked;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del() {
      this.$post(
        "/posts/" + this.post.id,
        {
          _method: "DELETE",
        },
        () => {
          this.$emit("del", this.post);
          this.post = null;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    copyLink() {
      const link = `${process.env.VUE_APP_APP_URL}${this.post.url}`;
      this.$copyText(link);
    },
    addToList(user) {
      this.$store.state.addToListUser = user;
    },
    vote(id) {
      if (this.post.hasVoted) {
        return;
      }
      this.$post(
        "/posts/" + this.post.id + "/" + id + "/vote",
        {},
        (data) => {
          this.post = new Post(data);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    loadPosts() {
      this.isLoading = true;
      this.$get(
        "/posts/user/" +
          this.post.user.id +
          "?page=" +
          this.page +
          "&type=0",
        (data) => {
          let posts = [...this.posts];
          for (let obj of data.data) {
            posts.push(new Post(obj));
          }
          this.posts = posts;
          this.hasMore = data.next_page_url != null;
          this.isLoading = true;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    loadUser() {
      this.$get(
        "/users/" + this.post.user.username,
        (data) => {
          this.post.user = new User(data);
          this.loadPosts();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    subscribe(bundle) {
      if (this.post.user.isFree) {
        this.$post(
          "/subscribe/" + this.post.user.id,
          {},
          () => {
            this.reset();
            this.loadUser();
          },
          (errors) => {
            console.log(errors);
          }
        );
      } else {
        this.$buyItem({
          type: Payment.TYPE_SUBSCRIPTION_NEW,
          user: this.post.user,
          bundle: bundle,
        });
      }
    },
    reset() {
      this.isLoading = false;
      this.hasMore = false;
      this.page = 1;
      this.posts = [];
    },
    unlock() {
      if (this.post.isFree) {
        this.$buyItem({
          type: Payment.TYPE_SUBSCRIPTION_NEW,
          user: this.post.user,
        });
      } else {
        this.$buyItem({
          type: Payment.TYPE_POST,
          post: this.post,
          success: (data) => {
            this.post = new Post(data);
            this.$nextTick(() => {
              this.init();
            });
          },
        });
      }
    },
    tip() {
      this.$buyItem({
        type: Payment.TYPE_TIP,
        post: this.post,
        user: this.post.user,
      });
    },
  },
};
</script>
