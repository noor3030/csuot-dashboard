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

    <v-container v-if="state === States.SUCCESS && stage">
      <v-row justify="center">
        <v-col>
          <h1>{{ stage.name }}</h1>
        </v-col>
      </v-row>
      <v-row justify="space-between" class="pt-10">
        <p>{{ $t("department") }} :  {{ stage.branch.department.name }}</p>
        <p>{{ $t("branch") }} : {{ stage.branch.name }}</p>
        <p>{{ $t("level") }} : {{ stage.level }}</p>
        <p>{{ $t("shift") }} : {{ stage.shift }}</p>
      </v-row>
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
import { StagesService, Stage } from "@/client";
import { States } from "@/States";
import ErrorView from "@/components/ErrorView.vue";
interface StageDetailsData {
  id?: string;
  stage?: Stage;

  state: States;
  States: any;
  errorDetails: null | string;
  errorStatus: null | number;
}
export default Vue.extend({
  data(): StageDetailsData {
    return {
      id: undefined,
      stage: undefined,

      state: States.LOADING,
      States: States,
      errorDetails: null,
      errorStatus: null,
    };
  },
  methods: {
    getStage() {
      StagesService.readStage(this.id!)
        .then((value) => {
          this.stage = value;
          this.state = States.SUCCESS;
          this.id = value.id;
        })
        .catch((error) => {
          this.errorDetails = error.body.detail;
          this.errorStatus = error.status;
          this.state = States.ERROR;
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getStage();
  },
  components: { ErrorView },
});
</script>