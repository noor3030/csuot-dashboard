<template>
  <v-dialog
    v-model="dialogCreate"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialogCreate = false">
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
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-text-field
                class="mr-3"
                rounded
                outlined
                ref="name"
                v-model="userCreate.name"
                label="Name"
                required
              >
              </v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 md6>
              <v-text-field
                rounded
                outlined
                color="#232f34"
                ref="email"
                :rules="email"
                label="Email"
                name="email"
                type="email"
                required
                v-model="userCreate.email"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-autocomplete
                rounded
                outlined
                :items="genders"
                label="Gender"
                ref="gender"
                v-model="userCreate.gender"
              ></v-autocomplete>
            </v-flex>
          </v-layout>
          <v-row>
            <v-col>
              <v-autocomplete
                label="Job Title"
                rounded
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
            <v-col>
              <v-autocomplete
                label="Roles"
                rounded
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
              :mode.sync="mode"
              canvas-height="100"
              ref="userCreate.color"
            ></v-color-picker>
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      mode: "hex",
      color: null as any,
      email: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  props: {
    dialogCreate: { type: Boolean },
    jobTitles: { type: Array },
    roles: { type: Array },
    userCreate: { type: Object },
    genders: { type: Array },
  },
  methods: {
    createUser() {
      this.$emit("clicked");
    },
  },
});
</script>