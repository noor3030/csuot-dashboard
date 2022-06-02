<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeEditDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t("editBranch") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="editBranch"> {{ $t("save") }} </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container class="pt-10">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                ref="name"
                v-model="branchEdit.name"
                :label="$t('name')"
                required
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                ref="en_name"
                v-model="branchEdit.en_name"
                :label="$t('englishName')"
                required
                outlined
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                ref="abbr"
                v-model="branchEdit.abbr"
                :label="$t('abbr')"
                required
                outlined
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-textarea
                auto-grow
                outlined
                ref="vision"
                v-model="branchEdit.vision"
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
                v-model="branchEdit.department_id"
              ></v-autocomplete>
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
  BranchesService,
  app__schemas__branch__Branch as BranchEdit,
  app__schemas__branch__Branch as Branch,
} from "@/client";
export default Vue.extend({
  data() {
    return {
      branchEdit: {} as BranchEdit,
      branch: {} as Branch,
    };
  },
  watch: {
    id: {
      handler(newValue) {
        if (newValue) {
          this.getBranch();
        }
      },
    },
  },
  props: {
    departments: { type: Array, required: true },
    id: { type: String },
    show: { type: Boolean, required: true },
  },
  methods: {
    closeEditDialog() {
      this.$emit("closeEditDialog");
    },
    getBranch() {
      BranchesService.readBranch(this.id).then((value) => {
        this.branchEdit = {
          name: value.name,
          en_name: value.en_name,
          vision: value.vision,
          department_id: value.department_id,
          abbr: value.abbr,
        } as BranchEdit;
        this.branch = value;
      });
    },
    editBranch() {
      BranchesService.updateBranch(this.id, this.branchEdit);
      this.closeEditDialog();
    },
  },
});
</script>