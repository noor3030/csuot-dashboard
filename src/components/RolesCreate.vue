<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add New Role</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="createRole"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container class="mt-5">
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                ref="name"
                v-model="roleCreate.name"
                label="Name"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                ref="enum"
                v-model="roleCreate.enum"
                label="English Name"
                required
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-treeview
              selectable
              :items="items"
              selection-type="leaf"
              v-model="selection"
              return-object
              open-all
            ></v-treeview
          ></v-row>
        </v-container>
        <v-snackbar :value="errorDetails" color="error">
          {{ errorDetails }}
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { RolesService, RoleCreate } from "@/client";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      roleCreate: {} as RoleCreate,
      selection: [],
      items: [
        {
          id: 1,
          name: "Users",
          children: [
            { id: "test", name: "create" },
            { id: 3, name: "update" },
            { id: 4, name: "read" },
            { id: 5, name: "delete" },
          ],
        },
        {
          id: 6,
          name: "Roles",
          children: [
            { id: 7, name: "create" },
            { id: 8, name: "update" },
            { id: 9, name: "read" },
            { id: 10, name: "delete" },
          ],
        },
      ],
      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },
  },
  methods: {
    createRole(): void {
      RolesService.createRole(this.roleCreate)
        .then(() => {
          this.closeDialog();

          this.$emit("roleCreated");
          // this.roleCreate = {} as RoleCreate;
        })
        .catch((error) => {
          this.errorDetails = error.body.detail;
          console.log(JSON.stringify(this.errorDetails));
        });
    },
    closeDialog() {
      this.$emit("close");
    },
  },
  watch: {
    selection(newselection, oldSelection) {
      console.log(newselection);
    },
  },
});
</script>