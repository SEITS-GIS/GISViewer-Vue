<template>
  <div id="home">
    <div style="float:right">
      <button @click="btn_test1">高德</button>
      <button @click="btn_test2">arcgis</button>
      <button @click="btn_test3">arcgis3d</button>
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
  private btn_test3() {
    this.$router.replace('arc3d');
  }
}
</script>

<style scoped>
#home {
  position: absolute;
  right: 0px;
  z-index: 99999999;
}
#test {
  position: absolute;
  z-index: 99;
  display: block;
}
</style>
