<template>
  <div class="home">
    <nav>
      <v-toolbar color="primary" app>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="white--text"
        ></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-light"> CS </span>
          <span>Dashboard</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn flat color="#fff" text @click="logout"
          ><span>Sign Out</span> <v-icon>mdi-exit-to-app</v-icon></v-btn
        >
      </v-toolbar>
      <v-navigation-drawer app v-model="drawer">
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            link
            :to="link.route"
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
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-account-group", text: "Users", route: "/users" },
        { icon: "mdi-google-classroom", text: "Rooms", route: "/rooms" },
        { icon: "mdi-table-multiple", text: "Schedules", route: "/schedules" },
      ],
    };
  },
  components: {},
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
});
</script>
