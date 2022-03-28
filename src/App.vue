<template>
  <v-app>
    <Navbar v-if="hide" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "@/components/Navbar.vue";
export default Vue.extend({
  name: "App",
  components: { Navbar },
  data: () => ({}),
  computed: {
    hide() {
      return this.$route.path !== "/login";
    },
  },
  mounted() {
    this.$store.commit("getPermissions");
    console.log(this.$store.state.permissions?.users.read);
  },
});
</script>
