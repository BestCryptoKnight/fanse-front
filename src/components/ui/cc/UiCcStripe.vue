<template>
  <div class="text-center mb-3">
    <b-spinner variant="secondary" v-if="loading" />
    <div ref="stripe"></div>
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../../models/Payment";
export default {
  props: ["amount", "message"],
  data: function () {
    return {
      loading: true,
      elements: null,
      stripe: null,
      subscription: null,
    };
  },
  mounted() {
    this.loadIntent();
  },
  computed: {
    item() {
      return this.$store.state.buyItem;
    },
  },
  watch: {
    amount: function () {
      this.loadIntent();
    },
  },
  methods: {
    loadIntent() {
      if (this.item) {
        var fields = {
          gateway: "cc",
          type: this.item.type,
        };
        switch (this.item.type) {
          case Payment.TYPE_SUBSCRIPTION_NEW:
            console.log(this.subscription);
            fields.sub_id = this.item.user.id;
            if (this.item.bundle) {
              fields.bundle_id = this.item.bundle.id;
            }
            break;
          case Payment.TYPE_POST:
            fields.post_id = this.item.post.id;
            break;
          case Payment.TYPE_MESSAGE:
            fields.message_id = this.item.message.id;
            break;
          case Payment.TYPE_TIP:
            fields.amount = this.amount;
            fields.message = this.message;
            fields.to_id = this.item.user.id;
            if (this.item.post) {
              fields.post_id = this.item.post.id;
            }
            break;
        }
        this.$post(
          "/payments",
          fields,
          (data) => {
            console.log(data);
            this.subscription = {id: data.subscription_id};
            this.loadElement(data.token);
          },
          () => {}
        );
      } else {
        this.$post(
          "/stripe/intent",
          fields,
          (data) => {
            this.loadElement(data.token);
          },
          () => {}
        );
      }
    },
    loadElement(secret) {
      loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY).then((stripe) => {
        this.stripe = stripe;
        this.elements = this.stripe.elements({
          clientSecret: secret,
        });
        var paymentElement = this.elements.create("payment");
        paymentElement.mount(this.$refs.stripe);
        paymentElement.on("ready", () => {
          paymentElement.focus();
          this.loading = false;
        });
      });
    },
    save() {
      var elements = this.elements;
      if (this.item) {
        this.stripe
          .confirmPayment({
            elements,
            confirmParams: {
              return_url:
                process.env.VUE_APP_APP_URL + "/payment/success/stripe",
            },
          })
          .then((result) => {
            if (result.error) {
              console.log(result.error);
            }
          });
      } else {
        this.stripe
          .confirmSetup({
            elements,
            confirmParams: {
              return_url: process.env.VUE_APP_APP_URL + "/payments/attach",
            },
          })
          .then((result) => {
            if (result.error) {
              console.log(result.error);
            }
          });
      }
    },
  },
};
</script>
