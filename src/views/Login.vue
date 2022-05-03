<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card elevation="12">
          <v-row>
            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h1
                  class="text-center display-2 text--accent-3"
                  style="color: #232f34"
                >
                  {{ $t("users") }}
                </h1>
                <h4 class="text-center mt-4">
                  {{ $t("loginMessage") }}
                </h4>
                <v-form ref="form" @submit.prevent="login">
                  <v-text-field
                    color="#232f34"
                    v-model="form.email"
                    :rules="emailValidation"
                    label="Email"
                    name="email"
                    type="email"
                    prepend-icon="mdi-email"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="#232f34"
                    v-model="form.password"
                    :rules="emailValidation"
                    label="Password"
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                    prepend-icon="mdi-lock"
                    required
                  ></v-text-field>
                  <div class="text-center mt-3">
                    <v-btn
                      name="submit"
                      type="submit"
                      value="submit"
                      color="#232f34"
                      rounded
                      dark
                    >
                      Login
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>Error occurred!</v-card-title>
          <v-card-actions>
            <v-btn v-btn color="primary" text @click="dialog = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { AuthService } from "@/client";
import { TOKEN } from "@/utils/keys";
import { Validation } from "@/types";
import { emailValidation, passwordValidation } from "@/utils/validations";

interface LoginData {
  dialog: boolean;
  loading: boolean;
  showPassword: boolean;
  form: any;
  emailValidation: Validation;
  passwordValidation: Validation;
}

export default Vue.extend({
  data(): LoginData {
    const defaultForm = Object.freeze({
      password: "",
      email: "",
    });
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      form: Object.assign({}, defaultForm),
      emailValidation: emailValidation,
      passwordValidation: passwordValidation,
    };
  },

  methods: {
    login(): void {
      AuthService.loginAccessToken({
        username: this.form.email,
        password: this.form.password,
      })
        .then((value) => {
          localStorage.setItem(TOKEN, value.access_token);
          this.$router.push("/");
        })
        .catch(() => {
          this.dialog = true;
        });
      this.loading = false;
    },
  },
});
</script>