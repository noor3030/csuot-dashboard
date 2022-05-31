<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="branches.results"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      :server-items-length="branches.results"
      @click:row="goToBranchesDetails"
    >
      <template v-slot:[`item.color`]="{ item }">
        <v-icon :color="item.color">mdi-square</v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="pl-2"
          v-show="permissionsGroup.update"
          @click.stop="branchIdEdit = item.id"
          >mdi-pencil</v-icon
        >
        <v-icon
          small
          class="pl-2"
          v-show="permissionsGroup.delete"
          @click.stop="branchIdDelete = item.id"
          >mdi-delete</v-icon
        >
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ t("branches", $vuetify) }}
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

          <BranchCreate
            :show="dialogCreate"
            @close="dialogCreate = false"
            @branchCreated="getBranches"
            :departments="departments"
          />
          <BranchEdit
            :show="dialogEdit"
            @closeEditDialog="closeEditDialog"
            @branchEdit="getBranches"
            :id="branchIdEdit"
            :departments="departments"
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

                <v-btn color="blue darken-1" text @click="deleteBranches">{{
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
import BranchCreate from "@/components/BranchCreate.vue";
import {
  BranchesService,
  Paging_Branch_,
  PermissionGroup,
  Department,
  DepartmentsService,
} from "@/client";
import BranchEdit from "@/components/BranchEdit.vue";
interface BranchData {
  branches: Paging_Branch_;
  departments: Array<Department>;
  loading: boolean;
  dialogCreate: boolean;
  branchIdDelete: string | null;
  branchIdEdit: string | null;
}
export default Vue.extend({
  data(): BranchData {
    return {
      branchIdEdit: null,

      branchIdDelete: null,
      dialogCreate: false,
      loading: true,
      departments: [],
      branches: { count: 0, results: [] },
    };
  },
  methods: {
    getBranches() {
      this.loading = true;
      BranchesService.readBranches(1, 100).then((value) => {
        this.branches = value;
      });
      this.loading = false;
    },
    t,

    deleteBranches() {
      BranchesService.deleteBranch(this.branchIdDelete!).then(() => {
        this.getBranches();
      });
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.branchIdDelete = null;
    },
    closeEditDialog() {
      this.branchIdEdit = null;
    },
    getDepartment() {
      DepartmentsService.readDepartments(1, 100).then((value) => {
        this.departments = value.results;
      });
    },
    goToBranchesDetails(item: any) {
      this.$router.push("/branch/" + item.id);
    },
  },
  created() {
    this.getBranches();
    this.getDepartment();
  },
  computed: {
    headers(): Array<Header> {
      return [
        { text: this.$t("name"), value: "name" },
        { text: this.$t("englishName"), value: "en_name" },
        { text: this.$t("abbr"), value: "abbr" },
        { text: this.$t("vision"), value: "vision" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ];
    },
    permissionsGroup(): PermissionGroup {
      return this.$store.state.permissions?.branches;
    },
    dialogDelete(): boolean {
      return this.branchIdDelete != null;
    },
    dialogEdit(): boolean {
      return this.branchIdEdit != null;
    },
  },
  components: {
    BranchCreate,
    BranchEdit,
  },
});
</script>

<style>
</style>