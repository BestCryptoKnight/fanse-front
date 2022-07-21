<template>
  <div class="message my-2" :class="isAuthor ? 'out' : 'in'">
    <div class="d-flex align-items-end">
      <b-avatar
        :to="message.user.url"
        :src="message.user.avatar"
        :text="message.user.initials"
      />
      <div class="d-flex flex-column w-100 wrapper">
        <div
          class="media w-100 body rounded p-1 mx-1 mb-1"
          :class="message.media.length == 1 ? 'single' : 'multiple'"
          v-if="media.length > 0 && message.hasAccess"
        >
          <b-link
            @click="$showPhotoSwipe(message.media, 0)"
            v-for="(item, index) in media"
            :key="index"
            class="item"
          >
            <div class="position-relative">
              <b-img
                :src="item.type == 0 ? item.url : item.screenshot"
                v-if="item.type >= 0"
              />
              <div v-else class="count">
                {{ "+" + (message.media.length - media.length + 1) }}
              </div>
              <i
                class="bi-play-circle-fill play text-white"
                v-if="item.type == 1"
                style="font-size: 300%; line-height: 1"
              />
            </div>
          </b-link>
        </div>

        <div
          class="body w-100 rounded mx-1"
          v-else-if="!message.hasAccess && message.media.length > 0"
        >
          <b-aspect aspect="4:3">
            <div class="w-100 h-100 position-relative">
              <div class="d-flex align-items-center h-100">
                <div class="mx-auto">
                  <i
                    class="bi-lock-fill align-self-center text-muted"
                    style="font-size: 300%; line-height: 1"
                  />
                  <div
                    class="d-flex text-muted small justify-content-center mt-2"
                  >
                    <div class="mr-1" v-if="message.images > 0">
                      <i class="bi-image" /> {{ message.images }}
                    </div>
                    <div class="ml-1" v-if="message.videos > 0">
                      <i class="bi-camera-video" /> {{ message.videos }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="position-absolute p-3"
                style="bottom: 0; left: 0; right: 0"
              >
                <b-button
                  variant="primary"
                  size="sm"
                  block
                  @click.prevent="unlock"
                  >{{
                    $t("general.unlock-message-for-x", [message.priceFormatted])
                  }}</b-button
                >
              </div>
            </div>
          </b-aspect>
        </div>

        <div
          v-if="message.items.payment"
          class="body rounded p-2 mx-1 wrap mt-1"
        >
          <i18n
            :path="
              'general.' +
              (message.items.payment.items.post
                ? isAuthor
                  ? 'tip-message-post-out'
                  : 'tip-message-post-in'
                : isAuthor
                ? 'tip-message-out'
                : 'tip-message-out')
            "
            tag="div"
          >
            <template v-slot:amount>
              {{ $formatAmount(message.items.payment.amount) }}
            </template>
            <template v-slot:post v-if="message.items.payment.items.post">
              <b-link :to="message.items.payment.items.post.url">{{
                $t("general.post")
              }}</b-link>
            </template>
          </i18n>
        </div>
        <div v-if="message.message" class="body rounded p-2 mx-1 wrap mt-1">
          {{ message.message }}
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center time">
      <i
        class="bi-check2"
        style="font-size: 120%; line-height: 1"
        v-if="isAuthor && !message.isRead"
      />
      <i
        class="bi-check2-all text-primary"
        style="font-size: 120%; line-height: 1"
        v-if="isAuthor && message.isRead"
      />
      <div class="text-muted mr-1">{{ message.time }}</div>
    </div>
  </div>
</template>
<style lang="scss">
@import "~@/assets/scss/_variables.scss";
.message {
  &.in {
    margin-right: ($spacer * 5);
    .time {
      margin-left: 3rem;
    }
    .wrapper {
      align-items: flex-start !important;
    }
    .body {
      background-color: darken($white, 5%);
    }
  }
  &.out {
    & > div {
      flex-direction: row-reverse;
    }
    margin-left: ($spacer * 5);
    .time {
      margin-right: 3rem;
      text-align: right;
    }
    .body {
      background-color: lighten($primary, 40%);
    }
    .wrapper {
      align-items: flex-end !important;
    }
  }
  .time {
    font-size: 66%;
  }
  .media {
    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.multiple {
      flex: 1;
      display: grid;
      grid-gap: 2px;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: min-content;
      .item {
        > div {
          height: 0;
          padding-bottom: 100%;
          position: relative;
          img {
            overflow: hidden;
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
          .count {
            color: $black;
            font-size: 250%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
    &.single {
      padding: 0 !important;
      .item {
        max-width: 100%;
        > div {
          max-width: 100%;
          img {
            width: 100%;
            height: auto;
            border-radius: $border-radius;
          }
        }
      }
    }
  }
}
</style>
<script>
import Message from "../models/Message";
import Payment from "../models/Payment";
export default {
  props: ["value"],
  computed: {
    message: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    isAuthor() {
      return this.message.user.id == this.$store.state.currentUser.id;
    },
    media() {
      let m = [];
      const l = this.message.media.length;
      if (l > 4) {
        m = this.message.media.slice(0, 3);
        m.push({
          type: -1,
        });
      } else if (l == 3) {
        m = this.message.media.slice(0, 1);
        m.push({
          type: -1,
        });
      } else {
        m = this.message.media;
      }
      return m;
    },
  },
  methods: {
    unlock() {
      this.$buyItem({
        type: Payment.TYPE_MESSAGE,
        message: this.message,
        success: (data) => {
          this.message = new Message(data);
        },
      });
    },
  },
};
</script>
