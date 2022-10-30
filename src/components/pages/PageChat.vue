<template>
  <b-row>
    <b-col class="chat">
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 px-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="p-0 my-3 mx-2 flex-grow-1 overflow-hidden">
            <ui-username
              :user="party"
              v-if="party"
              :asLink="false"
              :bold="false"
            />
            <span v-else>&nbsp;</span>
          </h5>
          <b-dropdown no-caret right variant="link">
            <template slot="button-content"
              ><i class="bi-three-dots-vertical"
            /></template>
            <b-dropdown-item @click.prevent="copyLink">{{
              $t("general.copy-link-to-profile")
            }}</b-dropdown-item>
            <b-dropdown-item @click.prevent="addToList(party)">{{
              $t("general.add-to-list")
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-row>
      <b-row class="conversation" ref="conversation">
        <div class="wrapper px-3">
          <div v-for="(message, index) in messages" :key="index">
            <div
              class="timeline"
              v-if="
                index == messages.length - 1 ||
                (index < messages.length - 1 &&
                  !messages[index + 1].created_at.isSame(
                    message.created_at,
                    'day'
                  ))
              "
            >
              <div class="small text-muted bg-white d-inline">
                {{ $t(message.dayRelated) }}
              </div>
            </div>
            <ui-message v-model="messages[index]" />
          </div>
        </div>
      </b-row>
      <b-row class="border-top" v-if="party && party.isSubscribed || currentUser.isCreator">
        <ui-media-uploader v-model="media" ref="uploader" />
        <ui-archive v-if="selectedArchives.length > 0" :archives="selectedArchives"></ui-archive>
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
          <b-link @click="tip" class="mx-2 ml-3">
            <i class="bi-coin" />
          </b-link>
          <b-link @click="mediaDropzoneClick" class="mx-2">
            <i class="bi-image" />
          </b-link>
          <b-link v-if="currentUser.isCreator" v-b-modal.modalArchive class="mx-2">
            <i class="bi-folder" />
          </b-link>
          <b-link
            v-b-modal.modalPrice
            class="mx-2"
            v-if="currentUser.isCreator"
          >
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
        <b-modal
          id="modalArchive"
          centered
          ok-only
          @ok="addSelectArchives()"
          @cancel="deleteSelectArchives()"
          
          :title="$t('general.archive')"
        >
          <div>
            <b-button class="mr-2" style="margin-bottom:15px" variant="outline-primary" @click.prevent="buildArchives('all')">All</b-button>
            <b-button class="mr-2" style="margin-bottom:15px" variant="outline-primary" @click.prevent="buildArchives('photos')">Photos</b-button>
            <b-button class="mr-2" style="margin-bottom:15px" variant="outline-primary" @click.prevent="buildArchives('videos')">Videos</b-button>

            <div class="archives">
              <b-row v-for="(row, key) in archive_rows" :key="key">
                <b-col v-for="(archive, k) in row" :key="k" style="background-color: #d2d7db61;padding: 10px;text-align: center;border-radius: 10px;margin: 10px;" :class="isExist(archive) ? 'item-border' : ''" @click.prevent="addArchive(archive)"> 
                  <div  v-if="archive.type == 0">
                    <b-img
                      width="100%"
                      height="100%"
                      thumbnail fluid
                      :src="archive.url"
                    >
                    </b-img>
                  </div>
                  <div v-if="archive.type == 1" >
                    <video 
                    :poster="archive.screenshot"
                    width="100%"
                    height="100%"
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
      <b-row class="border-top" v-else >
       <p class="px-3 py-3 my-3">
         <i class="bi bi-info-circle-fill"></i>
          Please <a :href="url + '/' + party.username"> subscribe </a> to access this feature.
       </p>
      </b-row>
    </b-col>
  </b-row>
</template>
<style lang="scss" scoped>
.archives {
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 500px;
  padding: 10px;
}
</style>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
textarea.form-control {
  border: none;
  scroll-behavior: smooth;
}
.item-border {
  border:#2081E2 2px solid;
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
      flex-direction: column-reverse;
      display: flex;
    }
  }
  .timeline {
    position: relative;
    display: flex;
    justify-content: center;
    &::before {
      content: "";
      position: absolute;
      height: 1px;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: gray("300");
    }
    & > div {
      position: relative;
      z-index: 5;
      padding: 0 $spacer;
    }
  }
}
@include media-breakpoint-down(xs) {
  .chat {
    min-height: calc(var(--vh, 1vh) * 100 - (#{$spacer} * 4));
    max-height: calc(var(--vh, 1vh) * 100 - (#{$spacer} * 4));
  }
  
}
</style>
<script>
import Message from "../models/Message";
import UiMessage from "../ui/UiMessage.vue";
import UiMediaUploader from "../ui/UiMediaUploader.vue";
import UiPostOptionInfo from "../ui/UiPostOptionInfo.vue";
import UiArchive from "../ui/UiArchiveSelect.vue";
import User from "../models/User";
import UiUsername from "../ui/UiUsername.vue";
import Payment from "../models/Payment";
import Media from "../models/Media";

export default {
  props: {
    value: Array,
    chatId: Number,
  },
  data: function () {
    return {
      messages: [],
      price: null,
      errors: {},
      message: "",
      media: [],
      party: null,
      page: 1,
      hasMore: false,
      isLoading: false,
      addedManually: 0,
      archives: [],
      archive_rows: [],
      archivepage: 1,
      archivehasMore: true,
      selectArchives: [],
      selectedArchives: [],
    };
  },
  computed: {
    url() {
      return process.env.VUE_APP_APP_URL;
    },
    currency() {
      return process.env.VUE_APP_CURRENCY_SIGN;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    chats: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  watch: {
    chatId: function () {
      this.init();
    },
  },
  mounted() {
    this.init();
    this.$refs.conversation.addEventListener("scroll", this.updateScroll);
    this.loadArchives();
    window.addEventListener("scroll", this.updateArchiveScroll);
  },
  components: {
    UiMessage,
    UiMediaUploader,
    UiPostOptionInfo,
    UiUsername,
    UiArchive,
  },
  methods: {
    init() {
      this.messages = [];
      this.price = null;
      this.errors = {};
      this.message = "";
      this.media = [];
      this.archives = [];
      this.party = null;
      let chats = [...this.chats];
      for (let c of chats) {
        if (c.party.id == this.chatId) {
          this.party = c.party;
          c.message.isRead = true;
        }
      }
      this.page = 1;
      this.hasMore = false;
      this.isLoading = false;
      this.chats = chats;
      this.loadMessages();
    },
    updateScroll() {
      if (
        this.$refs.conversation &&
        this.$refs.conversation.scrollTop <= 200 &&
        !this.isLoading &&
        this.hasMore
      ) {
        this.loadMore();
      }
    },
    readMessages() {
      for (let m of this.messages) {
        m.isRead = true;
      }
    },
    async loadMessages(page) {
      this.isLoading = true;
      this.$get(
        "/messages/" + this.chatId + "?page=" + (page ? page : this.page),
        (data) => {
          const recent =
            this.messages.length > 0 ? this.messages[0].created_at : null;
          parser: for (let obj of data.messages.data) {
            const m = new Message(obj);
            for (let mm of this.messages) {
              if (mm.id == m.id) {
                continue parser;
              }
            }
            if (!recent || m.created_at.isBefore(recent)) {
              this.messages.push(m);
            } else {
              this.addMessage(m);
            }
          }
          this.isLoading = false;
          if (!page) {
            this.hasMore = data.messages.next_page_url != null;
          }
          this.party = this.party ? this.party : new User(data.party);
          if (this.page == 1) {
            this.$nextTick(function () {
              this.$refs.conversation.scrollTo({
                top: this.$refs.conversation.scrollHeight,
                behavior: "instant",
              });
            });
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    reloadFirst() {
      this.loadMessages(1);
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        if (this.addedManually >= 20) {
          this.page = this.page + 1;
          this.addedManually = 0;
        }
        this.loadMessages();
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
    addMessage(message) {
      this.messages.unshift(message);
      if (message.user.id != this.$store.state.currentUser.id) {
        message.isRead = true;
      }
      let valid = [];
      let chats = [...this.chats];
      let found = false;
      for (let c of chats) {
        if (c.party.id == this.party.id) {
          c.message = message;
          found = true;
          valid.unshift(c);
        } else {
          valid.push(c);
        }
      }
      if (!found) {
        valid.unshift({
          party: this.party,
          message: message,
        });
      }

      this.chats = valid;
      this.$nextTick(function () {
        this.$refs.conversation.scrollTo({
          top: this.$refs.conversation.scrollHeight,
          behavior: "smooth",
        });
      });

      this.addedManually++;
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
      for (let archive of this.selectedArchives) {
        media.push({
          id: archive.id,
          screenshot: archive.scr ? archive.scr.id : null,
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

      this.$post(
        "/messages/" + this.party.id,
        fields,
        (data) => {
          let message = new Message(data);
          this.addMessage(message);
          this.$refs.uploader.clean();
          this.selectedArchives = [];
          this.message = "";
          this.media = [];
          this.price = null;
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
    tip() {
      this.$buyItem({
        type: Payment.TYPE_TIP,
        user: this.party,
      });
    },
    updateArchiveScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      if (
        document.body.offsetHeight &&
        scrollPosition &&
        document.body.offsetHeight - scrollPosition <= 1000 &&
        !this.isLoading &&
        this.archivehasMore
      ) {
        this.loadArchiveMore();
      }
    },
    loadArchives() {
      this.$get(
        "/media?page=" + this.archivepage,
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
          this.archivehasMore = data.media.next_page_url != null;
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
    loadArchiveMore() {
      if (this.archivehasMore) {
        this.archivepage = this.archivepage + 1;
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
