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
            <v-col>
              <v-avatar width="100" height="100" class="pt-2">
                <v-img v-if="image" :src="url"></v-img>
                <img v-else :src="user.image_url" :alt="user.name" />
              </v-avatar>
              <v-file-input
                @change="previewImage"
                v-model="image"
                accept="image/png, image/jpeg"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                hide-input
              >
              </v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                ref="name"
                v-model="userEdit.name"
                label="Name"
                required
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                ref="uot_url"
                v-model="userEdit.uot_url"
                label="Uot Url"
                required
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-autocomplete
                label="Job Title"
                clearable
                outlined
                :items="jobTitles"
                item-text="name"
                small-chips
                item-value="id"
                chips
                v-model="userEdit.job_titles"
                multiple
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4">
              <v-autocomplete
                :items="genders"
                v-model="userEdit.gender"
                label="Gender"
                outlined
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4">
              <v-autocomplete
                label="Roles"
                clearable
                outlined
                :items="roles"
                item-text="name"
                item-value="id"
                v-model="userEdit.role_id"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-color-picker
                v-model="userEdit.color"
                flat
                hide-inputs
              ></v-color-picker>
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
  RolesService,
  JobTitlesService,
  Role,
  app__schemas__job_title__JobTitle as JobTitle,
} from "@/client";
export default Vue.extend({
  data() {
    return {
      mode: "hex",
      color: null,
      userEdit: {} as UserEdit,
      user: {} as User,
      url: null as null | string,
      image: null as any,
      roles: [] as Array<Role>,
      jobTitles: [] as Array<JobTitle>,
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
    getRoles() {
      RolesService.readRoles(1, 100).then((value) => {
        this.roles = value.results;
      });
    },
    getJobTitle() {
      JobTitlesService.readJobTitles(1, 100).then((value) => {
        this.jobTitles = value.results;
      });
    },
    previewImage() {
      this.url = URL.createObjectURL(this.image);
      console.log(this.image, this.url);
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
      if (this.image) {
        this.userEdit.image = this.image;
      }
      UsersService.updateUser(this.id, this.userEdit).then((value) => {
        console.log(value);
      });
      this.closeEditDialog();
    },
  },
  created() {
    this.getRoles();
    this.getJobTitle();
  },
});
</script>