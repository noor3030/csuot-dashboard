<template>
  <div>
    <v-card v-for="user in users.results" :key="user.id">
      <h1>{{ user.name }}</h1>
    </v-card>
  </div>
</template>

<script lang="ts">
import { UsersService, Paging_User_ as Users } from "@/client";

export default {
  data() {
    return {
      users: {} as Users,
    };
  },
  methods: {
    getUsers(): void {
      UsersService.readUsersV1UsersGet().then((value) => {
        this.users = value;
      });
    },
  },
  created(): void {
    this.getUsers();
  },
};
</script>

<style>
</style>