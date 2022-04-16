<template>
  <div class="pa-5">
    <UserFilters
      @changed="onFilterChange"
      :roles="roles"
      :userTypes="userTypes"
      :roleId="roleId"
      :jobTitles="jobTitles"
    />

    <v-data-table
      :headers="headers"
      :items="usersPaging.results"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      :server-items-length="usersPaging.count"
      :options.sync="options"
    >
      <template v-slot:no-data>
        <v-alert :value="true" type="warning" outlined text
          >No items found, Add one!</v-alert
        >
      </template>
      <template v-slot:[`item.uot_url`]="{ item }">
        <a :href="item.uot_url" target="_blank">{{ item.uot_url }}</a>
      </template>
      <template v-slot:[`item.color`]="{ item }">
        <v-icon :color="item.color">mdi-square</v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="pl-2" @click="copyUrl(item)" small
          >mdi-content-copy</v-icon
        >
        <v-icon
          small
          class="pl-2"
          @click="userIdEdit = item.id"
          v-show="permissionsGroup.update"
          >mdi-pencil</v-icon
        >
        <v-icon
          small
          class="pl-2"
          @click="userIdDelete = item.id"
          v-show="permissionsGroup.delete"
          >mdi-delete</v-icon
        >
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2 mr-3"> download </v-btn>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="dialogCreate = true"
            v-show="permissionsGroup.create"
          >
            New Item
          </v-btn>
          <UserCreateView
            :dialogCreate="dialogCreate"
            @clicked="createUser"
            :jobTitles="jobTitles"
            :roles="roles"
            :userCreate="userCreate"
            :genders="genders"
            :userIdEdit="userIdEdit"
          />

          <v-dialog v-model="dialogDelete" max-width="500px"
            ><v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                  >Cancel</v-btn
                >

                <v-btn color="blue darken-1" text @click="deleteUser">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions> </v-card
          ></v-dialog>

          <UserEditView
            :genders="genders"
            :showDialog="dialogEdit"
            :id="userIdEdit"
            @closeEditDialog="closeEditDialog"
          />
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        @input="optionsChangeHandler"
        :value="options.page"
        :length="pagesLength"
        :total-visible="options.itemsPerPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  app__schemas__job_title__JobTitle,
  RolesService,
  JobTitlesService,
  Role,
  UsersService,
  User,
  UserGender,
  StaffType,
  Body_users_update_user as UserUpdate,
  Paging_User_,
  PermissionGroup,
  Body_users_create_user as UserCreate,
  UserType,
  Body_users_update_user,
} from "@/client";

import Vue from "vue";
import { DataOptions } from "vuetify";
import UserFilters from "@/components/UserFilters.vue";
import UserCreateView from "@/components/UserCreateView.vue";
import UserEditView from "@/components/UserEditView.vue";

export default Vue.extend({
  data() {
    return {
      userIdDelete: null as string | null,
      userIdEdit: null as string | null,

      jobTitles: [] as Array<app__schemas__job_title__JobTitle>,
      jobsTitleIds: [] as Array<string>,
      roles: [] as Array<Role>,
      roleId: null as any,
      userType: null as any,
      userTypes: Object.values(StaffType),
      search: null as any,
      userCreate: {} as UserCreate,
      usersPaging: { count: 0, results: [] } as Paging_User_,

      options: { page: 1, itemsPerPage: 25 } as DataOptions,
      loading: true,

      dialogCreate: false,

      genders: Object.values(UserGender),
      mode: "hex",
      color: null as any,
      headers: [
        { text: "Name", value: "name" },
        { text: "English Name", value: "en_name" },
        { text: "Gender", value: "gender" },
        { text: "Uot Url", value: "uot_url" },
        { text: "Color", value: "color" },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    permissionsGroup(): PermissionGroup {
      return this.$store.state.permissions?.users || {};
    },
    pagesLength(): number {
      if (this.usersPaging.count == null || this.options.itemsPerPage == null) {
        return 0;
      }
      return Math.ceil(this.usersPaging.count / this.options.itemsPerPage);
    },
    dialogDelete(): boolean {
      return this.userIdDelete != null;
    },
    dialogEdit(): boolean {
      return this.userIdEdit != null;
    },
  },
  created() {
    this.getUsers();
    this.getRoles();
    this.getJobTitle();
  },

  methods: {
    optionsChangeHandler(pageNumber: number) {
      this.options.page = pageNumber;
      this.getUsers();
    },
    onFilterChange(
      roleId: string | null,
      jobTitlesIds: Array<string>,
      userType: UserType | null,
      search: string | null
    ) {
      this.roleId = roleId;
      this.jobsTitleIds = jobTitlesIds;
      this.userType = userType;
      this.search = search;
      this.getUsers();
    },

    getUsers(): void {
      this.loading = true;
      UsersService.readUsers(
        this.search,
        this.roleId,
        this.userType,
        this.jobsTitleIds,
        this.options.page,
        this.options.itemsPerPage
      ).then((value) => {
        this.usersPaging = value as Paging_User_;
      });
      this.loading = false;
    },
    createUser() {
      this.userCreate.color = this.color.hex;
      UsersService.createUser(this.userCreate).then(() => {
        this.getUsers();
      });
      this.dialogCreate = false;
    },
    deleteUser() {
      UsersService.deleteUser(this.userIdDelete!).then(() => {
        this.getUsers();
      });
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.userIdDelete = null;
    },
    closeEditDialog() {
      this.userIdEdit = null;
    },
    copyUrl(item: User) {
      navigator.clipboard.writeText(`${process.env.BASE_URL}/users/${item.id}`);
    },

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
  },
  components: { UserFilters, UserCreateView, UserEditView },
});
</script>

<style>
</style>