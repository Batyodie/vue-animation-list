<template>
  <render class="VListAnimation" />
</template>

<script setup lang="ts">
import { PropType } from 'vue-demi';
import { AnimatePosition, IDefaultAnimationCollection } from './types/types';
import { useDefaultAnimation, usePatchVueListContent } from './composable/';

// props
const {
  animation,
  defaultAnimationCollection,
  animatePosition,
  delay,
  staticStyles,
  animationDuration,
  tag,
} = defineProps({
  delay: {
    type: Number,
    default: 250,
  },

  animationDuration: { type: Number, default: 1 },

  tag: { type: String, default: 'div' },

  animation: { type: String, default: 'entranceFromRight' },

  animatePosition: {
    type: String as PropType<AnimatePosition>,
    default: 'fromRight',
    validator: (prop: AnimatePosition) =>
      ['fromTop', 'fromRight', 'fromBottom', 'fromLeft'].includes(prop),
  },

  staticStyles: {
    type: Object,
    default: () => ({
      opacity: 0,
      animationFillMode: 'forwards',
    }),
  },

  defaultAnimationCollection: {
    type: Object as PropType<IDefaultAnimationCollection>,
    default: () => ({
      fromTop: 'entranceFromTop',
      fromRight: 'entranceFromRight',
      fromBottom: 'entranceFromBottom',
      fromLeft: 'entranceFromLeft',
    }),
  },
});

const { resultAnimation } = useDefaultAnimation(
  animation,
  defaultAnimationCollection,
  animatePosition,
);

const defaultSlot = useSlots();
const slotContent =
  defaultSlot && defaultSlot.default ? defaultSlot.default() : [];

if (slotContent?.length) {
  usePatchVueListContent(slotContent, resultAnimation, {
    delay,
    staticStyles,
    animationDuration,
  });
}

const render = () => {
  return h(tag, slotContent);
};
</script>
