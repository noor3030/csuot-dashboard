import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = true;

export type LangTranslator = (
  key: string,
  ...params: Array<string | number>
) => string;

function t(key: string, ...params: Array<string | number>): string {
  return vuetify.framework.lang.t(`$vuetify.${key}`, ...params);
}
declare module "vue/types/vue" {
  export interface Vue {
    $t: LangTranslator;
  }
}

Vue.prototype.$t = t;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
