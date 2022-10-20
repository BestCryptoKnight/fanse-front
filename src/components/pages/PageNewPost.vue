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
          <b-button 
          class="btn-primary" 
          @click.prevent="submitPost">{{
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
        <ui-archive v-if="selectedArchives.length > 0" :archives="selectedArchives"></ui-archive>
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
        <b-modal
        id="modalArchive"
        centered
        ok-only
        @ok="addSelectArchives()"
        @cancel="deleteSelectArchives()"
        
        :title="$t('general.archive')"
        >
        <div>
          <b-button class="mr-2" variant="outline-primary" @click.prevent="buildArchives('all')">All</b-button>
          <b-button class="mr-2" variant="outline-primary" @click.prevent="buildArchives('photos')">Photos</b-button>
          <b-button class="mr-2" variant="outline-primary" @click.prevent="buildArchives('videos')">Videos</b-button>

          <div class="archives">
            <b-row v-for="(row, key) in archive_rows" :key="key">
              <b-col v-for="(archive, k) in row" :key="k">
                <div :class="isExist(archive) ? 'item-border' : ''" v-if="archive.type == 0" @click.prevent="addArchive(archive)">
                  <b-img
                    width="170"
                    height="100"
                    thumbnail fluid
                    :src="archive.url"
                  >
                  </b-img>
                </div>
                <div :class="isExist(archive) ? 'item-border' : ''" v-if="archive.type == 1" @click.prevent="addArchive(archive)">
                  <video 
                  :poster="archive.screenshot"
                  width="170"
                  height="100"
                  controls
                  >
                  </video>
              </div>
              </b-col>
            </b-row>
          </div>
        </div>
        </b-modal>
      </b-row>
      <b-row class="border-bottom py-2">
        <div class="d-flex align-items-center">
          <b-link @click="mediaDropzoneClick" class="mx-2 ml-3">
            <i class="bi-image" />
          </b-link>
          <b-link v-b-modal.modalArchive class="mx-2">
            <i class="bi-folder" />
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
  height: 120px !important;
}
textarea:focus {
  border: none;
  box-shadow: none;
}
.item-border {
  border:#2081E2 2px solid;
}
.btn-primary{
      padding: 8px 18px !important;
    height: 40px !important;
}
</style>
<script>
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

import UiPostOptionInfo from "../ui/UiPostOptionInfo";
import UiMediaUploader from "../ui/UiMediaUploader.vue";
import UiArchive from '../ui/UiArchiveSelect.vue';
import Media from "../models/Media";

export default {
  components: {
    UiPostOptionInfo,
    UiMediaUploader,
    UiArchive,

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
      archives: [],
      archive_rows: [],
      page: 1,
      hasMore: true,
      selectArchives: [],
      selectedArchives: [],
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
    this.loadArchives();
    window.addEventListener("scroll", this.updateScroll);
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
    loadArchives() {
      this.$get(
        "/media?page=" + this.page,
        (data) => {
          let archives = [...this.archives];
          for (let obj of data.media.data) {
            let archive = new Media(obj)
            if(archive.type !== Media.TYPE_AUDIO && !archive.url.includes("/tmp/"))
            {
              archives.push(new Media(obj));
            }
          }
          this.archives = archives;
          this.hasMore = data.media.next_page_url != null;
          this.buildArchives("all");
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    buildArchives(media_type) {
      this.archive_rows = [];
      let current_row = [];
      let index = 0;
      for (let archive of this.archives)
      {
        if(media_type == "videos" && archive.type !== Media.TYPE_VIDEO) continue;
        if(media_type == "photos" && archive.type !== Media.TYPE_IMAGE) continue;

        if(index % 3 == 0 && index != 0)
        {
          this.archive_rows.push([...current_row]);
          current_row = [];
        }
        current_row.push(archive);
        index++;
      }
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadArchives();
      }
    },
    isExist(item) {
      if (this.selectArchives.indexOf(item) < 0) return false;
      return true;
    },
    addArchive(item){
      if (this.selectArchives.indexOf(item) < 0)
      {
        this.selectArchives.push(item);
      }
      else {
        this.selectArchives.splice(this.selectArchives.indexOf(item),1);
      }
    },
    addSelectArchives(){
      if (this.selectArchives != null){
        for (let archive of this.selectArchives){
          this.selectedArchives.push(archive);
        }
      }
      console.log(this.selectArchives);
      this.selectArchives = [];
    },
    deleteSelectArchives(){
      this.selectArchives = [];
    },
  },
};
</script>
