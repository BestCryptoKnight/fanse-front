<template>
  <div>
    <b-row
        class="px-3 mt-3 d-block border-bottom pb-3"
        v-if="!user.isSubscribed && !isOwner"
      >
        <h5 class="mb-3">{{ $t("general.subscription") }}</h5>
        <b-button variant="primary" block @click.prevent="subscribe">
          {{
            $t("general.subscribe-for-x", [
              user.isFree ? $t("general.free") : user.priceFormatted,
            ])
          }}
        </b-button>
      </b-row>
      <b-row
        class="px-3 mt-3 d-block border-bottom pb-3"
        v-if="
          !isOwner &&
          !user.isSubscribed &&
          !user.isFree &&
          user.bundles.length > 0
        "
      >
        <h5 class="mb-3">{{ $t("general.subscription-bundles") }}</h5>
        <b-button
          variant="primary"
          block
          @click.prevent="subscribe(item)"
          v-for="(item, index) in user.bundles"
          :key="index"
        >
          {{ $t("general.get-x-months-for-y-z-off", item.title(user)) }}
        </b-button>
      </b-row>
  </div>
</template>
<script>
import Post from "../models/Post";
import User from "../models/User";
import UiPosts from "../ui/UiPosts.vue";
import Payment from "../models/Payment";
import UiUsername from "../ui/UiUsername.vue";
export default {
  components: { UiPosts, UiUsername },
  data: function () {
    return {
      user: null,
      posts: [],
      scrollPosition: null,
      page: 1,
      hasMore: false,
      isLoading: false,
      rnd: Math.random(),
      postsType: Post.TYPE_ACTIVE,
    };
  },
  computed: {
    isScrolled: function () {
      return this.scrollPosition >= 180;
    },
    isOwner: function () {
      return this.user.id == this.$store.state.currentUser.id;
    },
    username: function () {
      return this.$route.params.username;
    },
    types: function () {
      return {
        active: Post.TYPE_ACTIVE,
        scheduled: Post.TYPE_SCHEDULED,
        expired: Post.TYPE_EXPIRED,
      };
    },
  },
  watch: {
    username: function (oldV, newV) {
      if (oldV && newV && oldV != newV) {
        this.reset();
        this.loadUser();
      }
    },
  },
  mounted() {
    this.loadUser();
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    updatePosts(type) {
      this.postsType = type;
      this.reset();
      this.loadPosts();
    },
    reset() {
      this.isLoading = false;
      this.hasMore = false;
      this.page = 1;
      this.posts = [];
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
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
    loadUser() {
      this.$get(
        "/users/" + this.username,
        (data) => {
          this.user = new User(data);
          this.loadPosts();
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
          this.user.id +
          "?page=" +
          this.page +
          "&type=" +
          this.postsType,
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
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadPosts();
      }
    },
    copyLink() {
      const link = `${process.env.VUE_APP_APP_URL}${this.user.url}`;
      this.$copyText(link);
      this.$bvToast.toast(this.$t("general.link-copied"), {
        autoHideDelay: 2000,
        title: this.$t("general.link"),
        solid: true,
        toaster: "b-toaster-bottom-left",
      });
    },
    addToList(user) {
      this.$store.state.addToListUser = user;
    },
    subscribe(bundle) {
      if (this.user.isFree) {
        this.$post(
          "/subscribe/" + this.user.id,
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
          user: this.user,
          bundle: bundle,
        });
      }
    },
    tip() {
      this.$buyItem({
        type: Payment.TYPE_TIP,
        user: this.user,
      });
    },
  },
};
</script>
