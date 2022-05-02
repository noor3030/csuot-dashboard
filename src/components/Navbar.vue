<template>
  <nav>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          link
          :to="link.route"
          v-show="link.permission"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <span class="font-weight-light"> CS </span>
        <span>Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#fff" text @click="logout"
        ><span>Sign Out</span> <v-icon>mdi-exit-to-app</v-icon></v-btn
      >
    </v-app-bar>
  </nav>
</template>
<script lang="ts">
import { TOKEN } from "@/utils/keys";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      drawer: false,
    };
  },

  computed: {
    links() {
      return [
        { icon: "mdi-home", text: "Home", route: "/", permission: true },
        {
          icon: "mdi-account-group",
          text: "Users",
          route: "/users",
          permission: this.$store.state.permissions?.users.read || false,
        },
        {
          icon: "mdi-google-classroom",
          text: "Rooms",
          route: "/rooms",
          permission: true,
        },
        {
          icon: "mdi-table-multiple",
          text: "Schedules",
          route: "/schedules",
          permission: true,
        },
      ];
    },
  },
  methods: {
    logout() {
      localStorage.removeItem(TOKEN);
      this.$router.push("/login");
    },
  },
});
</script>