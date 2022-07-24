<template>
  <b-row class="sticky-top">
    <b-col>
      <div class="d-flex align-items-center w-100">
        <h5 class="text-uppercase p-0 my-3 flex-grow-1">
          {{ $t("general.suggestions") }}
        </h5>
        <b-link @click.prevent="slideLeft" class="mr-2">
          <i class="bi-arrow-left-circle" />
        </b-link>
        <b-link @click.prevent="slideRight">
          <i class="bi-arrow-right-circle" />
        </b-link>
      </div>
      <div ref="swiper" class="swiper w-100 overflow-hidden">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide d-block"
            v-for="(item, key) in chunkedArr"
            :key="key"
          >
            <ui-suggestion
              :user="user"
              v-for="(user, k) in item"
              :key="k"
              class="mb-2"
            />
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { Swiper } from "swiper";
import "swiper/swiper-bundle.css";
import User from "../models/User";
import UiSuggestion from "../ui/UiSuggestion.vue";
export default {
  components: { UiSuggestion },
  data: function () {
    return {
      users: [],
      swiper: null,
    };
  },
  mounted() {
    this.swiper = new Swiper(this.$refs.swiper, {
      // Optional parameters
      direction: "horizontal",
    });
    this.loadSuggestions();
  },
  computed: {
    chunkedArr() {
      const result = [];
      for (let i = 0; i < this.users.length; i += 3)
        result.push(this.users.slice(i, i + 3));
      return result;
    },
  },
  methods: {
    loadSuggestions() {
      this.$get(
        "/users",
        (data) => {
          let users = [];
          for (let obj of data.users) {
            if (data.users.role == 1){
              users.push(new User(obj));
            }
          }
          this.users = users;
          this.$nextTick(function () {
            this.swiper.update();
          });
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    slideLeft() {
      this.swiper.slidePrev();
    },
    slideRight() {
      this.swiper.slideNext();
    },
  },
};
</script>
