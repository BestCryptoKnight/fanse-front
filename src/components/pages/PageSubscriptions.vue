<template>
  <b-row class="subscriptions">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.subscriptions") }}
          </h5>
        </div>
      </b-row>
      <div v-if="subs[0] == null && !isLoading " class="empty-section"> No subscriptions yet!</div>
      <b-row class="users">
        <b-col
          lg="4"
          md="6"
          sm="12"
          v-for="(item, index) in subs"
          :key="index"
          class="col"
        >
          <ui-user
            :user="item.sub"
            :subscription="item"
            @unsubscribe="unsubscribe"
            @subscribe="subscribe"
          />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  
</template>
<style scoped lang="scss">
.users {
  padding: 0 0.5rem;
  .col {
    padding: 1rem 0.5rem 0 0.5rem;
    border-left: 1rem transparent;
  }
}
.empty-section{
   text-align: center;margin-top: 20%;font-weight: bold;color: #8a96a3c4;font-size: 1.2rem;line-height: 1.4rem;font-weight: 500;
}
</style>
<script>
import Subscription from "../models/Subscription";
import UiUser from "../ui/UiUser.vue";
export default {
  components: { UiUser },
  data: function () {
    return {
      subs: [],
      page: 1,
      hasMore: false,
      isLoading: false,
    };
  },
  mounted() {
    this.loadList();
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
    loadList() {
      this.isLoading = true;
      let subs = [...this.subs];
      if (this.page == 1) {
        this.$showSpinner();
      }
      this.$get(
        "/subscriptions?page=" + this.page,
        (data) => {
          for (let s of data.subs.data) {
            subs.push(new Subscription(s));
          }
          this.subs = subs;
          this.hasMore = data.subs.next_page_url != null;
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
        this.loadList();
      }
    },
    unsubscribe(subscription) {
      this.$post(
        "/subscriptions/" + subscription.sub.id,
        { _method: "DELETE" },

        (data) => {
          let subs = [...this.subs];
          let sub = data.status ? new Subscription(data.subscription) : null;
          let valid = [];
          for (let i in subs) {
            if (subs[i].id == subscription.id) {
              if (sub) {
                subs[i] = sub;
              } else {
                continue;
              }
            }
            else {valid.push(subs[i]);}
          }
          this.subs = valid;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    subscribe(subscription) {
      this.$post(
        "/subscriptions/" + subscription.sub.id,
        {},

        (data) => {
          let subs = [...this.subs];
          let sub = new Subscription(data);
          for (let i in subs) {
            if (subs[i].id == subscription.id) {
              if (sub) {
                subs[i] = sub;
                break;
              }
            }
          }
          this.subs = subs;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
