<template>
  <v-dialog
    v-model="dialogEdit"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialogEdit = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit User</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="editUser"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row
            ><v-avatar width="100" height="100" class="pt-2">
              <img :src="editedItem.image" alt="alt" /> </v-avatar
          ></v-row>
          <v-row>
            <v-col>
              <v-text-field
                ref="name"
                v-model="editedItem.name"
                label="Name"
                required
              >
              </v-text-field>
            </v-col>

            <v-col>
              <v-select
                :items="genders"
                v-model="editedItem.gender"
                label="Gender"
              ></v-select>
            </v-col>
          </v-row>
          <v-row
            ><v-col>
              <v-text-field
                ref="uot_url"
                v-model="editedItem.uot_url"
                label="Uot Url"
                required
              >
              </v-text-field>

              <v-color-picker
                :mode.sync="mode"
                :value="editedItem.color"
                canvas-height="100"
              ></v-color-picker> </v-col
          ></v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
       mode: "hex",
    }
  },
  props: {
    dialogEdit: { type: Boolean },
    editedItem: { type: Object },
    genders: { type: Array },
  },
  methods:{
    editUser(){
      this.$emit("editUser")
    }
  }
});
</script>