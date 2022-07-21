<template>
  <div>
    <div
      class="rounded border d-flex p-2 small mb-2"
      v-for="(item, index) in payouts"
      :key="index"
    >
      <div class="flex-grow-1">
        <div class="text-muted font-weight-bold">{{ $t("general.date") }}</div>
        <div>{{ item.processed_at.format("lll") }}</div>
      </div>
      <div class="flex-grow-1">
        <div class="text-muted font-weight-bold">
          {{ $t("general.amount") }}
        </div>
        <div>{{ $formatAmount(item.amount) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Payout from "../models/Payout";
export default {
  data: function () {
    return {
      payouts: [],
      page: 1,
      hasMore: false,
      isLoading: false,
    };
  },
  mounted() {
    this.loadPayouts();
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
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadPayouts();
      }
    },
    loadPayouts() {
      this.isLoading = true;
      this.$get(
        "/payouts?page=" + this.page,
        (data) => {
          let payouts = [...this.payouts];
          for (let obj of data.data) {
            payouts.push(new Payout(obj));
          }
          this.payouts = payouts;
          this.hasMore = data.next_page_url != null;
          this.isLoading = false;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
