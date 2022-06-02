<template>
  <div class="pa-6">
    <v-data-table
      :headers="headers"
      :items="paging.rooms.results"
      item-key="id"
      class="elevation-1"
      hide-default-footer
      :loading="loading"
      :server-items-length="paging.rooms.results"
      @click:row="goToRoomDetails"
    >
      <template v-slot:[`item.color`]="{ item }">
        <v-icon :color="item.color">mdi-square</v-icon>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="pl-2"
          v-show="permissionsGroup.update"
          @click.stop="roomIdEdit = item.id"
          >mdi-pencil</v-icon
        >
        <v-icon
          small
          class="pl-2"
          v-show="permissionsGroup.delete"
          @click.stop="roomIdDelete = item.id"
          >mdi-delete</v-icon
        >
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ t("rooms", $vuetify) }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-row justify="end">
            <v-btn color="primary">
              {{ $t("download") }}
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="mx-2"
              v-show="permissionsGroup.create"
              @click="dialogCreate = true"
            >
              {{ $t("newItem") }}
            </v-btn></v-row
          >

          <RoomCreate
            :show="dialogCreate"
            @close="dialogCreate = false"
            @roomCreated="getRooms"
            :types="types"
            :floors="floors"
            :buildings="buildings"
          />
          <RoomEdit
            :show="dialogEdit"
            @close="closeEditDialog"
            :id="roomIdEdit"
            :types="types"
            :floors="floors"
            :buildings="buildings"
          />
          <v-dialog max-width="500px" v-model="dialogDelete"
            ><v-card>
              <v-card-title class="text-h5">
                {{ $t("deleteItemMessage") }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog">{{
                  $t("cancel")
                }}</v-btn>

                <v-btn color="blue darken-1" text @click="deleteRoom">{{
                  $t("ok")
                }}</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions> </v-card
          ></v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        @input="optionsChangeHandler"
        :value="paging.options.page"
        :length="pagesLength"
        :total-visible="paging.options.itemsPerPage"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { t } from "@/i18n/translate";
import Vue from "vue";
import { Header } from "@/types/Headers";
import RoomCreate from "@/components/Room/RoomCreate.vue";
import {
  RoomsService,
  Paging_Room_,
  PermissionGroup,
  RoomType,
  FloorsService,
  BuildingsService,
  Floor,
  Building,
} from "@/client";
import RoomEdit from "@/components/Room/RoomEdit.vue";
interface RoomsData {
  paging: {
    rooms: Paging_Room_;
    options: { page: number; itemsPerPage: number };
  };
  loading: boolean;
  dialogCreate: boolean;
  types: Array<RoomType>;
  roomIdDelete: string | null;
  roomIdEdit: string | null;
  floors: Array<Floor>;
  buildings: Array<Building>;
}
export default Vue.extend({
  data(): RoomsData {
    return {
      buildings: [],
      floors: [],
      roomIdEdit: null,
      types: Object.values(RoomType),
      roomIdDelete: null,
      dialogCreate: false,
      loading: true,
      paging: {
        rooms: { count: 0, results: [] },
        options: { page: 1, itemsPerPage: 25 },
      },
    };
  },
  methods: {
    getRooms() {
      this.loading = true;
      RoomsService.readRooms(1, 100).then((value) => {
        this.paging.rooms = value;
      });
      this.loading = false;
    },
    t,
    optionsChangeHandler(pageNumber: number) {
      this.paging.options.page = pageNumber;
      this.getRooms();
    },
    deleteRoom() {
      RoomsService.deleteRoom(this.roomIdDelete!).then(() => {
        this.getRooms();
      });
      this.closeDeleteDialog();
    },
    closeDeleteDialog() {
      this.roomIdDelete = null;
    },
    closeEditDialog() {
      this.roomIdEdit = null;
    },
    getFloors() {
      FloorsService.readFloors(1, 100).then((value) => {
        this.floors = value.results;
      });
    },
    getBuildings() {
      BuildingsService.readBuildings(1, 100).then((value) => {
        this.buildings = value.results;
      });
    },
    goToRoomDetails(item: any) {
      this.$router.push("/room/" + item.id);
    },
  },
  created() {
    this.getRooms();
  },
  computed: {
    headers(): Array<Header> {
      return [
        { text: this.$t("name"), value: "name" },
        { text: this.$t("roomType"), value: "type" },
        { text: this.$t("color"), value: "color" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ];
    },
    permissionsGroup(): PermissionGroup {
      return this.$store.state.permissions?.rooms;
    },
    dialogDelete(): boolean {
      return this.roomIdDelete != null;
    },
    dialogEdit(): boolean {
      return this.roomIdEdit != null;
    },
    pagesLength(): number {
      if (
        this.paging.rooms.count == null ||
        this.paging.options.itemsPerPage == null
      ) {
        return 0;
      }
      return Math.ceil(
        this.paging.rooms.count / this.paging.options.itemsPerPage
      );
    },
  },
  components: {
    RoomCreate,
    RoomEdit,
  },
});
</script>

<style>
</style>