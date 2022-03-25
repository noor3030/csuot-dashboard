<template>
  <v-data-table :headers="headers" :items="users.results" class="elevation-1">
    <template v-slot:[`item.uot_url`]="{ item }">
      <a :href="item.uot_url" target="_blank">{{ item.uot_url }}</a>
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

        <v-btn color="primary" dark class="mb-2"> New Item </v-btn>
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
        <v-dialog v-model="dialogEdit" persistent :retain-focus="false">
          <v-card>
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
                    </v-text-field></v-col
                ></v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogEdit = false">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import {
  UsersService,
  Paging_User_,
  User,
  UserGender,
  UserUpdate,
} from "@/client";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      genders: Object.values(UserGender), // [UserGender.MALE, UserGender.FEMALE],
      editedItem: {} as UserUpdate,
      dialogEdit: false,
      dialogDelete: false,
      users: {} as Paging_User_,
      headers: [
        { text: "Name", value: "name" },
        { text: "English Name", value: "en_name" },
        { text: "Gender", value: "gender" },
        { text: "Uot Url", value: "uot_url" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getUsers(): void {
      UsersService.readUsersV1UsersGet().then((value) => {
        this.users = value;
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
    this.getUsers();
  },
});
</script>

<style>
</style>