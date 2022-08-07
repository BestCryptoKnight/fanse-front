<template>
  <b-row>
    <b-col
      lg="5"
      md="12"
      class="chats border-right"
      :class="showChatId != null || isComposing ? 'd-none d-lg-block' : ''"
    >
      <div>
        <b-row class="border-bottom sticky-top page-header bg-white">
          <div class="d-flex align-items-center w-100 mx-3">
            <b-link @click="$router.go(-1)">
              <i class="bi-arrow-left" />
            </b-link>
            <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
              {{ $t("general.messages") }}
            </h5>
            <b-link to="/messages/compose" v-if="currentUser.isCreator">
              <i class="bi-plus-circle" />
            </b-link>
          </div>
        </b-row>
        <b-row v-if="mass" class="border-bottom mass-alert small p-3">
          {{
            mass.recipients_count > 0
              ? mass.mass_complete
                ? $t("general.mass-message-complete", [
                    mass.messageTrimmed,
                    mass.recipients_count,
                  ])
                : $t("general.mass-message-sending", [
                    mass.messageTrimmed,
                    mass.recipients_count,
                  ])
              : $t("general.mass-message-started", [mass.messageTrimmed])
          }}
        </b-row>
        <b-row
          class="border-bottom"
          v-for="(chat, index) in chats"
          :key="index"
        >
          <div class="d-flex position-relative item w-100">
            <b-avatar
              :text="chat.party.initials"
              :src="chat.party.avatar"
              class="bg-secondary text-white"
              :to="chat.party.url"
            />
            <b-link class="x" @click.prevent="cleanChat(chat.party.id)">
              <i class="bi-x" />
            </b-link>
            <b-link class="link" :to="'/messages/' + chat.party.id">
              <ui-username
                :user="chat.party"
                :full="true"
                :asLink="false"
                class="pr-3"
              />
              <div class="d-flex small body">
                <div class="flex-grow-1 message mr-1">
                  {{ chat.message.message }}
                </div>
                <div
                  :class="
                    !chat.message.isRead && !isOwner(chat.message)
                      ? 'text-primary'
                      : 'text-muted'
                  "
                >
                  {{
                    chat.message.timeRelated
                      ? $t(chat.message.timeRelated)
                      : chat.message.timeNormal
                  }}
                </div>
                <i
                  class="bi-dot m-n2 text-primary"
                  v-if="!chat.message.isRead && !isOwner(chat.message)"
                  style="font-size: 300%; line-height: 1"
                />
              </div>
            </b-link>
          </div>
        </b-row>
      </div>
      <div v-if="chats[0] == null" class="empty-section"> Nothing was found!</div>
    </b-col>
    <b-col
      lg="7"
      md="12"
      :class="showChatId != null || isComposing ? '' : 'd-none d-lg-block'"
    >
      <page-chat
        ref="chat"
        :chatId="showChatId"
        v-model="chats"
        v-if="showChatId != null && !isComposing"
      />
      <page-mass-message v-model="mass" v-if="isComposing" />
      <div v-if="chats[0] == null" class="empty-section"> Please subscribe to a creator to access this area.</div>
    </b-col>
  </b-row>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.list {
  cursor: pointer;
}
.mass-alert {
  background-color: lighten($primary, 50%);
}
</style>
<style lang="scss">
@import "~@/assets/scss/_variables.scss";
@include media-breakpoint-down(md) {
  .chats {
    border-right-width: 0px !important;
  }
}
@include media-breakpoint-up(lg) {
  .chats {
    border-right-width: 1px !important;
  }
}

.empty-section{
  text-align: center;margin-top: 50%;font-weight: bold;color: #8a96a3c4;font-size: 1.2rem;line-height: 1.4rem;font-weight: 500;
}
.chats {
  min-height: calc(var(--vh, 1vh) * 100);
  .item {
    padding-left: 4rem;
    min-height: 4.5rem;
    align-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: var(--light);
    }
    .b-avatar {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
    .x {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
    .link {
      display: block;
      color: inherit;
      padding: 0 1rem 0 0;
      flex: 1;
      width: calc(100% - 80px);
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
    }
    .body {
      white-space: nowrap;
      .message {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
@include media-breakpoint-down(xs) {
  .chats {
    min-height: calc(var(--vh, 1vh) * 100 - (#{$spacer} * 4));
  }
}
</style>
<script>
import Message from "../models/Message";
import User from "../models/User";
import UiUsername from "../ui/UiUsername.vue";
import PageChat from "./PageChat.vue";
import PageMassMessage from "./PageMassMessage.vue";
export default {
  components: {
    PageChat,
    PageMassMessage,
    UiUsername,
  },
  data: function () {
    return {
      chats: [],
      mass: null,
      showChatId: null,
      doCompose: false,
    };
  },
  computed: {
    chatId() {
      return this.$route.params.id && this.$route.params.id != "compose"
        ? this.$route.params.id * 1
        : null;
    },
    isComposing() {
      return this.$route.params.id == "compose";
    },
    pusher() {
      return this.$store.state.pusher;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  watch: {
    chatId(v) {
      this.showChatId = v;
    },
    pusher() {
      this.listen();
    },
  },
  mounted() {
    this.loadChats();
    this.listen();
  },
  beforeDestroy() {
    this.unlisten();
  },
  methods: {
    listen() {
      if (this.pusher) {
        this.pusher.bind("message", this.handleNewMessage);
        this.pusher.bind("message.read", this.handleMessageRead);
        this.pusher.bind(
          "message.mass.complete",
          this.handleMassMessageComplete
        );
      }
    },
    unlisten() {
      if (this.pusher) {
        this.pusher.unbind("message", this.handleNewMessage);
        this.pusher.unbind("message.read", this.handleMessageRead);
        this.pusher.unbind(
          "message.mass.complete",
          this.handleMassMessageComplete
        );
      }
    },
    handleNewMessage(data) {
      const newMessage = new Message(data.message);
      if (newMessage.user.id == this.showChatId) {
        this.$refs.chat.reloadFirst();
      } else {
        let valid = [];
        let chats = [...this.chats];
        let found = false;
        for (let c of chats) {
          if (c.party.id == newMessage.user.id) {
            c.message = newMessage;
            found = true;
            valid.unshift(c);
          } else {
            valid.push(c);
          }
        }
        if (!found) {
          valid.unshift({
            party: newMessage.user,
            message: newMessage,
          });
        }

        this.chats = valid;
      }
    },
    handleMessageRead(data) {
      if (data.id == this.showChatId) {
        this.$refs.chat.readMessages();
      }
    },
    handleMassMessageComplete(data) {
      const m = new Message(data.message);
      m.recipients_count = data.message.recipients_count;
      m.mass_complete = true;
      this.mass = m;
    },
    isOwner(message) {
      return message.user.id == this.$store.state.currentUser.id;
    },
    loadChats() {
      if (this.chats.length == 0) {
        this.$showSpinner();
      }
      this.$get(
        "/messages",
        (data) => {
          let chats = [];
          for (let obj of data.chats) {
            chats.push({
              party: new User(obj.party),
              message: new Message(obj),
            });
          }
          this.chats = chats;
          if (data.mass) {
            this.mass = new Message(data.mass);
            this.mass.recipients_count = data.mass.recipients_count;
          }
          this.$nextTick(function () {
            this.showChatId = this.chatId;
          });
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    cleanChat(id) {
      this.$post(
        "/messages/" + id,
        {
          _method: "DELETE",
        },
        () => {
          this.loadChats();
          this.$router.replace("/messages");
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
