<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="3">
        <v-text-field
          height="55"
          @change="getUsers"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          filled
          rounded
        >
        </v-text-field
      ></v-col>
      <v-col cols="6" sm="3">
        <v-autocomplete
          label="User Types"
          rounded
          clearable
          outlined
          :items="userTypes"
          v-model="userType"
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6" sm="3">
        <v-autocomplete
          label="Roles"
          rounded
          clearable
          outlined
          :items="roles"
          item-text="name"
          item-value="id"
          v-model="roleId"
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
      <v-col cols="6" sm="3">
        <v-autocomplete
          label="Job Title"
          rounded
          clearable
          outlined
          :items="jobsTitle"
          item-text="name"
          small-chips
          item-value="id"
          chips
          v-model="jobsTitleIds"
          multiple
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import {
  app__schemas__job_title__JobTitle,
  Role,
  StaffType,
  JobTitlesService,
  RolesService,
} from "@/client";
export default Vue.extend({
  data() {
    return {
      jobsTitle: [] as Array<app__schemas__job_title__JobTitle>,
      jobsTitleIds: [] as Array<string>,

      userType: null as any,
      search: null as any,
    };
  },
  props: {
    roles: { type: Array },
    userTypes: { type: Object },
    roleId: { type: String },
  },
  methods: {
    getUsers() {
      this.$emit("changed");
    },

    getJobTitle() {
      JobTitlesService.readJobTitles(1, 100).then((value) => {
        this.jobsTitle = value.results;
      });
    },
  },
  created() {
    this.getJobTitle();
  },
});
</script>