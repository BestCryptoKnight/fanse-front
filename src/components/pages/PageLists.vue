<template>
  <b-row class="lists">
    <b-col>
      <b-row class="border-bottom sticky-top page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.lists") }}
          </h5>
        </div>
      </b-row>
      <b-row
        v-for="(item, index) in lists"
        :key="index"
        class="d-block border-bottom"
      >
        <b-link :to="'/lists/' + item.id" class="p-3 d-block">
          <div class="font-weight-bold">{{ item.title }}</div>
          <div class="small text-muted">
            {{ $tc("general.x-people", [item.listeesCount]) }}
          </div>
        </b-link>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
.lists {
  a {
    text-decoration: none;
    color: var(--dark);
    &:hover {
      color: var(--dark);
      text-decoration: none;
      background: var(--light);
    }
  }
}
</style>
<script>
import List from "../models/List";
export default {
  data: function () {
    return {
      lists: [],
    };
  },
  mounted() {
    this.loadLists();
  },
  methods: {
    loadLists() {
      let lists = [];
      this.$get(
        "/lists",
        (data) => {
          for (let l of data.lists) {
            lists.push(new List(l, this));
          }
          this.lists = lists;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
