<template>
  <div class="rounded user border w-100">
    <div class="header">
      <div class="bg-light cover w-100 position-relative rounded-top">
        <b-img
          :src="user.cover"
          v-if="user.cover != null"
          class="rounded-top"
          onContextMenu="return false;" 
        />
        <div class="buttons m-2">
          <b-dropdown no-caret right variant="link">
            <template slot="button-content"
              ><i class="bi-three-dots-vertical text-white"
            /></template>
            <b-dropdown-item @click.prevent="copyLink">{{
              $t("general.copy-link-to-profile")
            }}</b-dropdown-item>
            <b-dropdown-item @click.prevent="addToList(user)">{{
              $t("general.add-to-list")
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
    <div class="subprofile w-100 d-flex mb-3">
      <div class="avatar position-relative ml-3 rounded-circle">
        <b-avatar
          :src="user.avatar"
          :text="user.initials"
          :to="user.url"
          size="100px"
        />
      </div>
      <div class="ml-2 mr-3 mt-1 overflow-hidden w-100">
        <ui-username :user="user" />
        <b-link :to="user.url" class="text-muted small small-username d-block">{{
          "@" + user.username
        }}</b-link>
      </div>
    </div>
    <div class="mb-3 px-3" v-if="subscription">
      <b-button variant="primary" size="sm" block @click.prevent="unsubscribe">
        {{
          subscription.active
            ? $t("general.subscribed-for-x", [
                !subscription.amount
                  ? $t("general.free")
                  : subscription.priceFormatted,
              ])
            : $t("general.re-subscribe")
        }}
      </b-button>
      <div v-if="subscription.expires" class="small text-muted text-center">
        {{ $t("general.expires-on", [subscription.expiresFormatted]) }}
      </div>
    </div>
    <b-modal
      centered
      :title="$t('general.unsubscribe')"
      ref="modal"
      :ok-title="$t('general.unsubscribe')"
      @ok="doUnsubscribe()"
    >
      {{ $t("general.are-you-sure-unsubscribe", [user.name]) }}
    </b-modal>
  </div>
</template>
<style lang="scss">
.user {
  .cover {
    height: 80px;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #000;
      opacity: 0.2;
      pointer-events: none;
      content: "";
      border-top-left-radius: 0.25rem !important;
      border-top-right-radius: 0.25rem !important;
    }
    img {
      -o-object-fit: cover;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .buttons {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 11;
    button {
      padding: 0;
    }
  }
  .avatar {
    margin-top: -50px;
  }
}
</style>
<script>
import Subscription from "../models/Subscription";
import User from "../models/User";
import UiUsername from "./UiUsername.vue";
export default {
  components: { UiUsername },
  props: {
    user: User,
    subscription: Subscription,
  },
  methods: {
    copyLink() {
      const link = `${process.env.VUE_APP_APP_URL}${this.user.url}`;
      this.$copyText(link);
    },
    addToList(user) {
      this.$store.state.addToListUser = user;
    },
    unsubscribe() {
      if (this.subscription.active) {
        this.$refs["modal"].show();
      } else {
        this.$emit("subscribe", this.subscription);
      }
    },
    doUnsubscribe() {
      this.$emit("unsubscribe", this.subscription);
    },
  },
};
</script>
