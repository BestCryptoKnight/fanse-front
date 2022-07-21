<template>
  <b-card :header="$t('general.payment-methods')" class="w-100 mt-3 mr-3 ml-3">
    <div v-if="!adding">
      <div v-for="(item, index) in methods" :key="index" class="mb-3">
        <div class="d-flex align-items-center">
          <i class="bi bi-credit-card mr-2" style="font-size: 150%" />
          <span>{{ item.title }}</span>
          <span v-if="item.main" class="ml-2 text-muted"
            >[{{ $t("general.main") }}]</span
          >
          <b-button
            v-if="!item.main"
            size="sm"
            @click.prevent="main(item)"
            class="ml-2"
            variant="primary"
            >{{ $t("general.make-main") }}</b-button
          >
          <b-button
            size="sm"
            @click.prevent="del(item)"
            class="ml-2"
            variant="secondary"
            >{{ $t("general.delete") }}</b-button
          >
        </div>
      </div>
      <div>
        <b-button size="sm" @click.prevent="add">{{
          $t("general.add")
        }}</b-button>
      </div>
    </div>
    <div v-if="adding">
      <b-form-invalid-feedback
        class="d-block"
        v-if="errors['_'] && errors['_'].length > 0"
      >
        <div v-for="error in errors['_']" :key="error">
          {{ error }}
        </div>
      </b-form-invalid-feedback>
      <ui-credit-card ref="cc" :cc="cc" @token="token" />
      <div>
        <b-button @click.prevent="unadd" variant="secondary" class="mr-2">{{
          $t("general.cancel")
        }}</b-button>
        <b-button @click.prevent="save" variant="primary">{{
          $t("general.save")
        }}</b-button>
      </div>
    </div>
  </b-card>
</template>
<script>
import PaymentMethod from "../models/PaymentMethod";
import UiCreditCard from "./UiCreditCard.vue";
export default {
  components: { UiCreditCard },
  data: function () {
    return {
      methods: [],
      errors: {},
      adding: false,
      cc: null,
    };
  },
  computed: {
    attach() {
      return this.$route.params.attach;
    },
  },
  mounted() {
    this.loadMethods();
    if (this.attach) {
      this.doAttach();
    }
  },
  methods: {
    add() {
      this.adding = true;
    },
    unadd() {
      this.adding = false;
      this.reset();
    },
    reset() {
      this.card_number = "";
      this.card_holder = "";
      this.expiration_month = "";
      this.expiration_year = "";
      this.cvc = "";
    },
    loadMethods() {
      this.$get(
        "/payments/method",
        (data) => {
          for (let m of data.methods) {
            this.methods.push(new PaymentMethod(m));
          }
          this.cc = data.cc;
        },
        () => {}
      );
    },
    doAttach() {
      this.errors = {};
      this.$showSpinner();
      this.$post(
        "/payments/method",
        this.$route.query,
        (data) => {
          this.methods.push(new PaymentMethod(data));
          this.unadd();
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
    token(title, token) {
      this.errors = {};
      this.$showSpinner();
      this.$post(
        "/payments/method",
        {
          token: token,
          title: title,
        },
        (data) => {
          this.methods.push(new PaymentMethod(data));
          this.unadd();
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
    save() {
      this.$refs.cc.save();
    },
    del(method) {
      this.$post(
        "/payments/method/" + method.id,
        {
          _method: "DELETE",
        },
        (data) => {
          this.methods = [];
          for (let m of data.methods) {
            this.methods.push(new PaymentMethod(m));
          }
        },
        () => {}
      );
    },
    main(method) {
      this.$post(
        "/payments/method/" + method.id,
        {
          _method: "PUT",
        },
        (data) => {
          this.methods = [];
          for (let m of data.methods) {
            this.methods.push(new PaymentMethod(m));
          }
        },
        () => {}
      );
    },
  },
};
</script>