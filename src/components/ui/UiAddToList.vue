<template>
  <div>
    <b-modal
      id="modalAddToList"
      centered
      v-model="visible"
      :title="$t('general.add-to-list')"
      ref="modal"
      @show="loadLists"
    >
      <div v-for="(item, index) in lists" :key="index" class="mb-3">
        <b-form-checkbox v-model="contains[item.id]" @change="add(item.id)">{{
          item.title
        }}</b-form-checkbox>
      </div>

      <template #modal-footer>
        <b-button variant="primary" v-b-modal.modalNewList>{{
          $t("general.new-list")
        }}</b-button>
      </template>
    </b-modal>
    <b-modal
      id="modalNewList"
      ref="modalNewList"
      centered
      :title="$t('general.new-list')"
      @ok="createNewList"
    >
      <b-form @submit="createNewList" class="mx-3 mt-3">
        <ui-form-input
          type="text"
          name="title"
          v-model="newListTitle"
          :errors="errors"
          :placeholder="$t('general.enter-list-title')"
        />
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import UiFormInput from "./UiFormInput.vue";
import List from "../models/List";
export default {
  components: { UiFormInput },
  data: function () {
    return {
      lists: [],
      contains: {},
      newListTitle: "",
      errors: {},
    };
  },
  computed: {
    user() {
      return this.$store.state.addToListUser;
    },
    visible: {
      get() {
        return this.$store.state.addToListUser != null;
      },
      set() {
        this.$store.state.addToListUser = null;
      },
    },
  },
  methods: {
    loadLists() {
      let lists = [];
      this.contains = {};
      this.$get(
        "/lists/user/" + this.user.id,
        (data) => {
          for (let l of data.lists) {
            lists.push(new List(l, this));
          }
          this.lists = lists;
          for (let c of data.contains) {
            this.contains[c] = true;
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    add(listId) {
      this.$post(
        "/lists/" + this.user.id + "/" + listId,
        {},
        (data) => {
          if (data.status) {
            this.contains[listId] = true;
          } else {
            this.contains[listId] = false;
          }
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    createNewList() {
      this.$post(
        "/lists",
        {
          title: this.newListTitle,
        },
        (data) => {
          this.lists.push(new List(data, this));
        },
        (errors) => {
          this.errors = errors;
        }
      );
    },
  },
};
</script>
