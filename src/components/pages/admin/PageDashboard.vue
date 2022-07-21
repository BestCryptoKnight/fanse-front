<template>
  <b-row v-if="totals != null">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <h5 class="text-uppercase p-0 my-3 flex-grow-1">
            {{ $t("admin.dashboard") }}
          </h5>
        </div>
      </b-row>
      <b-card-group deck class="mt-3">
        <b-card bg-variant="light">
          <div class="header">{{ $t("admin.sales") }}</div>
          <div class="subheader">{{ $formatAmount(totals.sales) }}</div>
        </b-card>
        <b-card bg-variant="light">
          <div class="header">{{ $t("admin.earnings") }}</div>
          <div class="subheader">{{ $formatAmount(totals.fees) }}</div>
        </b-card>
        <b-card bg-variant="light">
          <div class="header">{{ $t("admin.users") }}</div>
          <div class="subheader">{{ totals.users.toLocaleString() }}</div>
        </b-card>
        <b-card bg-variant="light">
          <div class="header">{{ $t("admin.posts") }}</div>
          <div class="subheader">{{ totals.posts.toLocaleString() }}</div>
        </b-card>
      </b-card-group>
      <b-row>
        <b-card class="m-3 w-100">
          <chart-line
            :chart-data="line"
            :options="lineOptions"
            class="w-100 chart"
          />
        </b-card>
      </b-row>
      <b-row>
        <b-card class="mx-3 mb-3 w-100">
          <chart-bar
            :chart-data="bar"
            :options="barOptions"
            class="w-100 chart"
          />
        </b-card>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.subheader {
  font-weight: bold;
  font-size: 150%;
}
</style>
<script>
import ChartLine from "../../charts/ChartLine.vue";
import dayjs from "dayjs";
import ChartBar from "../../charts/ChartBar.vue";
export default {
  components: {
    ChartLine,
    ChartBar,
  },
  data: function () {
    return {
      line: { labels: [], datasets: [] },
      bar: { labels: [], datasets: [] },
      totals: {},
      lineOptions: {},
      barOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                userCallback: (value) => {
                  return this.$formatAmount(value * 100);
                },
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.loadStats();
  },
  methods: {
    getLabels() {
      const end = dayjs().subtract(30, "day");
      let curr = dayjs();
      let labels = [];
      while (curr.isAfter(end)) {
        labels.unshift(curr.format("YYYY-MM-DD"));
        curr = curr.subtract(1, "day");
      }
      return labels;
    },
    loadStats() {
      this.$aGet(
        "/stats",
        (data) => {
          this.totals = data.totals;
          let line = { ...this.line };
          let bar = { ...this.bar };
          // users
          let users = this.getDataset(data.users, this.$t("admin.new-users"));
          line.datasets.push(users);
          // posts
          let posts = this.getDataset(data.posts, this.$t("admin.new-posts"));
          line.datasets.push(posts);
          // payments
          let payments = this.getDataset(
            data.payments,
            this.$t("admin.payments"),
            function (v) {
              return Math.round(v / 100);
            }
          );
          bar.datasets.push(payments);
          // fees
          let fees = this.getDataset(
            data.fees,
            this.$t("admin.fees"),
            function (v) {
              return Math.round(v / 100);
            }
          );
          bar.datasets.push(fees);

          // labels
          line.labels = this.getLabels();
          bar.labels = this.getLabels();
          // push
          this.line = line;
          this.bar = bar;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    getDataset(data, label, formatter) {
      let dataset = {
        label: label,
        data: [],
        fill: false,
      };
      let labels = this.getLabels();
      for (let l of labels) {
        let x = l;
        let y = 0;
        for (let d in data) {
          if (d == l) {
            y = formatter ? formatter(data[d]) : data[d];
          }
        }
        dataset.data.push({
          x: x,
          y: y,
        });
      }
      return dataset;
    },
  },
};
</script>
