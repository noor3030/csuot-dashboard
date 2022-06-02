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
        <v-toolbar-title>{{ $t("editStage") }}</v-toolbar-title>
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
                v-model="stageEdit.name"
                :label="$t('name')"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                outlined
                ref="level"
                v-model="stageEdit.level"
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
                v-model="stageEdit.branch_id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                outlined
                :items="shifts"
                :label="$t('shift')"
                ref="shift"
                v-model="stageEdit.shift"
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
import { StagesService, StageUpdate ,} from "@/client";

export default Vue.extend({
  data() {
    return {
      stageEdit: {} as StageUpdate,
      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },
    branches: { type: Object },
    shifts: { type: Array },
    id: { type: String },
  },
  methods: {
    createStage(): void {
      StagesService.updateStage(this.id, this.stageEdit)
        .then(() => {
          this.closeDialog();

          this.$emit("stageEdit");
        })
        .catch((error) => {
          this.errorDetails = error.body.detail;
          console.log(JSON.stringify(this.errorDetails));
        });
    },
    getStage() {
      StagesService.readStage(this.id).then((value) => {
        this.stageEdit = {
          name: value.name,
          level: value.level,
          shift: value.shift,
          branch_id: value.branch_id,
        } as StageUpdate;
      });
    },
    closeDialog() {
      this.$emit("closeEditDialog");
    },
  },
  created() {
    this.getStage();
  },
});
</script>