<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-autocomplete
      :label="$t('branches')"
        clearable
        outlined
        :items="branches"
        item-text="name"
        item-value="id"
        v-model="branch_id"
        @change="getStages"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      branch_id: undefined,
    };
  },
  props: {
    branches: { type: Object },
  },
  methods: {
    getStages() {
      this.$emit("changed", this.branch_id);
    },
  },
});
</script>