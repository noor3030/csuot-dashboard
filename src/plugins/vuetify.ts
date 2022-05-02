import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import ar from "@/i18n/ar";
import en from "@/i18n/en";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ar, en },
    current: "en",
  },
});
