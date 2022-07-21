<template>
  <div>
    <b-modal
      id="modalBuy"
      centered
      v-model="visible"
      :title="title"
      @ok.prevent="buy"
      ref="modal"
      @show="init"
      body-class="p-0"
    >
      <div v-if="!isTip" class="m-3">{{ description }}</div>
      <div v-else class="m-3">
        <div class="d-flex mb-3">
          <b-avatar
            :src="item.user.avatar"
            :text="item.user.initials"
            :to="item.user.url"
          />
          <div class="d-flex flex-column ml-2 overflow-hidden">
            <ui-username :user="item.user" :asLink="false" />
            <span class="text-muted small username">
              {{ "@" + item.user.username }}
            </span>
          </div>
        </div>
        <ui-form-input
          type="number"
          name="amount"
          :prepend="currency"
          v-model="amount"
          :errors="errors"
          :placeholder="$t('general.amount')"
        />
        <ui-form-input
          type="text"
          name="message"
          v-model="message"
          :errors="errors"
          :placeholder="$t('general.message-optional')"
        />
      </div>
      <div v-if="method == null">
        <div class="m-3">
          <div v-if="errors._ && errors._.length > 0">
            <div
              class="alert alert-danger"
              v-for="error in errors._"
              :key="error"
            >
              {{ error }}
            </div>
          </div>
          <b-form-radio
            v-for="(item, index) in gateways"
            v-model="gateway"
            name="gateway"
            class="mb-2"
            :value="!item.cc ? item.id : 'cc'"
            :key="index"
          >
            <div class="gateway">
              <img v-if="!item.cc" :src="info[item.id].logo" />
              <div v-else class="d-flex align-items-center">
                <i
                  class="bi bi-credit-card mr-2"
                  style="font-size: 150%; line-height: 1"
                ></i>
                {{ $t("general.credit-card") }}
              </div>
            </div>
          </b-form-radio>
        </div>
        <ui-credit-card
          v-if="gateway == 'cc' && (!isTip || amount)"
          ref="cc"
          :cc="getCCGateway()"
          :amount="amount"
          :message="message"
          @token="token"
          class="border-top p-3"
        />
      </div>
    </b-modal>
  </div>
</template>
<style scoped lang="scss">
.gateway {
  img {
    height: 1.5em;
  }
}
</style>
<script>
import Payment from "../models/Payment";
import User from "../models/User";
import UiCreditCard from "./UiCreditCard.vue";
import UiFormInput from "./UiFormInput.vue";
import UiUsername from "./UiUsername.vue";
export default {
  components: { UiCreditCard, UiUsername, UiFormInput },
  data: function () {
    return {
      gateway: null,
      gateways: [],
      method: null,
      errors: {},
      amount: "",
      message: "",
      info: {
        paypal: {
          logo: require("@/assets/paypal.svg"),
        },
      },
    };
  },
  computed: {
    currency() {
      return process.env.VUE_APP_CURRENCY_SIGN;
    },
    item() {
      return this.$store.state.buyItem;
    },
    visible: {
      get() {
        return this.$store.state.buyItem != null;
      },
      set() {
        this.$store.state.buyItem = null;
      },
    },
    isTip() {
      return (
        this.$store.state.buyItem &&
        this.$store.state.buyItem.type == Payment.TYPE_TIP
      );
    },
    title() {
      if (this.$store.state.buyItem) {
        switch (this.$store.state.buyItem.type) {
          case Payment.TYPE_SUBSCRIPTION_NEW:
            return this.$t("general.subscribe");
          case Payment.TYPE_POST:
            return this.$t("general.unlock-post");
          case Payment.TYPE_MESSAGE:
            return this.$t("general.unlock-message");
          case Payment.TYPE_TIP:
            return this.$t("general.tip");
        }
      }
      return "";
    },
    description() {
      if (this.$store.state.buyItem) {
        switch (this.$store.state.buyItem.type) {
          case Payment.TYPE_SUBSCRIPTION_NEW:
            return this.$t("general.subscription-to-x", [
              this.$store.state.buyItem.user.name,
              this.$store.state.buyItem.bundle &&
              this.$store.state.buyItem.bundle.months
                ? this.$store.state.buyItem.bundle.months
                : "1",
            ]);
          case Payment.TYPE_POST:
            return this.$t("general.unlock-post-from-x-for-y", [
              this.$store.state.buyItem.post.user.name,
              this.$store.state.buyItem.post.priceFormatted,
            ]);
          case Payment.TYPE_MESSAGE:
            return this.$t("general.unlock-message-from-x-for-y", [
              this.$store.state.buyItem.message.user.name,
              this.$store.state.buyItem.message.priceFormatted,
            ]);
        }
      }
      return "";
    },
  },
  methods: {
    init() {
      this.message = "";
      this.amount = "";
      this.loadGateways();
    },
    getCCGateway() {
      for (let g of this.gateways) {
        if (g.cc) {
          return g;
        }
      }
    },
    loadGateways() {
      let gateways = [];
      this.$get(
        "/gateways",
        (data) => {
          for (let g of data.gateways) {
            gateways.push(g);
          }
          this.gateways = gateways;
          this.gateway = this.gateways[0].id;
          this.method = data.method;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    token(title, token) {
      this.proceed({
        gateway: "cc",
        title: title,
        token: token,
      });
    },
    buy() {
      if (this.method != null) {
        this.proceed({});
      } else if (this.gateway == "cc") {
        this.$refs.cc.save();
      } else {
        this.proceed({ gateway: this.gateway });
      }
    },
    proceed(fields) {
      fields.type = this.item.type;
      switch (this.item.type) {
        case Payment.TYPE_SUBSCRIPTION_NEW:
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

      this.$showSpinner();
      this.$post(
        "/payments",
        fields,
        (data) => {
          if (data.redirect) {
            location = data.redirect;
          } else if (data.tip) {
            this.$bvToast.toast(this.$t("general.tip-sent"), {
              autoHideDelay: 2000,
              title: this.$t("general.success"),
              solid: true,
              toaster: "b-toaster-bottom-left",
            });
            this.visible = false;
          } else if (data.post) {
            this.item.success(data.post);
            this.visible = false;
          } else if (data.message) {
            this.item.success(data.message);
            this.visible = false;
          } else if (data.user) {
            let u = new User(data.user);
            this.$router.push(u.url).catch(() => {
              this.$router.go();
            });
            this.visible = false;
          } else {
            this.$router.go();
            this.visible = false;
          }
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>
