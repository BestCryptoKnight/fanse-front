<template>
  <b-row>
    <b-col>
      <b-row class="border-bottom sticky-top page-header bg-white">
        <div class="d-flex align-items-center w-100 mx-3">
          <h5 class="text-uppercase p-0 my-3 flex-grow-1">
            {{ $t("admin.payouts") }}
          </h5>
          <b-nav pills>
            <b-nav-form class="mr-2" v-if="type != 'batches'">
              <b-form-input
                :placeholder="$t('admin.search')"
                v-model="q"
                class="mr-1"
              ></b-form-input>
            </b-nav-form>
            <b-nav-item to="/admin/payouts" exact exact-active-class="active">{{
              $t("admin.pending")
            }}</b-nav-item>
            <b-nav-item
              to="/admin/payouts/complete"
              exact
              exact-active-class="active"
              >{{ $t("admin.completed") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/payouts/batches"
              exact
              exact-active-class="active"
              >{{ $t("admin.batches") }}</b-nav-item
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
          :items="loadPayouts"
          :fields="fields"
          per-page="0"
          class="small nowrap"
          :current-page="page"
        >
          <template #cell(user)="data">
            <b-link :to="data.item.user ? data.item.user.url : ''">{{
              data.item.user ? data.item.user.username : ""
            }}</b-link>
          </template>

          <template #cell(gateway)="data">{{
            data.item.info ? data.item.info.gateway : ""
          }}</template>

          <template #cell(batch)="data">
            <span v-if="data.item.batch">{{ data.item.batch.hash }}</span>
            <span v-else class="text-muted"
              ><i>{{ $t("admin.none") }}</i></span
            >
          </template>

          <template #cell(status)="data">
            <span
              :class="
                data.item.status == getStatus('pending')
                  ? 'text-secondary'
                  : 'text-success'
              "
              >{{
                data.item.status == getStatus("pending")
                  ? $t("admin.pending")
                  : $t("admin.completed")
              }}</span
            >
          </template>

          <template #cell(actions)="data">
            <b-button
              size="sm"
              @click="data.toggleDetails"
              class="mr-1"
              variant="secondary"
              v-if="type != 'batches'"
            >
              {{ data.detailsShowing ? $t("admin.hide") : $t("admin.details") }}
            </b-button>
            <b-button
              size="sm"
              @click.prevent="exp(data.item)"
              class="mr-1"
              variant="secondary"
              v-if="
                type == 'batches' && data.item.status == getStatus('pending')
              "
            >
              {{ $t("admin.export") }}
            </b-button>
            <b-button
              @click.prevent="mark(data.item, getStatus('complete'))"
              variant="primary"
              size="sm"
              class="mr-1"
              v-if="data.item.status == getStatus('pending')"
              >{{ $t("admin.complete") }}</b-button
            >
            <b-button
              @click.prevent="del(data.item)"
              variant="danger"
              size="sm"
              class="mr-1"
              v-if="data.item.status == getStatus('pending')"
              >{{ $t("general.delete") }}</b-button
            >
          </template>
          <template #row-details="data">
            <b-card>
              <b-row v-if="data.item.info.gateway == 'paypal'" cols="2">
                <b-col class="text-right"
                  ><b>{{ $t("general.paypal-address") }}</b></b-col
                >
                <b-col>{{ data.item.info.info.paypal }}</b-col>
              </b-row>

              <b-row v-if="data.item.info.gateway == 'bank'" cols="2">
                <b-col class="text-right"
                  ><b>{{ $t("general.first-name") }}</b></b-col
                >
                <b-col>{{ data.item.user.verification.info.first_name }}</b-col>
                <b-col class="text-right"
                  ><b>{{ $t("general.last-name") }}</b></b-col
                >
                <b-col>{{ data.item.user.verification.info.last_name }}</b-col>
                <b-col class="text-right"
                  ><b>{{ $t("general.bank-name") }}</b></b-col
                >
                <b-col>{{ data.item.info.info.name }}</b-col>
                <b-col class="text-right"
                  ><b>{{ $t("general.country") }}</b></b-col
                >
                <b-col>{{ data.item.user.verification.country }}</b-col>

                <b-col class="text-right"
                  ><b>{{ $t("general.bank-address") }}</b></b-col
                >
                <b-col>{{ data.item.info.info.address }}</b-col>

                <b-col class="text-right"
                  ><b>{{ $t("general.swift") }}</b></b-col
                >
                <b-col>{{ data.item.info.info.swift }}</b-col>

                <b-col class="text-right"
                  ><b>{{ $t("general.account-number") }}</b></b-col
                >
                <b-col>{{ data.item.info.info.account }}</b-col>
              </b-row>
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
      <div class="text-center" v-if="type != 'batches'">
        <b-button
          variant="primary"
          class="btn-block mt-5"
          @click.prevent="batchCreate"
          >{{ $t("admin.create-batch") }}</b-button
        >
        <span class="text-muted small">{{
          $t("admin.from-all-pending-requests")
        }}</span>
      </div>
    </b-col>
  </b-row>
</template>
<style scoped>
</style>
<script>
import Payout from "../../models/Payout";
import PayoutBatch from "../../models/PayoutBatch";
import User from "../../models/User";
import Verification from "../../models/Verification";
import axios from "axios";
export default {
  data: function () {
    return {
      q: "",
      page: 1,
      total: 0,
      perPage: 1,
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
    fields() {
      switch (this.$route.params.type) {
        case "batches":
          return [
            { key: "hash", label: this.$t("admin.id"), tdClass: "full" },
            { key: "status", label: this.$t("admin.status"), tdClass: "full" },
            {
              key: "payoutsCount",
              label: this.$t("admin.payouts"),
              tdClass: "full",
            },
            {
              key: "amount",
              label: this.$t("general.amount"),
              formatter: (v) => {
                return this.$formatAmount(v);
              },
              tdClass: "full",
            },
            {
              key: "processed_at",
              label: this.$t("admin.processed"),
              formatter: (v) => {
                return v ? v.format("lll") : null;
              },
              tdClass: "full",
            },
            {
              key: "actions",
              label: this.$t("admin.actions"),
              tdClass: "full",
            },
          ];
        case "complete":
          return [
            { key: "user", label: this.$t("admin.user") },
            {
              key: "amount",
              label: this.$t("general.amount"),
              formatter: (v) => {
                return this.$formatAmount(v);
              },
              tdClass: "full",
            },
            { key: "gateway", label: this.$t("admin.gateway") },
            { key: "batch", label: this.$t("admin.batch"), tdClass: "full" },
            {
              key: "processed_at",
              label: this.$t("admin.processed"),
              formatter: (v) => {
                return v ? v.format("lll") : null;
              },
              tdClass: "full",
            },
            {
              key: "actions",
              label: this.$t("admin.actions"),
              tdClass: "full",
            },
          ];
        default:
          return [
            { key: "user", label: this.$t("admin.user") },
            {
              key: "amount",
              label: this.$t("general.amount"),
              formatter: (v) => {
                return this.$formatAmount(v);
              },
            },
            { key: "gateway", label: this.$t("admin.gateway") },
            {
              key: "processed_at",
              label: this.$t("admin.processed"),
              formatter: (v) => {
                return v ? v.format("lll") : null;
              },
              tdClass: "full",
            },
            {
              key: "created_at",
              label: this.$t("admin.date"),
              formatter: (v) => {
                return v.format("lll");
              },
              tdClass: "full",
            },
            {
              key: "actions",
              label: this.$t("admin.actions"),
              tdClass: "full",
            },
          ];
      }
    },
  },
  methods: {
    getStatus(type) {
      switch (type) {
        case "complete":
          return Payout.STATUS_COMPLETE;
        case "pending":
          return Payout.STATUS_PENDING;
      }
    },
    reset() {
      this.page = 1;
      this.$refs.table.refresh();
    },
    loadPayouts(ctx, callback) {
      let url = "/payouts/list";
      if (this.type) {
        url += "/" + this.type;
      }
      url += "?page=" + ctx.currentPage + "&q=" + this.q;
      this.$aGet(
        url,
        (data) => {
          let payouts = [];
          if (this.type == "batches") {
            for (let obj of data.data) {
              const batch = new PayoutBatch(obj);
              payouts.push(batch);
            }
          } else {
            for (let obj of data.data) {
              const payout = new Payout(obj);
              payout.batch = obj.batch;
              payout.user = new User(obj.user);
              payout.user.verification = new Verification(
                obj.user.verification
              );
              payouts.push(payout);
            }
          }
          this.total = data.total;
          this.perPage = data.per_page;
          callback(payouts);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del(payout) {
      this.$aPost(
        "/payouts/" + (this.type == "batches" ? "batches/" : "") + payout.id,
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
    mark(payout, status) {
      this.$aPost(
        "/payouts/" + (this.type == "batches" ? "batches/" : "") + payout.id,
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
    batchCreate() {
      this.$aPost(
        "/payouts/batches",
        {},
        () => {
          this.$router.push("/admin/payouts/batches");
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    exp(batch) {
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "/admin/payouts/batches/file/" +
            batch.id,
          {
            responseType: "blob",
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
            },
          }
        )
        .then((response) => {
          let fileName =
            response.headers["content-disposition"].split("filename=")[1];
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(
              new Blob([response.data], {
                type: "application/zip",
              }),
              fileName
            );
          } else {
            const url = window.URL.createObjectURL(
              new Blob([response.data], {
                type: "application/zip",
              })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
          }
        });
    },
  },
};
</script>
