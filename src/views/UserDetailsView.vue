<template>
  <div >
    <v-row align="center" justify="center" class="pt-16"
      ><v-col align-self="center"
        ><v-progress-circular
          v-if="state === States.LOADING"
          :size="200"
          color="primary"
          indeterminate
        ></v-progress-circular></v-col
    ></v-row>

    <v-container  v-if="state === States.SUCCESS && user">
      <v-row>
        <v-col cols="6" sm="3">
          <v-avatar width="200" height="200">
            <img :src="user.image_url" :alt="user.name" />
          </v-avatar>
        </v-col>
        <v-col cols="6" sm="3">
          <h1>{{ user.name }}</h1>
          <v-row align="center " justify="center" class="py-5">
            <p v-for="title in user.job_titles" :key="title" class="px-2">
              {{ title.name }}
            </p>
          </v-row>

          <br />

          <v-row
            ><h3>{{ $t("color") }}</h3>
            <v-icon :color="user.color"> mdi-square</v-icon>
            <a
              :href="user.uot_url"
              class="grey--text px-4"
              style="text-decoration: none; font-size: 20px"
            >
              UOT
              <v-icon color="grey" size="30">mdi-search-web</v-icon>
            </a></v-row
          >
        </v-col>
      </v-row>
      <UserEditView
        :genders="user.gender"
        :id="user.id"
        :showDialog="dialog"
        @closeEditDialog="closeEditDialog"
      />
      <Timetable :schedule="user.schedule" />
    </v-container>
    <ErrorView
      :errorDetails="errorDetails"
      :errorStatus="errorStatus"
      v-if="state === States.ERROR"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { UsersService, User } from "@/client";
import { States } from "@/States";
import UserEditView from "@/components/UserEditView.vue";
import Timetable from "pure-timetable";
import ErrorView from "@/components/ErrorView.vue";
interface UserDetailsData {
  id?: string;
  user?: User;
  dialog: boolean;
  state: States;
  States: any;
  errorDetails: null | string;
  errorStatus: null | number;
}
export default Vue.extend({
  data(): UserDetailsData {
    return {
      id: undefined,
      user: undefined,
      dialog: false,
      state: States.LOADING,
      States: States,
      errorDetails: null,
      errorStatus: null,
    };
  },
  methods: {
    getUser() {
      UsersService.readUser(this.id!)
        .then((value) => {
          this.user = value;
          this.state = States.SUCCESS;
          this.id = value.id;
        })
        .catch((error) => {
          this.errorDetails = error.body.detail;
          this.errorStatus = error.status;
          this.state = States.ERROR;
        });
    },
    closeEditDialog() {
      this.dialog = false;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
  },
  components: { UserEditView, Timetable, ErrorView },
});
</script>

<style>
.v-container {
  color: #f8fafb;
}
h1 {
  color: #364250;
}
p {
  font-size: 20px;

  color: gray;
}
h3 {
  color: gray;
}
</style>