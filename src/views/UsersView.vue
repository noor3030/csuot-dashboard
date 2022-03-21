<template>
  <v-data-table :headers="headers" :items="users.results" class="elevation-1">
    <template v-slot:[`item.uot_url`]="{ item }">
      <a :href="item.uot_url" target="_blank">{{ item.uot_url }}</a>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="pl-2" @click="copyUrl(item)" small
        >mdi-content-copy</v-icon
      >
      <v-icon small class="pl-2" @click="dialogEdit=true">mdi-pencil</v-icon>
      <v-icon small class="pl-2" @click="dialogDelete = true"
        >mdi-delete</v-icon
      >
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
       <v-dialog v-model="dialogEdit" max-width="500">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    ref="name"
                    v-model="item.name"
                    label="Name"
                    required
                  >
                  </v-text-field>
                </v-col>
               
              
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEdit">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text > Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2 mr-3"> download </v-btn>

        <v-btn color="primary" dark class="mb-2"> New Item </v-btn>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { UsersService, Paging_User_, User } from "@/client";

export default {
  data() {
    return {
      dialogDelete: false,
      dialogEdit: false,
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
    closeDelete(){
      this.dialogDelete=false
    },
    closeEdit(){
      this.dialogEdit=false
    }
  },
  created(): void {
    this.getUsers();
  },
};
</script>

<style>
</style>