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
        <v-toolbar-title>{{ $t("addNewStage") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="createStage"> {{ $t("save") }} </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container class="mt-5">
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-text-field
                outlined
                ref="name"
                v-model="stageCreate.name"
                :label="$t('name')"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                outlined
                ref="level"
                v-model="stageCreate.level"
                :label="$t('level')"
                required
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-autocomplete
                :label="$t('branches')"
                clearable
                outlined
                :items="branches"
                item-text="name"
                item-value="id"
                v-model="stageCreate.branch_id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                outlined
                :items="shifts"
                :label="$t('shift')"
                ref="shift"
                v-model="stageCreate.shift"
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <v-snackbar :value="errorDetails" color="error">
          {{ errorDetails }}
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { StagesService, StageCreate } from "@/client";

export default Vue.extend({
  data() {
    return {
      stageCreate: {} as StageCreate,
      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },
    branches: { type: Object },
    shifts: { type: Array },
  },
  methods: {
    createStage(): void {
      StagesService.createStage(this.stageCreate)
        .then(() => {
          this.closeDialog();

          this.$emit("stageCreated");
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