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
  actions: string;
  name: string;
  englishName: string;
  gender: string;
  uotUrl: string;
  color: string;
  noItemsFound: string;
  deleteItemMessage: string;
  ok: string;
  cancel: string;
  newItem: string;
  download: string;
}
