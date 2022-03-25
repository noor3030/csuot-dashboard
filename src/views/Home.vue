<template>
  <div class="home">
    <h1>hello</h1>
     <v-btn color="error" @click="logout">logOut</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {},
  methods: {
  logout(){
    localStorage.removeItem("token")
     this.$router.push('/login')
  }
},
});
</script>
