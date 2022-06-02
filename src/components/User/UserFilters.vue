<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-text-field
          :label="$t('search')"
          height="55"
          @change="getUsers"
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          hide-details
          filled
        >
        </v-text-field
      ></v-col>
      <v-col cols="12" sm="3">
        <v-autocomplete
          :label="$t('userTypes')"
          clearable
          outlined
          :items="userTypes"
          v-model="userType"
          @change="getUsers"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="3">
        <v-autocomplete
          :label="$t('roles')"
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
          :label="$t('jobTitle')"
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
import { StaffType } from "@/client";
import Vue from "vue";

interface UsersFilterData {
  jobTitlesIds: Array<string>;
  userType?: StaffType;
  search?: string;
  roleId?: string;
}
export default Vue.extend({
  data(): UsersFilterData {
    return {
      jobTitlesIds: [],
      userType: undefined,
      search: undefined,
      roleId: undefined,
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
        this.jobTitlesIds,
        this.userType,
        this.search,
        this.roleId
      );
    },
  },
});
</script>