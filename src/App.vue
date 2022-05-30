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
  },
});
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lora&family=Nunito+Sans:wght@200&family=Outfit&family=Tajawal:wght@500&display=swap");
#app {
  font-family: "Tajawal", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>