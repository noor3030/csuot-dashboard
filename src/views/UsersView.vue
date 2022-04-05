<template>
  <div class="pa-5">
    <UserFilters
      @changed="getUsers"
      :roles="roles"
      :userTypes="userTypes"
      :roleId="roleId"
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
          @click="edit(item)"
          v-show="permissionsGroup.update"
          >mdi-pencil</v-icon
        >
        <v-icon
          small
          class="pl-2"
          @click="dialogDelete = true"
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
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        ref="name"
                        v-model="userCreate.name"
                        label="Name"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        color="#232f34"
                        ref="email"
                        :rules="email"
                        label="Email"
                        name="email"
                        type="email"
                        prepend-icon="mdi-email"
                        required
                        v-model="userCreate.email"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="genders"
                        label="Gender"
                        ref="geneder"
                        v-model="userCreate.gender"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row
                    ><v-col>
                      <v-color-picker
                        :mode.sync="mode"
                        canvas-height="100"
                        ref="userCreate.color"
                      ></v-color-picker> </v-col
                  ></v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px"
            ><v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >

                <v-btn color="blue darken-1" text>OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions> </v-card
          ></v-dialog>
          <v-dialog
            v-model="dialogEdit"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialogEdit = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Edit User</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="dialogCreate = false"> Save </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-row
                    ><v-avatar width="100" height="100" class="pt-2">
                      <img :src="editedItem.image" alt="alt" /> </v-avatar
                  ></v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        ref="name"
                        v-model="editedItem.name"
                        label="Name"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-select
                        :items="genders"
                        v-model="editedItem.gender"
                        label="Gender"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row
                    ><v-col>
                      <v-text-field
                        ref="uot_url"
                        v-model="editedItem.uot_url"
                        label="Uot Url"
                        required
                      >
                      </v-text-field>
                      <v-color-picker
                        :mode.sync="mode"
                        :value="editedItem.color"
                        canvas-height="100"
                      ></v-color-picker> </v-col
                  ></v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
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
} from "@/client";

import Vue from "vue";
import { DataOptions } from "vuetify";
import UserFilters from "@/components/UserFilters.vue";
export default Vue.extend({
  data() {
    return {
      jobsTitle: [] as Array<app__schemas__job_title__JobTitle>,
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
      //

      //
      editedItem: {} as UserUpdate,
      dialogCreate: false,
      dialogEdit: false,
      dialogDelete: false,
      genders: Object.values(UserGender), // [UserGender.MALE, UserGender.FEMALE],
      mode: "hexa",
      headers: [
        { text: "Name", value: "name" },
        { text: "English Name", value: "en_name" },
        { text: "Gender", value: "gender" },
        { text: "Uot Url", value: "uot_url" },
        { text: "Color", value: "color" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      email: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
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
  },
  created() {
    console.log("Hello");

    this.getUsers();
    this.getRoles();
    this.getJobTitle();
  },
  methods: {
    optionsChangeHandler(pageNumber: number) {
      this.options.page = pageNumber;
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
      UsersService.createUser(this.userCreate).then(() => {
        this.getUsers();
      });
      this.dialogCreate = false;
    },
    copyUrl(item: User) {
      navigator.clipboard.writeText(`${process.env.BASE_URL}/users/${item.id}`);
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    edit(item: User) {
      this.editedItem = item as any;
      this.dialogEdit = true;
    },
    getRoles() {
      RolesService.readRoles(1, 100).then((value) => {
        this.roles = value.results;
        console.log(value);
      });
    },
    getJobTitle() {
      JobTitlesService.readJobTitles(1, 100).then((value) => {
        this.jobsTitle = value.results;
      });
    },
  },
  components: { UserFilters },
});
</script>

<style>
</style>