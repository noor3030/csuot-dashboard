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
        <v-toolbar-title>{{$t("editRoom")}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="editRoom"> {{$t("save")}} </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row class="py-10" justify="center">
          <v-col cols="12" md="3">
            <v-text-field
              ref="name"
              v-model="roomEdit.name"
               :label="$t('name')"
              required
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="types"
              v-model="roomEdit.type"
              :label="$t('roomType')"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="floors"
              v-model="roomEdit.floor_id"
             :label="$t('floor')"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="3">
            <v-autocomplete
              :items="buildings"
              v-model="roomEdit.building_id"
              :label="$t('building')"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row justify="center" align="center" class="pt-10">
          <v-color-picker
            v-model="roomEdit.color"
            hide-inputs
            canvas-height="100"
          ></v-color-picker>
        </v-row>
        <v-snackbar :value="errorDetails" color="error">
          {{ errorDetails }}
        </v-snackbar>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { RoomsService, RoomUpdate, Room } from "@/client";

export default Vue.extend({
  data() {
    return {
      mode: "hex",
      color: null,
      roomEdit: {} as RoomUpdate,

      room: {} as Room,
      errorDetails: null as null | string,
    };
  },
  props: {
    show: { type: Boolean },
    types: { type: Array },
    floors: { type: Array },
    buildings: { type: Array },
    id: { type: String },
  },
  watch: {
    id: {
      handler(newValue) {
        if (newValue) {
          this.getRoom();
        }
      },
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    getRoom() {
      RoomsService.readRoom(this.id).then((value) => {
        this.roomEdit = {
          name: value.name,
          type: value.type,
          floor_id: value.floor_id,
          id: value.id,
          building_id: value.building_id,

          color: value.color,
        } as RoomUpdate;
        this.room = value;
      });
    },
    editRoom() {
      RoomsService.updateRoom(this.id, this.roomEdit);
      this.closeDialog;
    },
  },
});
</script>