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
          <button @click="test">test</button>
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
import { RolesService, RoleCreate, Permissions } from "@/client";
import Vue from "vue";
import { tr } from "vuetify/src/locale";

type TreeItem = {
  id: string;
  name: string;
  children?: Array<TreeItem>;
};
type SelectItem = {
  name: string;
  id: string;
};
export default Vue.extend({
  data() {
    return {
      roleCreate: {} as RoleCreate,
      selection: [] as Array<SelectItem>,
      permissions: [
        "users",
        "roles",
        "periods",
        "job_titles",
        "departments",
        "branches",
        "days",
        "stages",
        "buildings",
        "rooms",
        "floors",
        "subjects",
        "lessons",
        "cards",
      ],
      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },
  },
  methods: {
    test() {
      console.log(this.permission);
    },
    createRole(): void {
      this.roleCreate.permissions = this.permission;
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
    selection(newSelection, _) {
      console.log(newSelection);
    },
  },
  computed: {
    items(): Array<TreeItem> {
      let itemList: Array<TreeItem> = [];
      for (let i = 0; i < this.permissions.length; i++) {
        const element = this.permissions[i];
        const item: TreeItem = {
          id: element,
          name: this.$t(`permissionItem.${element}`),
          children: [
            { id: `${element}-create`, name: "create" },
            { id: `${element}-update`, name: "update" },
            { id: `${element}-read`, name: "read" },
            { id: `${element}-delete`, name: "delete" },
          ],
        };
        itemList.push(item);
      }
      return itemList;
    },
    permission() {
      let _permission: any = {} as Permissions;

      this.permissions.forEach((group) => {
        // _permission["users"] = {};
        _permission[group] = {
          read: false,
          create: false,
          update: false,
          delete: false,
        };

        this.selection.forEach((select) => {
          // users, create
          let [selectedGroup, action] = select.id.split("-");

          if (group == selectedGroup) {
            // _permission["users"]["create"] = true;
            _permission[group][action] = true;
          }
        });
      });

      return _permission;
    },
  },
});
</script>