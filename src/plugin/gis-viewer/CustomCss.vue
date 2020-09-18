<template>
  <div style="display:none" />
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop} from 'vue-property-decorator';

export default class CustomCss extends Vue {}
</script>

<style scoped>
@import './styles/custom.css';
</style>
