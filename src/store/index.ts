import Vue from "vue";
import Vuex from "vuex";
import { AuthService, Permissions } from "@/client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    permissions: null as Permissions | null,
  },
  mutations: {
    getPermissions(state) {
      AuthService.myPermissions().then((value) => {
        state.permissions = value.permissions;
       
      });
     
    },
  },
  actions: {},
  modules: {},
  getters: {
    isLoggedIn() {
      return localStorage.getItem("token") != null;
    },
  },
});
