import Vue from "vue";
import Vuex from "vuex";
import { AuthService } from "@/client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    getPermission(): void {
      AuthService.myPermissions();
    },
  },
  modules: {},
  getters: {
    isLoggedIn() {
      return localStorage.getItem("token") != null;
    },

  },
});
