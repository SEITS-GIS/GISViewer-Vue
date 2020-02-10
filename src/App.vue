<template>
  <div id="app">
    <plugin-test />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PluginTest from "@/components/PluginTest.vue";

@Component({
  components: {
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
