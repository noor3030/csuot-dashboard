<template>
  <v-container class="pt-5">
    <v-row>
      <v-col cols="12" sm="3">
        <v-avatar width="200" height="200">
          <img :src="user.image_url" :alt="user.name" />
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="3">
        <h1>{{ user.name }}</h1>
        <a
          :href="user.uot_url"
          class="grey--text"
          style="text-decoration: none; font-size: 20px"
          ><v-icon color="grey" size="30">mdi-search-web</v-icon> UOT
        </a>
        <br />
        <p v-for="title in user.job_titles" :key="title">
          {{ title.name }}
        </p>
        <v-row
          ><h3>Color</h3>
          <v-icon :color="user.color"> mdi-square</v-icon></v-row
        >
      </v-col>
      <v-col cols="12" sm="3">
        <v-btn color="#399cf6" elevation="0" class="white--text" rounded x-large
          >Edit Profile</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import {
  UsersService,
  User,
  app__schemas__job_title__JobTitle,
} from "@/client";
export default Vue.extend({
  data() {
    return {
      id: " ",
      user: {} as User,
      jobTitles: [] as Array<app__schemas__job_title__JobTitle>,
    };
  },
  methods: {
    getUser() {
      UsersService.readUser(this.id).then((value) => {
        this.user = value;
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getUser();
  },
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
  margin-left: 104px;
  margin-top: 10px;
  color: gray;
}
h3 {
  font-family: "Tajawal", sans-serif !important;
  color: gray;
}
</style>