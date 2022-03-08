<template>
  <render class="VListAnimation" />
</template>

<script setup lang="ts">
import {
  useProps,
  useDefaultAnimation,
  useOnPatchSlotContent,
} from './composable/';

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
  ...useProps(),
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
  useOnPatchSlotContent(slotContent, resultAnimation, {
    delay,
    staticStyles,
    animationDuration,
  });
}

const render = () => {
  return h(tag, slotContent);
};
</script>
