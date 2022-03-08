<template>
  <render class="VListAnimation" />
</template>

<script setup lang="ts">
import { vueAnimatePositionProps } from './props/props';
import {
  useDefaultAnimation,
  useOnPatchListContent,
} from './composable/composable';

const {
  animation,
  defaultAnimationCollection,
  animatePosition,
  delay,
  staticStyles,
  animationDuration,
  tag,
} = defineProps({
  ...vueAnimatePositionProps,
});

const { resultAnimation } = useDefaultAnimation(
  animation,
  defaultAnimationCollection,
  animatePosition,
);

const defaultSlot = useSlots();
const slotContent =
  defaultSlot && defaultSlot.default ? defaultSlot.default() : undefined;

// onMounted(() => {
//   if (slotContent?.length) {
//     useOnPatchListContent(slotContent, resultAnimation, {
//       delay,
//       staticStyles,
//       animationDuration,
//     });
//   }
// });

useOnPatchListContent(slotContent, resultAnimation, {
  delay,
  staticStyles,
  animationDuration,
});

const render = () => {
  return h(tag, slotContent);
};
</script>
<style lang="scss">
/* stylelint-disable */

.VListAnimation {
  width: 100%;
  height: 100%;
  display: inline-flex;
}

.entranceFromTop {
  animation-duration: 2s;
  animation-name: entranceFromTop;
}

@keyframes entranceFromTop {
  from {
    opacity: 0;
    transform: translateY(-80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.entranceFromBottom {
  animation-duration: 2s;
  animation-name: entranceFromBottom;
}

@keyframes entranceFromBottom {
  from {
    opacity: 0;
    transform: translateY(80px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.entranceFromLeft {
  animation-name: entranceFromLeft;
  animation-duration: 1s;
}

@keyframes entranceFromLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.entranceFromRight {
  animation-name: entranceFromRight;
  animation-duration: 1s;
}

@keyframes entranceFromRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
