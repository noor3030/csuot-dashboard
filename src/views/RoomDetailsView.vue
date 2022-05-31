<template>
  <div>
    <v-row align="center" justify="center" class="pt-16"
      ><v-col align-self="center"
        ><v-progress-circular
          v-if="state === States.LOADING"
          :size="200"
          color="primary"
          indeterminate
        ></v-progress-circular></v-col
    ></v-row>

    <v-container v-if="state === States.SUCCESS && room">
      <v-row justify="center">
        <v-col>
          <h1>{{ room.name }}</h1>
          <p>
          {{room.type}}
          </p>
          </v-col
        >
      </v-row>
      <v-row class="mx-5"
        ><h3 >{{ $t("color") }}</h3>
        <v-icon :color="room.color"> mdi-square</v-icon>
      </v-row>
      <Timetable />
    </v-container>
    <ErrorView
      :errorDetails="errorDetails"
      :errorStatus="errorStatus"
      v-if="state === States.ERROR"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { RoomsService, Room } from "@/client";
import { States } from "@/States";
import Timetable from "pure-timetable";
import ErrorView from "@/components/ErrorView.vue";
interface RoomDetailsData {
  id?: string;
  room?: Room;
  dialog: boolean;
  state: States;
  States: any;
  errorDetails: null | string;
  errorStatus: null | number;
}
export default Vue.extend({
  data(): RoomDetailsData {
    return {
      id: undefined,
      room: undefined,
      dialog: false,
      state: States.LOADING,
      States: States,
      errorDetails: null,
      errorStatus: null,
    };
  },
  methods: {
    getRoom() {
      RoomsService.readRoom(this.id!)
        .then((value) => {
          this.room = value;
          this.state = States.SUCCESS;
          this.id = value.id;
        })
        .catch((error) => {
          this.errorDetails = error.body.detail;
          this.errorStatus = error.status;
          this.state = States.ERROR;
        });
    },
    closeEditDialog() {
      this.dialog = false;
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getRoom();
  },
  components: { Timetable, ErrorView },
});
</script>