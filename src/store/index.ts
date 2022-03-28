import Vue from "vue";
import Vuex from "vuex";
import { AuthService, Permissions } from "@/client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    permissions: null as Permissions | null,
  },
  mutations: {
    getPermissions(state): void {
      AuthService.myPermissions().then((value) => {
        console.log(value.permissions);

        state.permissions = value.permissions;

        console.log(state.permissions);

      });
    },
  },
  actions: {
    getPermissions({ commit }) {
      commit("getPermissions")
    }
  },
  modules: {},
  getters: {

    isLoggedIn() {
      return localStorage.getItem("token") != null;
    },
  },
});
