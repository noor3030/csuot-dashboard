<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card elevation="12">
          <v-row>
            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h1
                  class="text-center display-2 text--accent-3"
                  style="color: #232f34"
                >
                  User Profile
                </h1>
                <h3 class="text--secondary">Name</h3>
                <h2 style="color: #232f34">{{ user.name }}</h2>
                <h3 class="text--secondary">Color</h3>
                <v-icon :color="user.color"> mdi-square</v-icon>
                <h3 class="text--secondary">Uot Url</h3>
                <a :href="user.uot_url" target="_blank">{{ user.uot_url }}</a>
                <h3 class="text--secondary">Gender</h3>
                <h2 style="color: #232f34">{{ user.gender }}</h2>
                <h3 class="text--secondary">Job Title</h3>
                <h2
                  style="color: #232f34"
                  v-for="title in user.job_titles"
                  :key="title"
                >
                  {{ title.name }}
                </h2>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4" style="background-color: #232f34">
              <v-img :src="user.image_url" :key="user.id" sizes="99"></v-img
            ></v-col>
          </v-row>
        </v-card>
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
h2,
h3 {
  padding-top: 7px;
}
</style>