import Vue from "vue";
import Vuex from "vuex";
import { AuthService, Permissions } from "@/client";
import { TOKEN } from "@/utils/keys";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    permissions: null as Permissions | null,
  },
  mutations: {
    getPermissions(state) {
      AuthService.getMyPermissions().then((value) => {
        state.permissions = value.permissions;
      });
    },
  },
  actions: {},
  modules: {},
  getters: {
    isLoggedIn() {
      return localStorage.getItem(TOKEN) != null;
    },
  },
});
