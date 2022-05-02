import { Validation } from "@/types";

export const emailValidation: Validation = [
  (v: string): boolean | string => !!v || "E-mail is required",
  (v: string): boolean | string => /.+@.+/.test(v) || "E-mail must be valid",
];
