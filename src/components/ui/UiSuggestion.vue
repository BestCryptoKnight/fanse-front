<template>
  <b-link :to="user.url" class="rounded suggestion w-100 bg-light d-block">
    <b-img :src="user.cover" v-if="user.cover != null" class="rounded cover" />
    <b-avatar
      :src="user.avatar"
      :text="user.initials"
      size="100px"
      class="avatar m-2"
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
    <div class="overflow-hidden w-100 subprofile py-2 pr-2">
      <ui-username :user="user" :asLink="false" class="text-white " style="color:white;"  />
      
      <div class="text-white small username-white d-block ">
        {{ "@" + user.username }}
      </div>
    </div>
  </b-link>
</template>
<style lang="scss">
.suggestion {
  position: relative;
  .avatar {
    position: relative;
    z-index: 1;
  }
  .cover {
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .subprofile {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    padding-left: calc(100px + 1rem);
    background-color: rgba(0, 0, 0, 0.39);
    border-bottom-left-radius: 0.25rem !important;
    border-bottom-right-radius: 0.25rem !important;
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
}
</style>
<script>
import User from "../models/User";
import UiUsername from "./UiUsername.vue";
export default {
  components: { UiUsername },
  props: {
    user: User,
  },
  methods: {
    copyLink() {
      const link = `${process.env.VUE_APP_APP_URL}${this.user.url}`;
      this.$copyText(link);
    },
    addToList(user) {
      this.$store.state.addToListUser = user;
    },
  },
};
</script>
