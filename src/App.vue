<template>
  <div :class="$style.app">
    {{ value }}
  </div>
</template>
<script lang="ts" setup>
const value = ref(0);

</script>
<style lang="scss" module>
.app {
  color: red;
  display: grid;

  &::placeholder {
    color: gray;
  }
}
</style>
