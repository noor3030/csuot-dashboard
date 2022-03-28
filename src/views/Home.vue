<template>
  <div class="home">
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Home",
    components: {},
    created(){
    console.log("Hello"+this.$store.state.permissions);

    }
});
</script>
