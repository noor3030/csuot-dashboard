// {{ t("key", $vuetify) }}

export interface VuetifyLocale {
  [key: string]: VuetifyLocale | string;
}

export default interface localizations extends VuetifyLocale {
  users: string;
  roles: string;
  role: string;
  login: string;
  loginMessage: string;
  errorOccurred: string;
}
