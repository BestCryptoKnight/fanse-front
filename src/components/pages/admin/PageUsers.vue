<template>
  <b-row class="users">
    <b-col>
      <b-row class="border-bottom sticky-top page-header bg-white">
        <div class="d-flex align-items-center w-100 mx-3">
          <h5 class="text-uppercase p-0 my-3 flex-grow-1">
            {{ $t("admin.users") }}
          </h5>
          <b-nav pills>
            <b-nav-form class="mr-2">
              <b-form-input
                :placeholder="$t('admin.search')"
                v-model="q"
                class="mr-1"
              ></b-form-input>
            </b-nav-form>
            <b-nav-item to="/admin/users" exact exact-active-class="active">{{
              $t("admin.all")
            }}</b-nav-item>
            <b-nav-item
              to="/admin/users/creators"
              exact
              exact-active-class="active"
              >{{ $t("admin.creators") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/users/fans"
              exact
              exact-active-class="active"
              >{{ $t("admin.fans") }}</b-nav-item
            >
            <b-nav-item
              to="/admin/users/verification"
              exact
              exact-active-class="active"
              >{{ $t("admin.requests") }}</b-nav-item
            >
          </b-nav>
        </div>
      </b-row>
      <b-row>
        <b-table
          id="table"
          hover
          ref="table"
          responsive
          :items="loadUsers"
          :fields="fields"
          per-page="0"
          class="small nowrap"
          :current-page="page"
        >
          <template #cell(avatar)="data">
            <b-avatar :src="data.item.avatar" :to="data.item.url" size="sm" />
          </template>
          <template #cell(username)="data">
            <b-link :to="data.item.url">{{ data.item.username }}</b-link>
          </template>
          <template #cell(actions)="data">
            <div v-if="type != 'verification'">
              <b-button
                variant="primary"
                class="mr-1"
                size="sm"
                :to="'/admin/users/edit/' + data.item.id"
                >{{ $t("general.edit") }}</b-button
              >
              <b-button
                @click.prevent="del(data.item)"
                variant="danger"
                size="sm"
                >{{ $t("general.delete") }}</b-button
              >
            </div>
            <div v-else-if="type == 'verification'">
              <b-button
                size="sm"
                @click="data.toggleDetails"
                class="mr-2"
                variant="secondary"
              >
                {{ data.detailsShowing ? $t("admin.hide") : $t("admin.show") }}
              </b-button>
              <b-button
                @click.prevent="approve(data.item)"
                variant="primary"
                size="sm"
                class="mr-1"
                >{{ $t("admin.approve") }}</b-button
              >
              <b-button
                @click.prevent="decline(data.item)"
                variant="danger"
                size="sm"
                >{{ $t("admin.decline") }}</b-button
              >
            </div>
          </template>
          <template #row-details="data" v-if="type == 'verification'">
            <b-card>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.first-name") }}</b></b-col
                >
                <b-col>{{ data.item.verification.info.first_name }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.last-name") }}</b></b-col
                >
                <b-col>{{ data.item.verification.info.last_name }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.country") }}</b></b-col
                >
                <b-col>{{ data.item.verification.country }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.address") }}</b></b-col
                >
                <b-col>{{ data.item.verification.info.address }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.city") }}</b></b-col
                >
                <b-col>{{ data.item.verification.info.city }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.state") }}</b></b-col
                >
                <b-col>{{ data.item.verification.info.state }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.zip") }}</b></b-col
                >
                <b-col>{{ data.item.verification.info.zip }}</b-col>
              </b-row>
              <b-row>
                <b-col md="3" class="text-right"
                  ><b>{{ $t("general.photo-id") }}</b></b-col
                >
                <b-col
                  ><b-link @click.prevent="openPhoto(data.item)"
                    ><i class="bi-file-check" /></b-link
                ></b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-row>
      <b-row class="text-center m-3 d-block" v-if="total > 0">
        <b-pagination
          align="center"
          v-model="page"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="table"
        ></b-pagination>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import Media from "../../models/Media";
import User from "../../models/User";
import Verification from "../../models/Verification";
export default {
  data: function () {
    return {
      q: "",
      page: 1,
      total: 0,
      perPage: 1,
      fields: [
        { key: "id", label: this.$t("admin.id") },
        { key: "avatar", label: this.$t("admin.avatar"), tdClass: "full" },
        { key: "username", label: this.$t("admin.username") },
        { key: "name", label: this.$t("admin.name") },
        { key: "actions", label: this.$t("admin.actions"), tdClass: "full" },
      ],
    };
  },
  watch: {
    q() {
      this.reset();
    },
    type() {
      this.reset();
    },
  },
  computed: {
    type() {
      return this.$route.params.type;
    },
  },
  methods: {
    reset() {
      this.page = 1;
      this.$refs.table.refresh();
    },
    loadUsers(ctx, callback) {
      let url = "/users/list";
      if (this.type) {
        url += "/" + this.type;
      }
      url += "?page=" + ctx.currentPage + "&q=" + this.q;
      this.$aGet(
        url,
        (data) => {
          let users = [];
          for (let obj of data.data) {
            const user = new User(obj);
            if (obj.verification) {
              user.verification = new Verification(obj.verification);
            }
            users.push(user);
          }
          this.total = data.total;
          this.perPage = data.per_page;
          callback(users);
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    del(user) {
      this.$aPost(
        "/users/" + user.id,
        {
          _method: "DELETE",
        },
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    approve(user) {
      this.$aPost(
        "/users/verification/approve/" + user.id,
        {},
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    decline(user) {
      this.$aPost(
        "/users/verification/decline/" + user.id,
        {},
        () => {
          this.$refs.table.refresh();
        },
        (errors) => {
          console.log(errors);
        }
      );
    },
    openPhoto(user) {
      const media = new Media({
        id: 0,
        type: Media.TYPE_IMAGE,
        created_at: new Date(),
        url: user.verification.photo + "?rnd=" + Math.random(),
        screenshot: null,
      });
      this.$showPhotoSwipe([media], 0);
    },
  },
};
</script>
