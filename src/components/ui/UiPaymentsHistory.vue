<template>
  <b-card :header="$t('general.history')" class="w-100 mt-3 mr-3 ml-3">
    <div
      class="rounded border p-2 small mb-2"
      v-for="(item, index) in payments"
      :key="index"
    >
      <div class="d-flex border-bottom pb-1">
        <div class="flex-grow-1">
          <div class="text-muted font-weight-bold">
            {{ item.created_at.format("ll") }}
          </div>
          <div>{{ item.created_at.format("LT") }}</div>
        </div>
        <div class="flex-grow-1">
          <div class="text-muted font-weight-bold">
            {{ $t("general.amount") }}
          </div>
          <div>{{ $formatAmount(item.amount) }}</div>
        </div>
      </div>
      <div class="w-100 pt-1">
        <i18n :path="getDescription(item)" tag="span">
          <template v-slot:user>
            <b-link :to="item.user.url">{{ item.user.username }}</b-link>
          </template>
          <template v-slot:to>
            <b-link :to="item.to.url">{{ item.to.username }}</b-link>
          </template>
          <template v-slot:post v-if="item.items.post">
            <b-link :to="item.items.post.url">{{ $t("general.post") }}</b-link>
          </template>
          <template v-slot:message>
            {{ $t("general.private-message") }}
          </template>
        </i18n>
      </div>
    </div>
  </b-card>
</template>
<script>
import Payment from "../models/Payment";
export default {
  data: function () {
    return {
      payments: [],
      page: 1,
      hasMore: false,
      isLoading: false,
    };
  },
  mounted() {
    this.loadPayments();
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
        this.loadPayments();
      }
    },
    loadPayments() {
      this.isLoading = true;
      this.$get(
        "/payments?page=" + this.page,
        (data) => {
          try {
            let payments = [...this.payments];
            for (let obj of data.data) {
              payments.push(new Payment(obj));
            }
            this.payments = payments;
            this.hasMore = data.next_page_url != null;
            this.isLoading = false;
          } catch (e) {
            console.log(e);
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    getDescription2(payment) {
      switch (payment.type) {
        case Payment.TYPE_SUBSCRIPTION_NEW:
          return this.$t("general.payment-subscription-to", [
            `<a href="${payment.to.url}">${payment.to.username}</a>`,
          ]);
        case Payment.TYPE_SUBSCRIPTION_RENEW:
          return this.$t("general.payment-subscription-renew-to", [
            `<a href="${payment.to.url}">${payment.to.username}</a>`,
          ]);
        case Payment.TYPE_POST:
          return this.$t("general.payment-unlocked", [
            `<a href="${payment.items.post.url}">${this.$t(
              "general.post"
            )}</a>`,
          ]);
        case Payment.TYPE_MESSAGE:
          return this.$t("general.payment-unlocked-from", [
            this.$t("general.private-message"),
            `<a href="${payment.to.url}">${payment.to.username}</a>`,
          ]);
      }
      return "";
    },
    getDescription(payment) {
      switch (payment.type) {
        case Payment.TYPE_SUBSCRIPTION_NEW:
          return "general.payment-subscription-to";
        case Payment.TYPE_SUBSCRIPTION_RENEW:
          return "general.payment-subscription-renew-to";
        case Payment.TYPE_POST:
          return "general.payment-post-unlocked";
        case Payment.TYPE_MESSAGE:
          return "general.payment-message-unlocked";
        case Payment.TYPE_TIP:
          return "general.payment-tip-to";
      }
      return "";
    },
  },
};
</script>
