<template>
  <b-row>
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.notifications") }}
          </h5>
        </div>
      </b-row>
      <b-row
        v-for="(item, index) in notifications"
        :key="index"
        class="border-bottom"
      >
        <b-link class="d-flex w-100 link p-3" :to="item.url">
          <i
            class="bi-dot mt-1 ml-n2 text-primary"
            style="font-size: 200%; line-height: 1"
            v-if="!item.isViewed"
          />
          <b-avatar
            :to="item.items.user.url"
            :text="item.items.user.initials"
            :src="item.items.user.avatar + '?rnd=' + rnd"
          />
          <div class="flex-grow-1 ml-2 overflow-hidden">
            <div class="d-flex nowrap w-100">
              <ui-username
                :user="item.items.user"
                :full="true"
                class="overflow-hidden flex-grow-1"
              />
              <div class="text-muted small">{{ item.ago }}</div>
            </div>
            <div class="description wrap">
              {{ $t(item.description[0], item.description[1]) }}
            </div>
          </div>
        </b-link>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.link {
  color: $black;
  text-decoration: none;
  &:hover {
    color: $black;
    text-decoration: none;
    background-color: var(--light);
  }
}
</style>
<script>
import Notification from "../models/Notification";
import UiUsername from "../ui/UiUsername.vue";
export default {
  components: { UiUsername },
  data: function () {
    return {
      notifications: [],
      page: 1,
      rnd: Math.random(),
      hasMore: false,
      isLoading: false,
    };
  },
  mounted() {
    this.loadNotifications();
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
    loadNotifications() {
      this.isLoading = true;
      if (this.page == 1) {
        this.$showSpinner();
      }
      this.$get(
        "/notifications?page=" + this.page,
        (data) => {
          let ns = [...this.notifications];
          for (let obj of data.data) {
            ns.push(new Notification(obj));
          }
          this.notifications = ns;
          this.hasMore = data.next_page_url != null;
          this.isLoading = false;
        },
        (errors) => {
          console.log("error");
          console.log(errors);
        }
      );
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadNotifications();
      }
    },
  },
};
</script>
