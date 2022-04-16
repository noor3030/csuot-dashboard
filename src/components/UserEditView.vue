<template>
  <v-dialog
    v-model="showDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeEditDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row
            ><v-avatar width="100" height="100" class="pt-2">
              <img :src="userEdit.image" alt="alt" /> </v-avatar
          ></v-row>
          <v-row>
            <v-col>
              <v-text-field
                ref="name"
                v-model="userEdit.name"
                label="Name"
                required
              >
              </v-text-field>
            </v-col>

            <v-col>
              <v-select
                :items="genders"
                v-model="userEdit.gender"
                label="Gender"
              ></v-select>
            </v-col>
          </v-row>
          <v-row
            ><v-col>
              <v-text-field
                ref="uot_url"
                v-model="userEdit.uot_url"
                label="Uot Url"
                required
              >
              </v-text-field>

              <v-color-picker
                :mode.sync="mode"
                :value="userEdit.color"
                canvas-height="100"
              ></v-color-picker> </v-col
          ></v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

import { UsersService, User, Body_users_update_user as UserEdit} from "@/client";
export default Vue.extend({
  data() {
    return {
      mode: "hex",
      userEdit: {} as UserEdit,
    };
  },
  props: {
    genders: { type: Array },
    userId: { type: String },
    showDialog: { type: Boolean },
  },
  methods: {
    save() {
      this.$emit("editUser");
      this.getUser;
    },

    closeEditDialog() {
      this.$emit("closeEditDialog");
    },
    getUser() {
      UsersService.readUser(this.userId).then((value) => {
        this.userEdit.name = value.name
      });
    },
  },
  created(){
    this.getUser()
  }
});
</script>