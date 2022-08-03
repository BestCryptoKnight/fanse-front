<template>
  <b-row class="subscriptions">
    <b-col>
      <b-row class="border-bottom sticky-top page-header bg-white">
        <div class="d-flex align-items-center w-100 mx-3">
          <h5 class="text-uppercase p-0 my-3 flex-grow-1">
            {{ $t("admin.subscriptions") }}
          </h5>
          <b-nav pills>
            <b-nav-item
              to="/admin/subscriptions"
              exact
              exact-active-class="active"
              >{{ $t("admin.all") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/subscriptions/active"
              exact
              exact-active-class="active"
              >{{ $t("admin.active") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/subscriptions/cancelled"
              exact
              exact-active-class="active"
              >{{ $t("admin.cancelled") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/subscriptions/expired"
              exact
              exact-active-class="active"
              >{{ $t("admin.expired") }}</b-nav-item
            >
          </b-nav>
        </div>
      </b-row>
      <b-row>
        <b-table
          id="table"
          hover
          ref="table"
          responsive
          :items="loadSubs"
          :fields="fields"
          per-page="0"
          :current-page="page"
          class="small nowrap"
        >
          <template #cell(user)="data">
            <b-link :to="data.item.user.url">{{
              data.item.user.username
            }}</b-link>
          </template>
          <template #cell(creator)="data">
            <b-link :to="data.item.sub.url">{{
              data.item.sub.username
            }}</b-link>
          </template>

          <template #cell(status)="data">
            <span class="status" :class="data.item.status">{{
              $t("admin." + data.item.status)
            }}</span>
          </template>

          <template #cell(actions)="data">
            <b-button
              @click.prevent="resume(data.item)"
              variant="primary"
              size="sm"
              class="mr-1"
              v-if="data.item.isCancelled"
              >{{ $t("admin.resume") }}</b-button
            >
            <b-button
              @click.prevent="cancel(data.item)"
              variant="secondary"
              size="sm"
              class="mr-1"
              v-if="data.item.isActive"
              >{{ $t("admin.cancel") }}</b-button
            >
            <b-button
              @click.prevent="del(data.item)"
              variant="danger"
              size="sm"
              v-if="!data.isExpired"
              >{{ $t("general.delete") }}</b-button
            >
          </template>
        </b-table>
      </b-row>
      <b-row class="text-center m-3 d-block" v-if="total > 0">
        <b-pagination
          align="center"
          v-model="page"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="table"
        ></b-pagination>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.status {
  font-weight: bold;
  &.active {
    color: $primary;
  }
  &.expired {
    color: $danger;
  }
  &.cancelled {
    color: $secondary;
  }
}
</style>
<script>
import Subscription from "../../models/Subscription";
export default {
  data: function () {
    return {
      page: 1,
      total: 0,
      perPage: 1,
      fields: [
        { key: "user", label: this.$t("admin.user") },
        { key: "creator", label: this.$t("admin.creator") },
        { key: "status", label: this.$t("admin.status"), tdClass: "full" },
        {
          key: "created_at",
          label: this.$t("admin.created"),
          formatter: (v) => {
            return v.format("lll");
          },
          tdClass: "full",
        },
        {
          key: "expires",
          label: this.$t("admin.expires"),
          formatter: (v) => {
            return v.format("lll");
          },
          tdClass: "full",
        },
        {
          key: "total",
          label: this.$t("general.total"),
          formatter: (v) => {
            return this.$formatAmount(v);
          },
        },
        {
          key: "fee",
          label: this.$t("general.fee"),
          formatter: (v) => {
            return this.$formatAmount(v);
          },
        },
        { key: "actions", label: this.$t("admin.actions"), tdClass: "full" },
      ],
    };
  },
  watch: {
    type() {
      this.reset();
    },
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
  },
  methods: {
    check(info) {
      console.log(info);
      return "";
    },
    reset() {
      this.page = 1;
      this.$refs.table.refresh();
    },
    loadSubs(ctx, callback) {
      let url = "/subscriptions/list";
      if (this.type) {
        url += "/" + this.type;
      }
      url += "?page=" + ctx.currentPage;
      this.$aGet(
        url,
        (data) => {
          let subs = [];
          for (let obj of data.data) {
            const sub = new Subscription(obj);
            sub.total = obj.total;
            sub.fee = obj.fee;
            subs.push(sub);
          }
          this.total = data.total;
          this.perPage = data.per_page;
          callback(subs);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del(sub) {
      this.$aPost(
        "/subscriptions/" + sub.id,
        {
          _method: "DELETE",
        },
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    cancel(sub) {
      this.$aPost(
        "/subscriptions/" + sub.id,
        {
          _method: "PUT",
        },
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    resume(sub) {
      this.$aPost(
        "/subscriptions/" + sub.id,
        {},
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
