<template>
  <render :class="defaultRootCssClass" />
</template>

<script setup lang="ts">
import { PropType } from 'vue-demi';
import { AnimatePosition, IDefaultAnimationCollection } from './types/types';
import { useDefaultAnimation, usePatchVueListContent } from './composable/';
import {
  DEFAULT_ANIMATE_POSITION,
  DEFAULT_ANIMATION,
  DEFAULT_ANIMATION_COLLECTION,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_DELAY_COUNT,
  DEFAULT_ROOT_CSS_CLASS,
  DEFAULT_STATIC_STYLES,
  DEFAULT_TAG,
} from './constants/';

// props
const {
  animation,
  defaultAnimationCollection,
  animatePosition,
  delay,
  staticStyles,
  animationDuration,
  tag,
  defaultRootCssClass,
} = defineProps({
  delay: {
    type: Number,
    default: DEFAULT_DELAY_COUNT,
  },

  animationDuration: { type: Number, default: DEFAULT_ANIMATION_DURATION },

  tag: { type: String, default: DEFAULT_TAG },

  animation: { type: String, default: DEFAULT_ANIMATION },

  animatePosition: {
    type: String as PropType<AnimatePosition>,
    default: DEFAULT_ANIMATE_POSITION,
    validator: (prop: AnimatePosition) =>
      ['fromTop', 'fromRight', 'fromBottom', 'fromLeft'].includes(prop),
  },

  staticStyles: {
    type: Object,
    default: () => DEFAULT_STATIC_STYLES,
  },

  defaultAnimationCollection: {
    type: Object as PropType<IDefaultAnimationCollection>,
    default: () => DEFAULT_ANIMATION_COLLECTION,
  },

  defaultRootCssClass: {
    type: String,
    default: DEFAULT_ROOT_CSS_CLASS,
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
