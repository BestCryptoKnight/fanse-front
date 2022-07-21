<template>
  <b-row class="list" v-if="list != null">
    <b-col>
      <b-row class="border-bottom sticky-top page-header bg-white">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ list.title }}
          </h5>
        </div>
      </b-row>
      <b-row class="users">
        <b-col
          lg="4"
          md="6"
          sm="12"
          v-for="(item, index) in users"
          :key="index"
          class="col"
        >
          <ui-user :user="item" />
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
</style>
<script>
import List from "../models/List";
import User from "../models/User";
import UiUser from "../ui/UiUser.vue";
export default {
  components: { UiUser },
  data: function () {
    return {
      list: null,
      users: [],
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
      let users = [...this.users];
      this.$get(
        "/lists/" + this.$route.params.id + "?page=" + this.page,
        (data) => {
          this.list = new List(data.list, this);
          for (let u of data.users.data) {
            users.push(new User(u));
          }
          this.users = users;
          this.hasMore = data.users.next_page_url != null;
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
  },
};
</script>
