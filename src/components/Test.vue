<template>
  <div class="ramp_bigimg">
    <div style="width:100%;height:70%;display: table-row;">
      <img v-bind:src="url" class="qbbimg" />
    </div>
    <div style="width:100%;height:30%;display: table-row;">
      <div style="width:50%;height:100%;display: table-cell;">
        <div style="display: table-cell;float: right; margin-right: 18px;">
          <div v-bind:class="states[0]">
            <span class="zspan">正面</span>
          </div>
          <div v-bind:class="states[1]">
            <span class="fspan">反面</span>
          </div>
        </div>
      </div>
      <div
        style="width:42%;height:100%;display: table-cell;margin-left: 43px;position: relative;"
      >
        <div v-bind:class="states[2]">
          <span class="zspan">正面</span>
        </div>
        <div v-bind:class="states[3]">
          <span class="fspan">反面</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import axios from 'axios';
@Component
export default class Test extends Vue {
  private url = '';
  private imageUrl =
    'http://10.31.152.50:9091/tcdp/rcinfo/createQbbPic.htm?roadSectId=';
  private deviceid = 'NBHHZ-XI-ZK-PL';

  public states = ['open', 'black', 'open', 'black'];
  private getroadSectId() {
    let _this = this;
    axios
      .get(
        'http://10.31.152.50:9091/tcdp/rcinfo/rcinfolistForGis.htm?subDeviceId=' +
          this.deviceid
      )
      .then((res: any) => {
        _this.url = _this.imageUrl + res.data[0].fstrRoadSectId;
      });
  }
  private getroadState() {
    let _this = this;
    axios
      .get(
        'http://10.31.152.50:9091/tcdp/rcinfo/rcstate.htm?subDeviceId=' +
          this.deviceid
      )
      .then((res: any) => {
        res.data.rclampList.forEach((item: any, index: number) => {
          _this.states[index] = item.fstrState.toString();
        });
        console.log(_this.states);
      });
  }
  private mounted() {
    this.getroadSectId();
    this.getroadState();
  }
}
</script>

<style scoped>
.ramp_bigimg {
  position: absolute;
  background-image: url('../assets/images/ramp_bigimg.png');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  width: 250px;
  height: 230px;
  margin: 0 auto;
  display: table;
}
.open {
  width: 40px;
  height: 40px;
  background-image: url('../assets/images/ramp_icon_green.png');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  display: table-cell;
  text-indent: 6px;
}
.close {
  width: 40px;
  height: 40px;
  background-image: url('../assets/images/ramp_icon_red.png');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  display: table-cell;
  text-indent: 6px;
}
.black {
  width: 40px;
  height: 40px;
  background-image: url('../assets/images/ramp_icon_black.png');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  display: table-cell;
  text-indent: 6px;
}
.unknown {
  width: 40px;
  height: 40px;
  background-image: url('../assets/images/ramp_icon_yellow.png');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  display: table-cell;
  text-indent: 6px;
}
.qbbimg {
  width: 100%;
  height: 100%;
}
.zspan {
  color: white;
  font-weight: bold;
  font-size: 10px;
  position: absolute;
  bottom: 18px;
}
.fspan {
  color: #cc9933;
  font-weight: bold;
  font-size: 10px;
  position: absolute;
  bottom: 18px;
}
</style>
