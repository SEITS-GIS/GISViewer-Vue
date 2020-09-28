<template>
  <div class="demo" v-if="show">
    <div class="container">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <div class="progress">
            <div
              class="progress-bar progress-bar-info progress-bar-striped active"
              :style="{width: process}"
            >
              <div class="progress-value" v-html="process"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop, Ref} from 'vue-property-decorator';

@Component
export default class Loading extends Vue {
  private process: string = '1%';
  private show: boolean = true;
  public changeLoading(value: number) {
    let _this = this;
    if (value == 100) {
      setTimeout(() => {
        _this.process = '载入成功';
        setTimeout(() => {
          _this.show = false;
        }, 1000);
      }, 1000);
    } else {
      this.process = value.toFixed(0) + '%';
      _this.show = true;
    }
  }
}
</script>

<style scoped>
@import './loading.css';
.demo {
  padding: 0;
  position: absolute;
  right: 120px;
  top: 0.2rem;
  width: 300px;
  height: 30px;
}
.progress {
  height: 25px;
  /* background: #262626;
  padding: 5px;
  overflow: visible;
  border-radius: 20px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #7992a8;
  margin-top: 50px; */
}
.progress .progress-bar {
  border-radius: 20px;
  position: relative;
  animation: animate-positive 2s;
}
.progress .progress-value {
  /* display: block;
  padding: 3px 7px;
  font-size: 13px;
  color: #fff;
  border-radius: 4px;
  background: #191919;
  border: 1px solid #000;
  position: absolute; */
  top: 2px;
  right: -10px;
}
.progress .progress-value:after {
  /* content: '';
  border-top: 10px solid #191919;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  position: absolute;
  bottom: -6px;
  left: 26%; */
}
.progress-bar.active {
  animation: reverse progress-bar-stripes 0.4s linear infinite,
    animate-positive 2s;
}
@-webkit-keyframes animate-positive {
  0% {
    width: 0;
  }
}
@keyframes animate-positive {
  0% {
    width: 0;
  }
}
</style>
