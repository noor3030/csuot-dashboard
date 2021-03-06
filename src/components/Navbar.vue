<template>
  <nav>
    <v-navigation-drawer app v-model="drawer" bottom :right="$vuetify.rtl">
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
        <span class="font-weight-light"> CS Dashboard</span>
        <span></span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$vuetify.breakpoint.xsOnly" icon>
        <v-icon medium color="#fff">mdi-exit-to-app</v-icon></v-btn
      >
      <v-btn color="#fff" text @click="logout" v-else
        ><span> {{ $t("signOut") }}</span>
        <v-icon class="ms-1">mdi-exit-to-app</v-icon></v-btn
      >

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="$vuetify.breakpoint.xsOnly"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon medium color="#fff">mdi-web</v-icon>
          </v-btn>
          <v-btn
            v-else
            rounded
            text
            class="mx-2 white--text"
            v-bind="attrs"
            v-on="on"
          >
            {{ $t("language") }}
            <v-icon medium class="ms-1" color="#fff">mdi-web</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title @click="changeLanguage(item)">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
      items: [
        { language: "ar", rtl: true, title: "العربية" },
        { language: "en", rtl: false, title: "الانكليزية" },
      ],
    };
  },

  computed: {
    links() {
      return [
        {
          icon: "mdi-home",
          text: `${this.$t("home")}`,
          route: "/",
          permission: true,
        },
        {
          icon: "mdi-account-group",
          text: `${this.$t("users")}`,
          route: "/users",
          permission: this.$store.state.permissions?.users.read || false,
        },
        {
          icon: "mdi-google-classroom",
          text: `${this.$t("rooms")}`,
          route: "/rooms",
          permission: true,
        },
        {
          icon: "mdi-table-multiple",
          text: `${this.$t("schedules")}`,
          route: "/schedules",
          permission: true,
        },
        {
          icon: "mdi-account-check",
          text: `${this.$t("roles")}`,
          route: "/roles",
          permission: true,
        },
         {
          icon: "mdi-source-branch",
          text: `${this.$t("branches")}`,
          route: "/branches",
          permission: true,
        },
        {
          icon: "mdi-layers-triple",
          text: `${this.$t("stages")}`,
          route: "/stages",
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

    changeLanguage(item: { language: string; rtl: boolean; title: string }) {
      this.$vuetify.rtl = item.rtl;
      this.$vuetify.lang.current = item.language;
    },
  },
});
</script>