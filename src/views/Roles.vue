<template>
  <v-data-table
    :headers="headers"
    :items="roles.results"
    item-key="id"
    class="elevation-1"
    hide-default-footer
    :loading="loading"
    :server-items-length="roles.count"
  >
    <template v-slot:[`item.actions`]>
      <v-icon small class="pl-2" v-show="permissionsGroup.update"
        >mdi-pencil</v-icon
      >
      <v-icon small class="pl-2" v-show="permissionsGroup.delete"
        >mdi-delete</v-icon
      >
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ t("roles", $vuetify) }}
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2 mr-3"> download </v-btn>
        <v-btn
          color="primary"
          dark
          class="mb-2"
          v-show="permissionsGroup.create"
          @click="dialogCreate = true"
        >
          New Item
        </v-btn>
        <RolesCreate :show="dialogCreate" @close="dialogCreate = false" />
        <v-dialog max-width="500px"
          ><v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text>Cancel</v-btn>

              <v-btn color="blue darken-1" text>OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions> </v-card
        ></v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import { t } from "@/i18n/translate";
import Vue from "vue";
import { Header } from "@/types";
import RolesCreate from "@/components/RolesCreate.vue";
import { RolesService, Paging_Role_, PermissionGroup } from "@/client";
interface RolesData {
  roles: Paging_Role_;
  headers: Array<Header>;
  loading: boolean;
  dialogCreate: boolean;
}
export default Vue.extend({
  data(): RolesData {
    return {
      dialogCreate: false,
      loading: true,
      roles: { count: 0, results: [] },
      headers: [
        { text: "Name", value: "name" },
        { text: "English Name", value: "enum" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getRoles() {
      this.loading = true;
      RolesService.readRoles(1, 100).then((value) => {
        this.roles = value;
        console.log(this.roles.results);
      });
      this.loading = false;
    },
    t,
  },
  created() {
    this.getRoles();
  },
  computed: {
    permissionsGroup(): PermissionGroup {
      return this.$store.state.permissions?.roles;
    },
  },
  components: {
    RolesCreate,
  },
});
</script>