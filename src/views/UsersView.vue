<template>
  <div>
    <v-card>
      <v-card-title
        >Search
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
    </v-card>
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
        <v-icon small class="pl-2" @click="edit(item)">mdi-pencil</v-icon>
        <v-icon small class="pl-2" @click="dialogDelete = true"
          >mdi-delete</v-icon
        >
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mb-2 mr-3"> download </v-btn>
          <v-btn color="primary" dark class="mb-2" @click="dialogCreate = true">
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
                  <v-btn dark text @click="dialogCreate = false"> Save </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field ref="name" label="Name" required>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field ref="en_name" label="English Name" required>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-select :items="genders" label="Gender"></v-select>
                    </v-col>
                  </v-row>
                  <v-row
                    ><v-col>
                      <v-text-field ref="uot_url" label="Uot Url" required>
                      </v-text-field>
                      <v-color-picker
                        :mode.sync="mode"
                        canvas-height="100"
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
                      <v-text-field
                        ref="en_name"
                        v-model="editedItem.en_name"
                        label="English Name"
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
        :length="pages"
        :total-visible="options.itemsPerPage"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  UsersService,
  User,
  UserGender,
  UserUpdate,
  Paging_User_,
} from "@/client";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      usersPaging: {} as Paging_User_,
      options: { page: 1, itemsPerPage: 25 },
      loading: true,
      //
      search: null as any,
      userType: null as any,
      roleId: null as any,
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
    };
  },
  computed: {
    pages(): number {
      if (this.options.itemsPerPage == null || this.usersPaging.count == null) {
        return 0;
      }

      return Math.ceil(this.usersPaging.count / this.options.itemsPerPage);
    },
  },
  mounted() {
    this.getUsers();
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
        this.options.page,
        this.options.itemsPerPage
      ).then((value) => {
        this.usersPaging = value;
      });
      this.loading = false;
    },

    copyUrl(item: User) {
      navigator.clipboard.writeText(
        `${window.location.origin}/users/${item.id}`
      );
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    edit(item: User) {
      this.editedItem = item;
      this.dialogEdit = true;
    },
  },
});
</script>

<style>
</style>