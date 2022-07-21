<template>
  <b-form>
    <ui-form-input
      type="text"
      name="card_holder"
      v-model="card_holder"
      :errors="errors"
      :label="$t('general.name-on-card')"
    />
    <ui-form-input
      type="text"
      name="card_number"
      mask="#### #### #### ####"
      v-model="card_number"
      :errors="errors"
      :label="$t('general.card-number')"
    />

    <b-row>
      <b-col cols="6">
        <b-form-group
          :label="$t('general.expiry-date')"
          label-for="expiration_month"
          class="mb-3"
          label-class="small"
        >
          <b-input-group>
            <b-form-input
              id="expiration_month"
              v-model="expiration_month"
              type="text"
              v-mask="'##'"
              :state="errors['expiration_month'] ? false : null"
            />
            <b-form-input
              id="expiration_year"
              v-model="expiration_year"
              type="text"
              v-mask="'##'"
              ref="year"
              :state="errors['expiration_year'] ? false : null"
            />
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <ui-form-input
          type="text"
          name="cvc"
          v-model="cvc"
          mask="###"
          :errors="errors"
          :label="$t('general.cvc')"
        />
      </b-col>
    </b-row>
  </b-form>
</template>
<script>
import UiFormInput from "../UiFormInput.vue";
import axios from "axios";
export default {
  components: { UiFormInput },
  data: function () {
    return {
      card_number: "",
      card_holder: "",
      expiration_month: "",
      expiration_year: "",
      cvc: "",
      errors: {},
    };
  },
  methods: {
    reset() {
      this.card_number = "";
      this.card_holder = "";
      this.expiration_month = "";
      this.expiration_year = "";
      this.cvc = "";
      this.errors = {};
    },
    save() {
      this.errors = {};
      // get token
      axios
        .post(
          "https://api.centrobill.com/tokenize",
          {
            number: this.card_number.replaceAll(" ", ""),
            expirationYear: this.expiration_year,
            expirationMonth: this.expiration_month,
            cvv: this.cvc,
            cardHolder: this.card_holder,
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((response) => {
          this.$emit(
            "token",
            "****" + this.card_number.slice(-4),
            response.data.token
          );
        })
        .catch(() => {
          this.$bvToast.toast(this.$t("errors.payment-method"), {
            autoHideDelay: 2000,
            title: this.$t("general.error"),
            solid: true,
            toaster: "b-toaster-bottom-left",
          });
        });
    },
  },
};
</script>
