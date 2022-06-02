<template>
  <div class="pa-5">
    <UserFilters
      @changed="onFilterChange"
      :roles="filter.roles"
      :userTypes="filter.userTypes"
      :roleId="filter.roleId"
      :jobTitles="filter.jobTitles"
    />

    <v-data-table
      :headers="headers"
      :items="paging.users.results"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      :server-items-length="paging.users.count"
      :options.sync="paging.options"
      @click:row="goToUserDetails"
    >
      <template v-slot:no-data>
        <v-alert :value="true" type="warning" outlined text>{{
          $t("noItemsFound")
        }}</v-alert>
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
          @click.stop="userIdEdit = item.id"
          v-show="permissionsGroup.update"
          >mdi-pencil</v-icon
        >
        <v-icon
          small
          class="pl-2"
          @click.stop="userIdDelete = item.id"
          v-show="permissionsGroup.delete"
          >mdi-delete</v-icon
        >
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("users") }}
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
              @click="dialogCreate = true"
              v-show="permissionsGroup.create"
            >
              {{ $t("newItem") }}
            </v-btn>
          </v-row>

          <UserCreateView
            @close="dialogCreate = false"
            @userCreated="getUsers"
            :show="dialogCreate"
            :jobTitles="filter.jobTitles"
            :roles="filter.roles"
            :genders="filter.genders"
            :userIdEdit="userIdEdit"
          />

          <v-dialog v-model="dialogDelete" max-width="500px"
            ><v-card>
              <v-card-title class="text-h5">{{
                $t("deleteItemMessage")
              }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog">{{
                  $t("cancel")
                }}</v-btn>

                <v-btn color="blue darken-1" text @click="deleteUser">{{
                  $t("ok")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions> </v-card
          ></v-dialog>

          <UserEditView
            :genders="filter.genders"
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
        :value="paging.options.page"
        :length="pagesLength"
        :total-visible="paging.options.itemsPerPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  app__schemas__job_title__JobTitle as JobTitle,
  JobTitlesService,
  Paging_User_,
  PermissionGroup,
  Role,
  RolesService,
  StaffType,
  User,
  UserGender,
  UsersService,
} from "@/client";
import UserCreateView from "@/components/User/UserCreateView.vue";
import UserEditView from "@/components/User/UserEditView.vue";
import UserFilters from "@/components/User/UserFilters.vue";
import { Header } from "@/types/Headers";
import Vue from "vue";

interface UsersData {
  userIdDelete: string | null;
  userIdEdit: string | null;
  loading: boolean;
  dialogCreate: boolean;

  filter: {
    search?: string;
    jobTitles: Array<JobTitle>;
    jobsTitleIds: Array<string>;
    roles: Array<Role>;
    roleId?: string;
    userTypes: Array<StaffType>;
    userType?: Array<StaffType>;
    genders: Array<UserGender>;
  };

  paging: {
    users: Paging_User_;
    options: { page: number; itemsPerPage: number };
  };
}

export default Vue.extend({
  data(): UsersData {
    return {
      userIdDelete: null,
      userIdEdit: null,
      loading: true,
      dialogCreate: false,

      filter: {
        search: undefined,
        jobTitles: [],
        jobsTitleIds: [],
        roles: [],
        roleId: undefined,
        userTypes: Object.values(StaffType),
        userType: [],
        genders: Object.values(UserGender),
      },

      paging: {
        users: { count: 0, results: [] },
        options: { page: 1, itemsPerPage: 25 },
      },
    };
  },
  computed: {
    headers(): Array<Header> {
      return [
        { text: this.$t("name"), value: "name" },
        { text: this.$t("englishName"), value: "en_name" },
        { text: this.$t("gender"), value: "gender" },
        { text: this.$t("uotUrl"), value: "uot_url" },
        { text: this.$t("color"), value: "color" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ];
    },
    permissionsGroup(): PermissionGroup {
      return this.$store.state.permissions?.users;
    },
    pagesLength(): number {
      if (
        this.paging.users.count == null ||
        this.paging.options.itemsPerPage == null
      ) {
        return 0;
      }
      return Math.ceil(
        this.paging.users.count / this.paging.options.itemsPerPage
      );
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
      this.paging.options.page = pageNumber;
      this.getUsers();
    },
    onFilterChange(
      jobTitlesIds: Array<string>,
      userType: Array<StaffType>,
      search?: string,
      roleId?: string
    ) {
      this.filter.roleId = roleId;
      this.filter.jobsTitleIds = jobTitlesIds;
      this.filter.userType = userType;
      this.filter.search = search;
      this.getUsers();
    },

    getUsers(): void {
      this.loading = true;
      UsersService.readUsers(
        this.filter.search,
        this.filter.roleId,
        this.filter.userType,
        this.filter.jobsTitleIds,
        this.paging.options.page,
        this.paging.options.itemsPerPage
      ).then((value) => {
        this.paging.users = value;
      });
      this.loading = false;
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
        this.filter.roles = value.results;
      });
    },
    getJobTitle() {
      JobTitlesService.readJobTitles(1, 100).then((value) => {
        this.filter.jobTitles = value.results;
      });
    },
    goToUserDetails(item: any) {
      this.$router.push("/user/" + item.id);
    },
  },
  components: { UserFilters, UserCreateView, UserEditView },
});
</script>

<style>
</style>