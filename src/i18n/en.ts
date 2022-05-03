import { en } from "vuetify/src/locale";
import localizations from "./localizations";

const local: localizations = {
  ...en,
  users: "Users",
  roles: "Roles",
  role: "Role",
  login: "Login",
  loginMessage: "Ensure your email for registration",
  errorOccurred: "Error Occurred",
};

export default local;
