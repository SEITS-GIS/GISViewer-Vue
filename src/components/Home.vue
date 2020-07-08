<template>
  <div id="home">
    <div style="float:right">
      <button @click="btn_test1">高德</button>
      <button @click="btn_test2">arcgis</button>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
@Component
export default class Home extends Vue {
  private btn_test1() {
    this.$router.replace('gd');
  }
  private btn_test2() {
    this.$router.replace('arc');
  }
}
</script>

<style scoped>
#home {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  z-index: 99999999;
}
#test {
  position: absolute;
  z-index: 99;
  display: block;
}
</style>
