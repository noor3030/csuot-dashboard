<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-text-field
          height="55"
          @change="getUsers"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          filled
        >
        </v-text-field
      ></v-col>
      <v-col cols="12" sm="3">
        <v-autocomplete
          label="User Types"
          clearable
          outlined
          :items="userTypes"
          v-model="userType"
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="3">
        <v-autocomplete
          label="Roles"
          clearable
          outlined
          :items="roles"
          item-text="name"
          item-value="id"
          v-model="roleId"
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="3">
        <v-autocomplete
          label="Job Title"
          clearable
          outlined
          :items="jobTitles"
          item-text="name"
          small-chips
          item-value="id"
          chips
          v-model="jobTitlesIds"
          multiple
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      jobTitlesIds: [] as Array<string>,

      userType: null as any,
      search: null as any,
      roleId: null as any,
    };
  },
  props: {
    roles: { type: Array },
    userTypes: { type: Array },
    jobTitles: { type: Array },
  },
  methods: {
    getUsers() {
      this.$emit(
        "changed",
        this.roleId,
        this.jobTitlesIds,
        this.userType,
        this.search
      );
    },
  },
});
</script>