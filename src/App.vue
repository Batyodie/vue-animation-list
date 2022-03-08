<template>
  <div>
    <VueAnimationList kek="foo">
      <div class="test-block"></div>
      <div class="test-block"></div>
      <div class="test-block"></div>
    </VueAnimationList>
  </div>
</template>

<script setup lang="ts">
import VueAnimationList from './vue-animation-list.vue';
// import TestComponent from './components/test-component.vue';
</script>

<style lang="scss">
.test-block {
  width: 30px;
  height: 30px;
  background-color: red;
}

</style>
