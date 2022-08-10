<template>
  <b-row class="verification">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.verification") }}
          </h5>
          <b-button
            @click.prevent="unedit"
            variant="secondary"
            v-if="verification && editing"
            class="mr-2"
            >{{ $t("general.cancel") }}</b-button
          >
          <b-button @click.prevent="action" variant="primary">{{
            !editing ? $t("general.edit") : $t("general.send")
          }}</b-button>
        </div>
      </b-row>
      <b-row>
        <b-form class="w-100 mx-3 mt-3">
          <div class="" style="padding-bottom: 10px;">
            <h4 class="mb-0 font-montserrat"><i class="bi bi-patch-check-fill" style="
                        color: #2081E2;
                    "></i> Become a Verify Creator</h4>
              </div>
          <div class="btn-block border-bottom" style="text-align: left !important;border-bottom: 1px solid #dee2e6!important;">
            <p class="bollets-home" style="
                margin-top: 10px;
                margin-left: 0px;
                margin-bottom: 10px;
            "><d class="" style="color: #2081E2;">💕</d> You take home <strong>85%</strong> of your earnings! <strong>Lower than anywhere else!</strong>
            </p>
            <p class="bollets-home" style="
                margin-left: 0px;
                margin-top: 10px;
                margin-bottom: 10px;
            "><d class="" style="color: #2081E2;">💎</d> Legend Creators are getting <strong>social media Promotions FOR FREE!</strong></p>
            
          <p class="bollets-home" style="
              margin-left: 0px;
              margin-top: 10px;
              margin-bottom: 10px;
          "><d class="" style="color: #2081E2;">💸</d> Join the <strong>most converting</strong> social subscription platform!</p>
          <p class="bollets-home" style="
                          margin-left: 0px;
                          margin-top: 10px;
                          margin-bottom: 10px;
              "><d class="" style="color: #2081E2;">✔️</d> Fast verification</p>
        </div>
          <b-alert show variant="secondary" v-if="editing">{{
            $t("general.verification-info")
          }}</b-alert>
          <b-alert
            show
            :variant="
              localVerification && localVerification.isPending
                ? 'secondary'
                : 'danger'
            "
            v-if="!editing"
            >{{ $t("general.verification-status", [getStatus()]) }}</b-alert
          >
          <ui-form-input
            type="text"
            name="first_name"
            v-model="first_name"
            :errors="errors"
            :disabled="!editing"
            :label="$t('general.first-name')"
          />
          <ui-form-input
            type="text"
            name="last_name"
            v-model="last_name"
            :errors="errors"
            :disabled="!editing"
            :label="$t('general.last-name')"
          />

          <b-form-group
            :label="$t('general.country')"
            label-for="country"
            class="mb-3"
            label-class="small"
          >
            <b-form-select
              id="country"
              v-model="country"
              required
              :disabled="!editing"
              :options="countries"
              :state="errors['country'] ? false : null"
              aria-describedby="country-errors"
            />
            <b-form-invalid-feedback id="country-errors">
              <div v-for="error in errors['country']" :key="error">
                {{ error }}
              </div>
            </b-form-invalid-feedback>
          </b-form-group>

          <ui-form-input
            type="text"
            name="address"
            :disabled="!editing"
            v-model="address"
            :errors="errors"
            :label="$t('general.address')"
          />

          <ui-form-input
            type="text"
            name="city"
            :disabled="!editing"
            v-model="city"
            :errors="errors"
            :label="$t('general.city')"
          />

          <ui-form-input
            type="text"
            name="state"
            :disabled="!editing"
            v-model="state"
            :errors="errors"
            :label="$t('general.state')"
          />
          <ui-form-input
            type="text"
            name="zip"
            :disabled="!editing"
            v-model="zip"
            :errors="errors"
            :label="$t('general.zip')"
          />
          <b-alert show variant="secondary" v-if="editing">Upload a photo with your ID, Make sure the photo you send meets the following requirements:<br />- Both your hand holding the ID card and your full face must be visible <br />– Your face must be clearly visible in both the photo and the ID <br />– The photo must be well lit and not too small, too dark or too blurry</b-alert>
          <b-form-group
            :label="$t('general.photo-id')"
            label-for="photo"
            class="mb-3"
            label-class="small"
          >
            <b-form-file
              id="photo"
              v-model="photo"
              :disabled="!editing"
              :state="errors['photo'] ? false : null"
              required
              aria-describedby="photo-errors"
            />
            <b-form-invalid-feedback id="photo-errors'">
              <div v-for="error in errors['photo']" :key="error">
                {{ error }}
              </div>
            </b-form-invalid-feedback>
          </b-form-group>
          <div v-if="!editing">
            <i class="bi-file-check" /> {{ $t("general.file-uploaded") }}
          </div>
        </b-form>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import Verification from "../models/Verification";
import UiFormInput from "../ui/UiFormInput.vue";
import Countries from "../helpers/Countries";
export default {
  props: {
    verification: Verification,
  },
  data: function () {
    return {
      errors: {},
      localVerification: this.verification,
      first_name: this.verification
        ? this.verification.info.first_name
        : this.$store.state.currentUser.name,
      last_name: this.verification ? this.verification.info.last_name : "",
      country: this.verification ? this.verification.country : null,
      address: this.verification ? this.verification.info.address : "",
      city: this.verification ? this.verification.info.city : "",
      state: this.verification ? this.verification.info.state : "",
      zip: this.verification ? this.verification.info.zip : "",
      photo: null,
      editing: this.verification == null,
    };
  },
  components: {
    UiFormInput,
  },
  computed: {
    countries() {
      let countries = [];
      for (let k in Countries) {
        countries.push({
          value: k,
          text: Countries[k],
        });
      }
      return countries;
    },
  },
  mounted() {
    this.setCountry();
  },
  methods: {
    setCountry() {
      if (!this.country) {
        const lang = navigator.language;
        let country =
          lang.length == 5
            ? lang.substring(3).toUpperCase()
            : lang.toUpperCase();
        for (let c of this.countries) {
          if (c.value == country) {
            this.country = country;
            break;
          }
        }
      }
    },
    getStatus() {
      if (!this.localVerification) {
        return "";
      }
      switch (this.localVerification.status) {
        case Verification.STATUS_PENDING:
          return this.$t("general.pending");
        case Verification.STATUS_DECLINED:
          return this.$t("general.declined");
      }
    },
    unedit() {
      this.editing = false;
    },
    action() {
      if (!this.editing) {
        this.editing = true;
      } else {
        this.errors = {};
        let formData = new FormData();
        formData.append("country", this.country);
        formData.append("first_name", this.first_name);
        formData.append("last_name", this.last_name);
        formData.append("address", this.address);
        formData.append("city", this.city);
        formData.append("state", this.state);
        formData.append("zip", this.zip);
        formData.append("photo", this.photo);
        this.$post(
          "/payouts/verification",
          formData,
          (data) => {
            this.localVerification = new Verification(data);
            this.editing = false;
          },
          (errors) => {
            this.errors = errors;
          }
        );
      }
    },
  },
};
</script>
