<template>
  <b-row>
    <b-col>
      <b-row class="border-bottom sticky-top page-header bg-white">
        <div class="d-flex align-items-center w-100 mx-3">
          <h5 class="text-uppercase p-0 my-3 flex-grow-1">
            {{ $t("admin.payments") }}
          </h5>
          <b-nav pills>
            <b-nav-form class="mr-2">
              <b-form-input
                :placeholder="$t('admin.search')"
                v-model="q"
                class="mr-1"
              ></b-form-input>
            </b-nav-form>
            <b-nav-item
              to="/admin/payments"
              exact
              exact-active-class="active"
              >{{ $t("admin.completed") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/payments/pending"
              exact
              exact-active-class="active"
              >{{ $t("admin.pending") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/payments/refunded"
              exact
              exact-active-class="active"
              >{{ $t("admin.refunded") }}</b-nav-item
            >
          </b-nav>
        </div>
      </b-row>
      <b-row>
        <b-table
          id="table"
          hover
          responsive
          ref="table"
          :items="loadPayments"
          :fields="fields"
          per-page="0"
          class="small nowrap"
          :current-page="page"
        >
          <template #cell(user)="data">
            <b-link :to="data.item.user.url">{{
              data.item.user.username
            }}</b-link>
          </template>
          <template #cell(to)="data">
            <b-link :to="data.item.to.url">{{ data.item.to.username }}</b-link>
          </template>

          <template #cell(actions)="data">
            <b-button
              size="sm"
              @click="data.toggleDetails"
              class="mr-1"
              variant="secondary"
            >
              {{ data.detailsShowing ? $t("admin.hide") : $t("admin.details") }}
            </b-button>
            <b-button
              @click.prevent="status(data.item, getStatus('complete'))"
              variant="primary"
              size="sm"
              class="mr-1"
              v-if="data.item.status == getStatus('pending')"
              >{{ $t("admin.complete") }}</b-button
            >
            <b-button
              @click.prevent="status(data.item, getStatus('refunded'))"
              variant="danger"
              size="sm"
              class="mr-1"
              v-if="data.item.status == getStatus('complete')"
              >{{ $t("admin.refund") }}</b-button
            >
            <b-button
              @click.prevent="del(data.item)"
              variant="danger"
              size="sm"
              class="mr-1"
              v-if="type == 'refunded'"
              >{{ $t("general.delete") }}</b-button
            >
          </template>
          <template #row-details="data">
            <b-card>
              <div class="d-flex">
                <div class="font-weight-bold mr-2">
                  {{ $t("admin.invoice-id") }}
                </div>
                <div class="mr-2">{{ data.item.hash.toUpperCase() }}</div>
                <div class="font-weight-bold mr-2">{{ $t("admin.token") }}</div>
                <div>{{ data.item.token }}</div>
              </div>

              <i18n
                :path="getDescription(data.item)"
                tag="div"
                class="border-top w-100 pt-1 mt-1"
              >
                <template v-slot:user>
                  <b-link :to="data.item.user.url">{{
                    data.item.user.username
                  }}</b-link>
                </template>
                <template v-slot:to>
                  <b-link :to="data.item.to.url">{{
                    data.item.to.username
                  }}</b-link>
                </template>
                <template v-slot:post v-if="data.item.items.post">
                  <b-link :to="data.item.items.post.url">{{
                    $t("general.post")
                  }}</b-link>
                </template>
                <template v-slot:message>
                  {{ $t("general.private-message") }}
                </template>
              </i18n>
            </b-card>
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
<style scoped>
</style>
<script>
import Payment from "../../models/Payment";
export default {
  data: function () {
    return {
      q: "",
      page: 1,
      total: 0,
      perPage: 1,
      fields: [
        {
          key: "hash",
          label: this.$t("admin.invoice-id"),
          formatter: (v) => {
            return v.toUpperCase();
          },
        },
        { key: "gateway", label: this.$t("admin.gateway") },
        { key: "user", label: this.$t("admin.user") },
        { key: "to", label: this.$t("admin.creator") },
        {
          key: "created_at",
          label: this.$t("admin.date"),
          formatter: (v) => {
            return v.format("lll");
          },
          tdClass: "full",
        },
        {
          key: "amount",
          label: this.$t("general.amount"),
          formatter: (v) => {
            return this.$formatAmount(v);
          },
        },
        {
          key: "feeAmount",
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
    q() {
      this.reset();
    },
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
    getStatus(type) {
      switch (type) {
        case "complete":
          return Payment.STATUS_COMPLETE;
        case "refunded":
          return Payment.STATUS_REFUNDED;
        case "pending":
          return Payment.STATUS_PENDING;
      }
    },
    reset() {
      this.page = 1;
      this.$refs.table.refresh();
    },
    loadPayments(ctx, callback) {
      let url = "/payments/list";
      if (this.type) {
        url += "/" + this.type;
      }
      url += "?page=" + ctx.currentPage + "&q=" + this.q;
      this.$aGet(
        url,
        (data) => {
          let payments = [];
          for (let obj of data.data) {
            const payment = new Payment(obj);
            payment.token = obj.token;
            payment.hash = obj.hash;
            payment.gateway = obj.gateway;
            payments.push(payment);
          }
          this.total = data.total;
          this.perPage = data.per_page;
          callback(payments);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del(payment) {
      this.$aPost(
        "/payments/" + payment.id,
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
    status(payment, status) {
      this.$aPost(
        "/payments/" + payment.id,
        {
          _method: "PUT",
          status: status,
        },
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },

    getDescription(payment) {
      switch (payment.type) {
        case Payment.TYPE_SUBSCRIPTION_NEW:
          return "general.payment-subscription-from";
        case Payment.TYPE_SUBSCRIPTION_RENEW:
          return "general.payment-subscription-renew-from";
        case Payment.TYPE_POST:
          return "general.payment-post-unlocked-by";
        case Payment.TYPE_MESSAGE:
          return "general.payment-message-unlocked-by";
        case Payment.TYPE_TIP:
          return "general.payment-tip-from-to";
      }
      return "";
    },
  },
};
</script>
