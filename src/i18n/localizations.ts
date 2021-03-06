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
  editProfile: string;
  roomType: string;
  permissionItem: {
    users: string;
    roles: string;
    periods: string;
    job_titles: string;
    departments: string;
    branches: string;
    days: string;
    stages: string;
    buildings: string;
    rooms: string;
    floors: string;
    subjects: string;
    lessons: string;
    cards: string;
  };
  addNewRoom: string;
  save: string;
  building: string;
  floor: string;
  editRoom: string;
  branch:string;
  branches:string
  abbr:string
  vision:string
  addNewBranch:string
  department:string
  editBranch:string
  stage:string
  stages:string
  shift:string
  level:string
  addNewStage:string
  editStage: string;
}
