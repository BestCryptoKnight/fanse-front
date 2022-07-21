<template>
  <b-row class="settings">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.subscription") }}
          </h5>
        </div>
      </b-row>
      <b-row>
        <b-form @submit.prevent="savePrice" class="w-100 mx-3 mt-3 mb-3">
          <ui-form-input
            type="text"
            name="price"
            v-model="user.price"
            :errors="errors"
            :prepend="currency"
            :label="$t('general.price-per-month')"
          />
          <b-button type="submit" variant="primary" class="float-right">{{
            $t("general.save")
          }}</b-button>
        </b-form>
      </b-row>
      <b-row class="border-bottom border-top">
        <h5 class="p-0 my-3 mx-3">
          {{ $t("general.subscription-bundles") }}
        </h5>
      </b-row>
      <b-row class="py-3">
        <div
          v-for="(item, index) in user.bundles"
          :key="index"
          class="mb-3 mx-3 p-2 rounded border d-flex align-items-center w-100"
        >
          <div class="flex-grow-1 mr-2">
            {{ $t("general.get-x-months-for-y-z-off", item.title(user)) }}
          </div>
          <b-link @click.prevent="removeBundle(item)">
            <i class="bi-x-circle-fill"
          /></b-link>
        </div>
        <div class="text-right w-100">
          <b-button variant="primary" class="mx-3" v-b-modal.modalAddBundle>{{
            $t("general.add")
          }}</b-button>
        </div>
        <b-modal
          id="modalAddBundle"
          ref="modalAddBundle"
          centered
          :title="$t('general.add-bundle')"
          @ok="addBundle"
        >
          <b-form inline @submit="addBundle" class="text-center">
            <b-form-select
              v-model="newBundle.discount"
              :options="options.discount"
              class="mr-2"
            ></b-form-select>
            <b-form-select
              v-model="newBundle.months"
              :options="options.months"
            ></b-form-select>
          </b-form>
        </b-modal>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import UiFormInput from "../ui/UiFormInput.vue";
export default {
  data: function () {
    return {
      errors: {},
      newBundle: {
        discount: null,
        months: null,
      },
      options: {
        discount: {
          null: this.$t("general.discount"),
          10: "10%",
          20: "20%",
          30: "30%",
          40: "40%",
          50: "50%",
        },
        months: {
          null: this.$t("general.months"),
          3: this.$tc("general.x-months", 3),
          6: this.$tc("general.x-months", 6),
          12: this.$tc("general.x-months", 12),
        },
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    currency() {
      return process.env.VUE_APP_CURRENCY_SIGN;
    },
  },
  components: {
    UiFormInput,
  },
  methods: {
    savePrice() {
      this.errors = {};
      this.$post(
        "/price",
        {
          price: this.user.price,
        },

        (data) => {
          this.$saveUser(data);
          this.$bvToast.toast(this.$t("general.settings-saved"), {
            autoHideDelay: 2000,
            title: this.$t("general.success"),
            solid: true,
            toaster: "b-toaster-bottom-left",
          });
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
    addBundle() {
      this.$post(
        "/price/bundle",
        {
          discount: this.newBundle.discount,
          months: this.newBundle.months,
        },

        (data) => {
          this.$saveUser(data);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    removeBundle(bundle) {
      this.$post(
        "/price/bundle/" + bundle.id,
        {
          _method: "DELETE",
        },

        (data) => {
          this.$saveUser(data);
          this.newBundle.discount = null;
          this.newBundle.months = null;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
