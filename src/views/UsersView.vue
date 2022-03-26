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
      :items="users"
      :options="{ itemsPerPage: 50 }"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      :pagination.sync="pagination"
    >
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
        @input="paginationChangeHandler"
        :value="pagination.page"
        :length="pages"
        :total-visible="7"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { UsersService, User, UserGender, UserUpdate } from "@/client";
import Vue from "vue";
import { DataOptions } from "vuetify";

export default Vue.extend({
  data() {
    return {
      users: [] as User[],
      search: null as string | null,
      pagination: { totalItems: 0, rowsPerPage: 50, page: 1 } as any,

      loading: false,
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
  watch: {
    options: {
      handler() {
        this.getUsers();
      },
      deep: true,
    },
  },
  computed: {
    pages(): number {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
        return 0;
      }

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    paginationChangeHandler(pageNumber: number) {
      this.pagination.page = pageNumber;
      this.getUsers();
    },

    getUsers(): void {
      UsersService.readUsers(
        this.pagination.page,
        this.pagination.rowsPerPage
      ).then((value) => {
        this.pagination.totalItems = value.count;
        this.users = value.results;
      });
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
  created(): void {
    // this.getUsers();
  },
});
</script>

<style>
</style>