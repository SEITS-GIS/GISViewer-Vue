<template>
  <div class="MapText TextDiv">
    <div v-html="content"></div>
    <div class="TextTriTop" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Ref } from "vue-property-decorator";

@Component
export default class MapToolTip extends Vue {
  @Prop({ type: String }) content!: String;
  @Prop({ type: String }) title!: String;
  @Ref() tp!: Object;
}
</script>

<style scoped>
.MapText {
  min-width: 30px;
  max-width: 260px;
  border-radius: 4px;
  position: absolute;
  text-align: left;
  color: #fff;
  padding: 8px 15px 8px 15px;
  line-height: 18px;
  font-size: 14px;
  pointer-events: none;
  z-index: 999;
}
.TextDiv {
  border: 1.5px solid #666666;
  background: #666666;
}

.TextTriTop {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
  border: 1.5px solid #666666;
  background: #666666;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -ms-transform: rotate(45deg); /* IE 9 */
  -moz-transform: rotate(45deg); /* Firefox */
  -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
  -o-transform: rotate(45deg); /* Opera */

  border-left: none;
  border-top: none;
  margin: auto;
  margin-top: 4px;
  left: 0;
  right: 0;
}
</style>
