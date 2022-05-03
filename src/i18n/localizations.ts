export interface VuetifyLocale {
  [key: string]: VuetifyLocale | string;
}

export default interface localizations extends VuetifyLocale {
  appName: string;
  arabic: string;
  english: string;
  language: string;
  home: string;
  rooms: string;
  users: string;
  roles: string;
  schedules: string;
  role: string;
  login: string;
  loginMessage: string;
  errorOccurred: string;
  actions: string;
  name: string;
  signOut: string;
  englishName: string;
  gender: string;
  uotUrl: string;
  color: string;
  noItemsFound: string;
  deleteItemMessage: string;
  ok: string;
  cancel: string;
  download: string;
  newItem: string;
  jobTitle: string;
  userTypes: string;
  search: string;
  editProfile:string;
}
