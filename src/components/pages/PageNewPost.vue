<template>
  <b-row>
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ postId ? $t("general.edit-post") : $t("general.new-post") }}
          </h5>
          <b-button @click.prevent="submitPost">{{
            $t("general.post")
          }}</b-button>
        </div>
      </b-row>
      <b-row class="border-bottom">
        <ui-media-uploader v-model="media" ref="uploader" />

        <div class="w-100" v-if="poll.length > 0">
          <b-form class="p-2 border rounded bg-light mx-3 mt-3">
            <div class="d-flex align-items-center mb-2 w-100">
              <i class="bi-bar-chart" />
              <div class="flex-grow-1 mx-2">{{ $t("general.poll") }}</div>
              <div class="text-end">
                <b-link @click="pollRemove">
                  <i class="bi-x-circle-fill" />
                </b-link>
              </div>
            </div>
            <div
              v-for="(option, index) in poll"
              :key="index"
              class="mb-2 d-flex gap-2 align-items-center"
            >
              <b-form-input
                name="options[]"
                :placeholder="$t('general.enter-option')"
                v-model="poll[index]"
                size="sm"
                class="flex-fill"
              />
              <b-link @click="pollRemoveOption(index)">
                <i class="bi-x" />
              </b-link>
            </div>
            <b-link class="small" @click="pollAddOption">
              {{ $t("general.add-option") }}
            </b-link>
          </b-form>
        </div>
        <div
          class="d-flex flex-wrap mt-3 mx-3"
          v-if="
            expire > 0 ||
            (scheduleDate != null && scheduleTime != null) ||
            price > 0
          "
        >
          <ui-post-option-info
            v-if="expire > 0"
            :info="$tc('general.x-days', expire)"
            @close="expireRemove()"
            class="mr-2"
          />
          <ui-post-option-info
            v-if="scheduleDate != null && scheduleTime != null"
            :info="scheduleFormat()"
            @close="scheduleRemove()"
            class="mr-2"
          />
          <ui-post-option-info
            v-if="price > 0"
            :info="priceFormat()"
            @close="priceRemove()"
            class="mr-2"
          />
        </div>
        <b-form-textarea
          max-rows="8"
          class="px-3 py-0 my-3"
          v-model="message"
          aria-describedby="errors"
          :placeholder="$t('general.add-description')"
          :state="Object.keys(errors).length > 0 ? false : null"
        />
        <div class="invalid-feedback px-3 py-2" id="errors">
          <div v-for="(value, key) in errors" :key="key">
            <div v-for="(error, k) in value" :key="k">
              {{ error }}
            </div>
          </div>
        </div>
        <b-modal
          id="modalExpire"
          centered
          ok-only
          :title="$t('general.expiration-period')"
        >
          <b-form-group class="text-center">
            <b-form-radio-group
              v-model="expire"
              :options="expireOptions"
              buttons
            />
          </b-form-group>
        </b-modal>
        <b-modal
          id="modalSchedule"
          centered
          ok-only
          :title="$t('general.schedule')"
        >
          <b-tabs>
            <b-tab :title="scheduleFormatDate()" active>
              <b-calendar
                hide-header
                block
                class="mt-3"
                :min="new Date()"
                v-model="scheduleDate"
              />
            </b-tab>
            <b-tab :title="scheduleFormatTime()">
              <div class="text-center">
                <b-time hide-header block class="mt-3" v-model="scheduleTime" />
              </div>
            </b-tab>
          </b-tabs>
        </b-modal>
        <b-modal
          id="modalPrice"
          centered
          ok-only
          :title="$t('general.post-price')"
        >
          <b-input-group :prepend="currencySign">
            <b-form-input
              id="price"
              name="price"
              :placeholder="$t('general.free')"
              v-model="price"
            />
          </b-input-group>
        </b-modal>
      </b-row>
      <b-row class="border-bottom py-2">
        <div class="d-flex align-items-center">
          <b-link @click="mediaDropzoneClick" class="mx-2 ml-3">
            <i class="bi-image" />
          </b-link>
          <b-link @click="pollAdd" class="mx-2">
            <i class="bi-bar-chart" />
          </b-link>
          <b-link v-b-modal.modalExpire class="mx-2">
            <i class="bi-clock-history" />
          </b-link>
          <b-link v-b-modal.modalSchedule class="mx-2">
            <i class="bi-calendar-check" />
          </b-link>
          <b-link v-b-modal.modalPrice class="mx-2">
            <i class="bi-tag" />
          </b-link>
        </div>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
textarea {
  border: none;
  scroll-behavior: smooth;
}
textarea:focus {
  border: none;
  box-shadow: none;
}
</style>
<script>
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

import UiPostOptionInfo from "../ui/UiPostOptionInfo";
import UiMediaUploader from "../ui/UiMediaUploader.vue";
import Media from "../models/Media";

export default {
  components: {
    UiPostOptionInfo,
    UiMediaUploader,
  },
  data: function () {
    return {
      errors: {},
      message: "",
      currencySign: process.env.VUE_APP_CURRENCY_SIGN,
      media: [],
      poll: [],
      expire: 0,
      expireOptions: {
        0: this.$tc("general.x-days", 0),
        3: this.$tc("general.x-days", 3),
        7: this.$tc("general.x-days", 7),
        30: this.$tc("general.x-days", 30),
      },
      scheduleDate: null,
      scheduleTime: null,
      price: null,
    };
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
  mounted() {
    if (this.postId) {
      this.loadPost();
    }
  },
  watch: {
    postId: function (newV, oldV) {
      if (oldV != newV) {
        this.reset();
        if (newV) {
          this.loadPost();
        }
      }
    },
  },
  methods: {
    reset() {
      this.errors = {};
      this.message = "";
      this.media = [];
      this.poll = [];
      this.expire = 0;
      this.scheduleDate = null;
      this.scheduleTime = null;
      this.price = null;
      this.$refs.uploader.clean();
    },
    loadPost() {
      this.$showSpinner();
      this.$get(
        "/posts/" + this.postId,
        (data) => {
          this.message = data.message;
          for (let m of data.media) {
            if (m.type == Media.TYPE_VIDEO) {
              for (let t of m.thumbs) {
                if (t.url == m.screenshot) {
                  m.scr = t;
                  break;
                }
              }
            }
          }
          this.media = data.media;
          this.$nextTick(function () {
            this.$refs.uploader.manual();
          });

          for (let p of data.poll) {
            this.poll.push(p.option);
          }
          this.expire = data.expires;
          if (data.schedule) {
            this.scheduleDate = dayjs(data.schedule).format("YYYY-MM-DD");
            this.scheduleTime = dayjs(data.schedule).format("HH:mm:ss");
          }
          this.price = data.price / 100;
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    mediaDropzoneClick() {
      this.$refs.uploader.click();
    },
    pollAdd() {
      if (this.poll.length == 0) {
        this.poll = ["", ""];
      }
    },
    pollRemove() {
      this.poll = [];
    },
    pollAddOption() {
      this.poll.push("");
    },
    pollRemoveOption(index) {
      this.poll.splice(index, 1);
    },
    scheduleFormatDate() {
      return this.scheduleDate !== null
        ? dayjs(this.scheduleDate).format("LL")
        : this.$t("general.date");
    },
    scheduleFormatTime() {
      return this.scheduleTime !== null && this.scheduleDate !== null
        ? dayjs(this.scheduleDate + " " + this.scheduleTime).format("LT")
        : this.$t("general.time");
    },
    scheduleFormat() {
      return this.scheduleTime !== null && this.scheduleDate !== null
        ? dayjs(this.scheduleDate + " " + this.scheduleTime).format("L LT")
        : "";
    },
    scheduleFormatIso() {
      return this.scheduleTime !== null && this.scheduleDate !== null
        ? dayjs(this.scheduleDate + " " + this.scheduleTime).toISOString()
        : null;
    },
    scheduleRemove() {
      this.scheduleDate = null;
      this.scheduleTime = null;
    },
    expireRemove() {
      this.expire = 0;
    },
    priceFormat() {
      return this.currencySign + this.price;
    },
    priceRemove() {
      this.price = null;
    },
    submitPost() {
      this.errors = {};

      let media = [];
      for (let m of this.media) {
        media.push({
          id: m.id,
          screenshot: m.scr ? m.scr.id : null,
        });
      }

      this.errors = {};
      let fields = {
        message: this.message,
      };
      if (media.length > 0) {
        fields.media = media;
      }
      if (this.poll && this.poll.length > 0) {
        fields.poll = this.poll;
      }
      if (this.expire) {
        fields.expires = this.expire;
      }
      if (this.scheduleFormatIso() != null) {
        fields.schedule = this.scheduleFormatIso();
      }
      if (this.price) {
        fields.price = this.price;
      }
      if (this.postId) {
        fields._method = "PUT";
      }

      this.$post(
        "/posts" + (this.postId ? "/" + this.postId : ""),
        fields,
        () => {
          if (this.postId) {
            this.$bvToast.toast(this.$t("general.post-saved"), {
              autoHideDelay: 2000,
              title: this.$t("general.success"),
              solid: true,
              toaster: "b-toaster-bottom-left",
            });
          } else {
            this.$router.replace("/");
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
