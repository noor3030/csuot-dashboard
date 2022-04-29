<template>
  <div>
    <v-progress-circular
      v-if="state === States.LOADING"
      :size="200"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <v-container class="pt-5" v-if="state === States.SUCCESS">
      <v-row class="pb-5">
        <v-col cols="6" sm="3">
          <v-avatar width="200" height="200">
            <img :src="user.image_url" :alt="user.name" />
          </v-avatar>
        </v-col>
        <v-col cols="6" sm="3">
          <h1>{{ user.name }}</h1>
          <a
            :href="user.uot_url"
            class="grey--text"
            style="text-decoration: none; font-size: 20px"
            ><v-icon color="grey" size="30">mdi-search-web</v-icon> UOT
          </a>
          <br />
          <v-row>
            <p v-for="title in user.job_titles" :key="title" class="pl-2">
              {{ title.name }}
            </p></v-row
          >
          <v-row
            ><h3>Color</h3>
            <v-icon :color="user.color"> mdi-square</v-icon></v-row
          >
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn
            color="#399cf6"
            elevation="0"
            class="white--text"
            rounded
            x-large
            @click="dialog = true"
            >Edit Profile</v-btn
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
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");

.v-container {
  color: #f8fafb;
}
h1 {
  font-family: "Tajawal", sans-serif !important;
  color: #364250;
}
p {
  font-family: "Tajawal", sans-serif !important;
  font-size: 20px;

  margin-top: 10px;
  color: gray;
}
h3 {
  font-family: "Tajawal", sans-serif !important;
  color: gray;
}
.v-progress-circular {
  margin: 300px;
  margin-left: 700px;
}
</style>