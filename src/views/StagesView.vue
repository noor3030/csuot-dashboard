<template>
  <div class="pa-6">
    <StageFilters
      :branches="branches.results"
      :branch_id="branch_id"
      @changed="onFilterChange"
    />
    <v-data-table
      :headers="headers"
      :items="stages.results"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      :server-items-length="stages.results"
      @click:row="goToStageDetails"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="pl-2"
          v-show="permissionsGroup.update"
          @click.stop="stageIdEdit = item.id"
          >mdi-pencil</v-icon
        >
        <v-icon
          small
          class="pl-2"
          v-show="permissionsGroup.delete"
          @click.stop="stageIdDelete = item.id"
          >mdi-delete</v-icon
        >
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ t("stages", $vuetify) }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-row justify="end">
            <v-btn color="primary">
              {{ $t("download") }}
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mx-2"
              v-show="permissionsGroup.create"
              @click="dialogCreate = true"
            >
              {{ $t("newItem") }}
            </v-btn></v-row
          >

          <StageCreate
            :show="dialogCreate"
            @close="dialogCreate = false"
            @stageCreated="getStages"
            :branches="branches.results"
            :shifts="shifts"
          />
          <StageEdit
            :show="dialogEdit"
            @closeEditDialog="closeEditDialog"
            @stageEdit="getStages"
            :id="stageIdEdit"
            :branches="branches.results"
            :shifts="shifts"
          />
          <v-dialog max-width="500px" v-model="dialogDelete"
            ><v-card>
              <v-card-title class="text-h5">
                {{ $t("deleteItemMessage") }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog">{{
                  $t("cancel")
                }}</v-btn>

                <v-btn color="blue darken-1" text @click="deleteStages">{{
                  $t("ok")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions> </v-card
          ></v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>


<script lang="ts">
import { t } from "@/i18n/translate";
import Vue from "vue";
import { Header } from "@/types/Headers";
import StageCreate from "@/components/Stage/StageCreate.vue";
import StageFilters from "@/components/Stage/StageFilters.vue";

import {
  StagesService,
  Paging_Stage_,
  PermissionGroup,
  BranchesService,
  Paging_Branch_,
  CollageShifts,
} from "@/client";
import StageEdit from "@/components/Stage/StageEdit.vue";
interface StageData {
  stages: Paging_Stage_;
  branches: Paging_Branch_;
  loading: boolean;
  dialogCreate: boolean;
  stageIdDelete: string | null;
  stageIdEdit: string | null;
  branch_id?: string;
  shifts: Array<CollageShifts>;
}
export default Vue.extend({
  data(): StageData {
    return {
      stageIdEdit: null,
      branches: { count: 0, results: [] },
      stageIdDelete: null,
      dialogCreate: false,
      loading: true,
      branch_id: undefined,
      stages: { count: 0, results: [] },
      shifts: Object.values(CollageShifts),
    };
  },

  methods: {
    getStages() {
      this.loading = true;
      StagesService.readStages(this.branch_id, null, 1, 100).then((value) => {
        this.stages = value;
      });
      this.loading = false;
    },

    t,
    getBranches() {
      BranchesService.readBranches(1, 100).then((value) => {
        this.branches.results = value.results;
      });
    },
    deleteStages() {
      StagesService.deleteStage(this.stageIdDelete!).then(() => {
        this.getStages();
      });
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.stageIdDelete = null;
    },
    closeEditDialog() {
      this.stageIdEdit = null;
    },
    onFilterChange(branch_id?: string) {
      this.branch_id = branch_id;
      this.getStages();
    },
      goToStageDetails(item: any) {
      this.$router.push("/stage/" + item.id);
    },
  },
  created() {
    this.getStages();
    this.getBranches();
  },
  computed: {
    headers(): Array<Header> {
      return [
        { text: this.$t("name"), value: "name" },
        { text: this.$t("shift"), value: "shift" },
        { text: this.$t("level"), value: "level" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ];
    },
    permissionsGroup(): PermissionGroup {
      return this.$store.state.permissions?.stages;
    },
    dialogDelete(): boolean {
      return this.stageIdDelete != null;
    },
    dialogEdit(): boolean {
      return this.stageIdEdit != null;
    },
  },
  components: {
    StageCreate,
    StageEdit,
    StageFilters,
  },
});
</script>

<style>
</style>