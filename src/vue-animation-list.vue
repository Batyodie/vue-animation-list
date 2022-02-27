<template>
  <div>123</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue-demi';
import { AnimatePosition } from './types/';

 const props = defineProps({
    delay: {
      type: [String, Number],
      default: 250,
    },
    animationDuration: { type: [Number], default: 1 },
    tag: { type: String, default: 'div' },
    animation: { type: String, default: 'entranceFromRight' },
    animatePosition: {
      type: String as PropType<AnimatePosition>,
      default: 'fromRight',
      validate: (prop: AnimatePosition) =>
        ['fromTop', 'fromRight', 'fromBottom', 'fromLeft'].includes(prop),
    },
    staticStyles: {
      type: Object,
      default: () => ({
        opacity: 0,
        animationFillMode: 'forwards',
      }),
    },
  });

  console.log(props.tag);

</script>
<style lang="scss" module></style>
