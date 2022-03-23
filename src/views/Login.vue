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
                    label="E-mail"
                    value="pts2@gmail.com"
                    :rules="rules.email"
                    required
                    prepend-icon="mdi-email"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    color="#232f34"
                    v-model="form.password"
                    name="input-10-2"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="rules.passowrd"
                    hint="At least 8 characters"
                    class="input-group--focused"
                    @click:append="showPassword = !showPassword"
                    prepend-icon="mdi-lock"
                  ></v-text-field>
                  <div class="text-center mt-3">
                    <v-btn rounded type="submit" color="#232f34" dark 
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
  </v-container>
</template>
<script lang="ts">
import { AuthService } from "@/client";

export default {
  data() {
    const defaultForm = Object.freeze({
      password: "",
      email: "",
    });
    return {
      showPassword: true,
      form: Object.assign({}, defaultForm),
      rules: {
        email: [
          (v: any) => !!v || "E-mail is required",
          (v: any) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: [(v: any) => v.length >= 8 || "Min 8 characters"],
      },
    };
  },
  methods: {
    login() {
      AuthService.loginAccessTokenV1AuthLoginAccessTokenPost({
        username: this.form.email,
        password: this.form.password,
      });
    },
  },
};
</script>