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
        <v-toolbar-title>Edit Role</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="editRole"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container class="mt-5">
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                ref="name"
                label="Name"
                required
                v-model="roleEdit.name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                ref="enum"
                label="English Name"
                required
                v-model="roleEdit.enum"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <RoleTree @changed="changed" :oldPermissions="roleEdit.permissions" />
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Permissions, Role, RolesService, RoleUpdate } from "@/client";
import RoleTree from "@/components/Role/RoleTree.vue";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      roleEdit: {} as RoleUpdate,
      role: {} as Role,
    };
  },
  watch: {
    id: {
      handler(newValue) {
        if (newValue) {
          this.getRole();
        }
      },
    },
  },
  props: {
    show: { type: Boolean },
    id: { type: String },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    editRole() {
      RolesService.updateRole(this.id, this.roleEdit);
    },
    getRole() {
      RolesService.readRole(this.id).then((value) => {
        this.roleEdit = {
          name: value.name,
          enum: value.enum,
          permissions: value.permissions,
        } as RoleUpdate;
      });
    },
    changed(permission: Permissions) {
      this.roleEdit.permissions = permission;
    },
  },
  components: {
    RoleTree,
  },
});
</script>