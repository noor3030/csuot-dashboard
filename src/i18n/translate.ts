export function t(key: string, vuetify: any): string {
  return vuetify.lang.translator(`$vuetify.${key}`);
}
