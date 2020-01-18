<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <plugin-test />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue";
import PluginTest from "@/components/PluginTest.vue";

@Component({
  components: {
    // HelloWorld,
    PluginTest
  }
})
export default class App extends Vue {}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#app {
  height: 100vh;
}
</style>
