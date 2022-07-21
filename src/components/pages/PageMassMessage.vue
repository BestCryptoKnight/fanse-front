<template>
  <b-row>
    <b-col class="chat">
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 px-3">
          <b-link to="/messages">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.mass-message") }}
          </h5>
        </div>
      </b-row>
      <b-row class="conversation" ref="conversation">
        <div class="wrapper px-3">
          <b-row>
            <div class="w-100">
              <h5 class="m-3 text-muted text-uppercase">
                {{ $t("general.include") }}
              </h5>
              <div class="swiperx px-3 w-100 overflow-hidden">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="d-flex">
                      <div
                        class="mr-2 mb-2 rounded p-2 bg-light d-flex list"
                        @click="doInclude(item)"
                        v-for="(item, index) in lists"
                        :key="index"
                      >
                        <i
                          class="mr-2"
                          :class="
                            include.includes(item.id)
                              ? 'bi-check-circle-fill text-primary'
                              : 'bi-circle text-muted'
                          "
                        ></i>
                        <div>
                          <span class="font-weight-bold">{{ item.title }}</span
                          ><br />
                          <span class="text-muted">{{
                            $tc("general.x-people", item.listeesCount)
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-row>
          <b-row>
            <div class="w-100">
              <h5 class="m-3 text-muted text-uppercase">
                {{ $t("general.exclude") }}
              </h5>
              <div class="swiperx px-3 w-100 overflow-hidden">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="d-flex">
                      <div
                        class="mr-2 mb-2 rounded p-2 bg-light d-flex list"
                        @click="doExclude(item)"
                        v-for="(item, index) in lists"
                        :key="index"
                      >
                        <i
                          class="mr-2"
                          :class="
                            exclude.includes(item.id)
                              ? 'bi-check-circle-fill text-primary'
                              : 'bi-circle text-muted'
                          "
                        ></i>
                        <div>
                          <span class="font-weight-bold">{{ item.title }}</span
                          ><br />
                          <span class="text-muted">{{
                            $tc("general.x-people", item.listeesCount)
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-row>
        </div>
      </b-row>
      <b-row class="border-top">
        <ui-media-uploader v-model="media" ref="uploader" />

        <b-form-textarea
          max-rows="4"
          class="px-3 py-0 my-3"
          v-model="message"
          aria-describedby="errors"
          :placeholder="$t('general.type-message')"
          :state="Object.keys(errors).length > 0 ? false : null"
        />

        <div class="invalid-feedback p-2" id="errors">
          <div v-for="(value, key) in errors" :key="key">
            <div v-for="(error, k) in value" :key="k">
              {{ error }}
            </div>
          </div>
        </div>

        <div class="d-flex align-items-center w-100 mb-2">
          <b-link @click="mediaDropzoneClick" class="mx-2 ml-3">
            <i class="bi-image" />
          </b-link>
          <b-link v-b-modal.modalPrice class="mx-2">
            <i class="bi-tag" />
          </b-link>
          <ui-post-option-info
            v-if="price > 0"
            :info="priceFormat()"
            @close="priceRemove()"
          />
          <b-button
            variant="primary"
            @click.prevent="sendMessage"
            class="mr-3 ml-auto"
          >
            {{ $t("general.send") }}
          </b-button>
        </div>

        <b-modal
          id="modalPrice"
          centered
          ok-only
          :title="$t('general.message-price')"
        >
          <b-input-group :prepend="currency">
            <b-form-input
              id="price"
              name="price"
              :placeholder="$t('general.free')"
              v-model="price"
            />
          </b-input-group>
        </b-modal>
      </b-row>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
textarea.form-control {
  border: none;
  scroll-behavior: smooth;
}
textarea.form-control:focus {
  border: none;
  box-shadow: none;
}
.chat {
  min-height: calc(var(--vh, 1vh) * 100);
  max-height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
  display: flex;
  .conversation {
    overflow-y: auto;
    overscroll-behavior: contain;
    flex: 1;
    display: flex;
    .wrapper {
      width: 100% !important;
      margin-top: auto;
      flex-direction: column;
      display: flex;
    }
  }
}
.list {
  cursor: pointer;
}
@include media-breakpoint-down(xs) {
  .chat {
    min-height: calc(var(--vh, 1vh) * 100 - (#{$spacer} * 4));
    max-height: calc(var(--vh, 1vh) * 100 - (#{$spacer} * 4));
  }
}
</style>
<script>
import List from "../models/List";
import UiMediaUploader from "../ui/UiMediaUploader.vue";
import UiPostOptionInfo from "../ui/UiPostOptionInfo.vue";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import Message from "../models/Message";
export default {
  props: ["value"],
  data: function () {
    return {
      price: null,
      errors: {},
      message: "",
      media: [],
      lists: [],
      include: [],
      exclude: [],
    };
  },
  computed: {
    currency() {
      return process.env.VUE_APP_CURRENCY_SIGN;
    },
    mass: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  components: {
    UiMediaUploader,
    UiPostOptionInfo,
  },
  mounted() {
    this.loadLists();
  },
  methods: {
    loadLists() {
      this.$get(
        "/lists/message",
        (data) => {
          for (let d of data.lists) {
            const l = new List(d, this);
            if (l.listeesCount > 0) {
              this.lists.push(l);
            }
          }
          this.$nextTick(() => {
            new Swiper(".swiperx", {
              // Optional parameters
              direction: "horizontal",
              freeMode: {
                enabled: true,
                sticky: false,
              },
              loop: false,
              slidesPerView: "auto",
            });
          });
        },
        () => {}
      );
    },
    doInclude(list) {
      if (this.include.includes(list.id)) {
        this.include = this.include.filter((item) => item !== list.id);
      } else {
        this.include.push(list.id);
      }
    },
    doExclude(list) {
      if (this.exclude.includes(list.id)) {
        this.exclude = this.exclude.filter((item) => item !== list.id);
      } else {
        this.exclude.push(list.id);
      }
    },
    mediaDropzoneClick() {
      this.$refs.uploader.click();
    },
    priceFormat() {
      return this.currency + this.price;
    },
    priceRemove() {
      this.price = null;
    },
    sendMessage() {
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
      if (this.price) {
        fields.price = this.price;
      }

      fields.include = this.include;
      if (this.exclude.length > 0) {
        fields.exclude = this.exclude;
      }

      this.$post(
        "/messages",
        fields,
        (data) => {
          const m = new Message(data);
          m.recipients_count = 0;
          this.mass = m;
          this.$router.replace("/messages");
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>
