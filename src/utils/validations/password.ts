import { Validation } from "@/types";

export const passwordValidation: Validation = [
  (v: string): boolean | string => v.length >= 8 || "Min 8 characters",
];
