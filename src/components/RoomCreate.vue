<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-top-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t("addNewRoom")}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="createRoom"> {{$t("save")}} </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row class="py-10" justify="center">
          <v-col cols="12" md="3">
            <v-text-field
              outlined
              ref="name"
              v-model="roomCreate.name"
              :label="$t('name')"
              required
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="types"
              v-model="roomCreate.type"
              :label="$t('roomType')"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="floors"
              v-model="roomCreate.floor_id"
             :label="$t('floor')"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="buildings"
              v-model="roomCreate.building_id"
              :label="$t('building')"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row justify="center" align="center" class="pt-10">
          <v-color-picker v-model="color" canvas-height="100"></v-color-picker>
        </v-row>
        <v-snackbar :value="errorDetails" color="error">
          {{ errorDetails }}
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { RoomsService, RoomCreate } from "@/client";

import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      roomCreate: {} as RoomCreate,
      color: null as any,

      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },
    types: { type: Array },
    floors: { type: Array },
    buildings: { type: Array },
  },
  
  methods: {
    createRoom(): void {
      this.roomCreate.color = this.color.hex;
      RoomsService.createRoom(this.roomCreate)
        .then(() => {
          this.closeDialog();
          this.$emit("roomCreated");
          // this.roomCreate = {} as RoomCreate;
        })
        .catch((error) => {
          this.errorDetails = error.body.detail;
          console.log(JSON.stringify(this.errorDetails));
        });
      
    },

    closeDialog() {
      this.$emit("close");
    },
  },
});
</script>