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
        <v-toolbar-title>Add New User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="createUser"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container class="mt-5">
          <v-row>
            <v-col>
              <v-avatar width="100" height="100" class="pt-2">
                <v-img :src="url"></v-img>
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
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                ref="name"
                v-model="userCreate.name"
                label="Name"
                required
              >
              </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="4">
              <v-text-field
                outlined
                ref="email"
                :rules="email"
                label="Email"
                name="email"
                type="email"
                required
                v-model="userCreate.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                ref="uot_url"
                v-model="userCreate.uot_url"
                label="Uot Url"
                required
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="4">
              <v-autocomplete
                outlined
                :items="genders"
                label="Gender"
                ref="gender"
                v-model="userCreate.gender"
              ></v-autocomplete>
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
                v-model="userCreate.job_titles"
                multiple
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
                v-model="userCreate.role_id"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-col>
            <v-color-picker
              v-model="color"
              canvas-height="100"
            ></v-color-picker>
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { UsersService, Body_users_create_user as UserCreate } from "@/client";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      color: null as any,
      email: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      url: null as null | string,
      userCreate: {} as UserCreate,
      image: null as any,
    };
  },
  props: {
    show: { type: Boolean },
    jobTitles: { type: Array },
    roles: { type: Array },
    genders: { type: Array },
  },
  methods: {
    createUser() {
      this.userCreate.image = this.image;
      this.userCreate.color = this.color.hex;
      UsersService.createUser(this.userCreate).then(() => {
        this.$emit("userCreated");
      });
      this.closeDialog();
    },
    previewImage() {
      this.url = URL.createObjectURL(this.image);
    },
    closeDialog() {
      this.$emit("close");
    },
  },
});
</script>