<template>
  <v-container>
    <v-row class="pt-16">
      <v-col cols="6">
        <h1 style="color: #009fef; font-size: 200px">{{ errorStatus }}</h1>
        <h3 style="color: #5c5c5c">{{ errorDetails }}</h3>
      </v-col>
      <v-col cols="6">
        <v-img src="../assets/p1.png"></v-img> </v-col
    ></v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    errorDetails: {
      type: String,
    },
    errorStatus: {
      type: Number,
    },
  },
});
</script>
