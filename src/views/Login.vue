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
                  Sign in
                </h1>
                <h4 class="text-center mt-4">
                  Ensure your email for registration
                </h4>
                <v-form ref="form" @submit.prevent="login">
                  <v-text-field
                    color="#232f34"
                    v-model="form.email"
                    :rules="email"
                    label="Email"
                    name="email"
                    type="email"
                    prepend-icon="mdi-email"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="#232f34"
                    v-model="form.password"
                    :rules="password"
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
                      rounded
                      name="submit"
                      type="submit"
                      color="#232f34"
                      dark
                      >SIGN IN
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="4" style="background-color: #232f34">
              <v-card-text>
                <h3 class="text-center" style="color: #ffff">
                  Enter your personal details and start journay with us
                </h3>
              </v-card-text>
              <div class="text-center">
                <v-btn rounded outlined dark to="/create_account"
                  >SIGN UP</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>Error ouccurred!</v-card-title>
          <v-card-actions>
            <v-btn v-btn color="primary" text @click="dialog = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>
<script lang="ts">
import { AuthService } from "@/client";
import Vue from "vue";

export default Vue.extend({
  data() {
    const defaultForm = Object.freeze({
      password: "",
      email: "",
    });
    return {
      dialog: false,
      loading: false,
      showPassword: false,
      form: Object.assign({}, defaultForm),

      email: [
        (v: string) => !!v || "E-mail is required",
        (v: string) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      password: [(v: string) => v.length >= 8 || "Min 8 characters"],
    };
  },

  methods: {
    login() {
      AuthService.loginAccessToken({
        username: this.form.email,
        password: this.form.password,
      })
        .then((value) => {
          localStorage.setItem("token", value.access_token);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.dialog = true;
        });
      this.loading = false;
    },
  },
});
</script>