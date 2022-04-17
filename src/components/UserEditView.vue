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
          <v-btn dark text @click="editUser"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-avatar width="100" height="100" class="pt-2">
              <img :src="user.image_url" :alt="user.name" />
            </v-avatar>
          </v-row>
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
          <v-row>
            <v-col>
              <v-text-field
                ref="uot_url"
                v-model="userEdit.uot_url"
                label="Uot Url"
                required
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-color-picker v-model="userEdit.color" flat></v-color-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

import {
  UsersService,
  Body_users_update_user as UserEdit,
  User,
} from "@/client";
export default Vue.extend({
  data() {
    return {
      mode: "hex",
      color: null,
      userEdit: {} as UserEdit,
      user: {} as User,
    };
  },
  watch: {
    id: {
      handler(newValue) {
        if (newValue) {
          this.getUser();
        }
      },
    },
  },
  props: {
    genders: { type: Array, required: true },
    id: { type: String },
    showDialog: { type: Boolean, required: true },
  },
  methods: {
    save() {
      this.$emit("editUser");
    },

    closeEditDialog() {
      this.$emit("closeEditDialog");
    },
    getUser() {
      UsersService.readUser(this.id).then((value) => {
        console.log(value);

        this.userEdit = {
          name: value.name,
          email: value.email,
          gender: value.gender,
          uot_url: value.uot_url,
          role_id: value.role_id,
          job_titles: value.job_titles.map((value) => value.id),
          image: value.image_url,
          color: value.color,
        } as UserEdit;
        this.user = value;
      });
    },
    editUser() {
      UsersService.updateUser(this.id, this.userEdit).then((value) => {
        console.log(value);
      });
      this.closeEditDialog();
    },
  },
});
</script>