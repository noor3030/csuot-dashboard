<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-top-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t("addNewBranch") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="createBranch"> {{ $t("save") }} </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row class="py-10" justify="center">
          <v-col cols="12" md="3">
            <v-text-field
              outlined
              ref="name"
              v-model="branchCreate.name"
              :label="$t('name')"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              outlined
              ref="en_name"
              v-model="branchCreate.en_name"
              :label="$t('englishName')"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              outlined
              ref="abbr"
              v-model="branchCreate.abbr"
              :label="$t('abbr')"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="3">
            <v-textarea
              auto-grow
              outlined
              ref="vision"
              v-model="branchCreate.vision"
              :label="$t('vision')"
              required
            ></v-textarea
          ></v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :label="$t('department')"
              clearable
              outlined
              :items="departments"
              item-text="name"
              item-value="id"
              v-model="branchCreate.department_id"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-snackbar :value="errorDetails" color="error">
          {{ errorDetails }}
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { BranchesService, BranchCreate } from "@/client";

import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      branchCreate: {} as BranchCreate,
      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },

    departments: { type: Array },
  },

  methods: {
    createBranch(): void {
      BranchesService.createBranch(this.branchCreate)
        .then(() => {
          this.closeDialog();
          this.$emit("branchCreated");
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
});
</script>