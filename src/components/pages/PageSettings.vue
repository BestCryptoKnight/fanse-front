<template>
  <b-row class="settings" v-if="user != null">
    <b-col>
      <b-row class="border-bottom sticky-top bg-white page-header">
        <div class="d-flex align-items-center w-100 mx-3">
          <b-link @click="$router.go(-1)">
            <i class="bi-arrow-left" />
          </b-link>
          <h5 class="text-uppercase p-0 my-3 mx-2 flex-grow-1">
            {{ $t("general.settings") }}
          </h5>
          <b-button @click.prevent="saveSettings">{{
            $t("general.save")
          }}</b-button>
        </div>
      </b-row>
      <b-row>
        <div class="bg-light cover w-100 position-relative">
           <b-img :src="user.cover + '?rnd=' + rnd" v-if="user.cover != null" />
          <div class="buttons">
            <b-button
              variant="icon"
              class="p-0 mr-3"
              @click.prevent="clck('cover')"
            >
              <i class="bi-image text-white" />
            </b-button>
            <b-button variant="icon" class="p-0">
              <i class="bi-x-circle text-white" @click.prevent="del('cover')" />
            </b-button>
          </div>
        </div>
        <div class="avatar position-relative ml-3 rounded-circle">
          <b-avatar :src="user.avatar + '?rnd=' + rnd" text=" " size="100px" />
          <div class="buttons d-flex">
            <b-button
              variant="icon"
              class="p-0 mr-3"
              @click.prevent="clck('avatar')"
            >
              <i class="bi-image text-white" />
            </b-button>
            <b-button variant="icon" class="p-0">
              <i
                class="bi-x-circle text-white"
                @click.prevent="del('avatar')"
              />
            </b-button>
          </div>
        </div>
      </b-row>
      <b-row>
        <b-form @submit="saveSettings" class="w-100 mx-3 mt-3">
          <ui-form-input
            type="text"
            name="username"
            v-model="user.username"
            :errors="errors"
            :label="$t('general.username')"
          />
          <ui-form-input
            type="text"
            name="name"
            v-model="user.name"
            :errors="errors"
            :label="$t('general.full-name')"
          />
          <ui-form-textarea
            name="bio"
            maxlength="250"
            v-model="user.bio"
            :errors="errors"
            :label="$t('general.bio')"
          />
          <ui-form-input
            type="text"
            name="location"
            v-model="user.location"
            :errors="errors"
            :label="$t('general.location')"
          />
          <ui-form-input
            type="url"
            name="website"
            v-model="user.website"
            :errors="errors"
            :label="$t('general.website')"
          />
          <ui-form-input
            type="url"
            name="instagram"
            v-model="user.instagram"
            :errors="errors"
            :label="$t('general.instagram')"
            
          />
          <ui-form-input
            type="url"
            name="twitter"
            v-model="user.twitter"
            :errors="errors"
            :label="$t('general.twitter')"
          />
          <ui-form-input
            type="url"
            name="snapchat"
            v-model="user.snapchat"
            :errors="errors"
            :label="$t('general.snapchat')"
          />
          <ui-form-input
            type="url"
            name="tiktok"
            v-model="user.tiktok"
            :errors="errors"
            :label="$t('general.tiktok')"
          />
        </b-form>
      </b-row>
      <b-row>
        <b-card no-body :header="$t('general.security')" class="w-100 m-3">
          <b-list-group flush>
            <b-list-group-item to="/settings/password">{{
              $t("general.password")
            }}</b-list-group-item>
            <b-list-group-item to="/settings/email">{{
              $t("general.email")
            }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-row>
      <b-row>
        <b-card  no-body :header="$t('general.subscription')" class="w-100 m-3">
          <b-list-group flush>
            <b-list-group-item v-if="user.isCreator" to="/settings/price">{{
              $t("general.price-bundles")
            }}</b-list-group-item>
            <b-list-group-item v-if="!user.isCreator" to="/payouts">{{
              $t("general.become")
            }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-row>
    </b-col>
    <input type="file" ref="avatar" hidden @change="upload('avatar')" />
    <input type="file" ref="cover" hidden @change="upload('cover')" />
  </b-row>
</template>
<style lang="scss">
.settings {
  .cover,
  .avatar {
    z-index: 2;
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
      z-index: 3;
    }
  }
  .cover {
    height: 180px;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  .avatar {
    margin-top: -50px;
    z-index: 3;
    &:after {
      border-radius: 50%;
    }
  }
}
</style>
<script>
import User from "../models/User";
import UiFormInput from "../ui/UiFormInput.vue";
import UiFormTextarea from "../ui/UiFormTextarea.vue";
export default {
  data: function () {
    return {
      user: null,
      rnd: Math.random(),
      errors: {},
    };
  },
  components: {
    UiFormInput,
    UiFormTextarea,
  },
  mounted() {
    this.loadUser();
  },
  methods: {
    loadUser() {
      this.$get(
        "/auth/me",
        (data) => {
          this.user = new User(data);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    saveSettings() {
      this.errors = {};
      this.$post(
        "/profile",
        {
          username: this.user.username,
          name: this.user.name,
          bio: this.user.bio,
          location: this.user.location,
          website: this.user.website,
          instagram: this.user.instagram,
          twitter: this.user.twitter,
          snapchat: this.user.snapchat,
          tiktok: this.user.tiktok,
        },

        (data) => {
          this.user = new User(data);
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
    clck(type) {
      this.$refs[type].click();
    },
    upload(type) {
      let formData = new FormData();
      formData.append("image", this.$refs[type].files[0]);
      this.$post(
        "/profile/image/" + type,
        formData,
        (data) => {
          this.user = new User(data);
          this.$saveUser(data);
          this.rnd = Math.random();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del(type) {
      this.$post(
        "/profile/image/" + type,
        {},
        (data) => {
          this.user = new User(data);
          this.$saveUser(data);
          this.rnd = Math.random();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
  },
};
</script>
