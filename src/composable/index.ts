import { VNode, PropType } from 'vue-demi';
import {
  animation,
  AnimatePosition,
  IDefaultAnimationCollection,
  IAnimationPatchParams,
} from '../types/types';

export function useProps() {
  return {
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
  };
}

export function useDefaultAnimation(
  animation: animation,
  defaultAnimationCollection: IDefaultAnimationCollection,
  animatePosition: AnimatePosition,
) {
  const getAnimation = (key: AnimatePosition) =>
    defaultAnimationCollection[key];
  let resultAnimation = animation;

  // если выбрана дефолтная анимация, ставим ее
  for (const collectionKey of Object.keys(defaultAnimationCollection)) {
    if (collectionKey === animatePosition) {
      resultAnimation = getAnimation(collectionKey);
    }
  }

  return { resultAnimation };
}

/**
 * @description path every slot item to the animation-styles and animation-classes
 * @param {VNode[]} slotContent - VNode Array slot content
 * @param {animation} resultAnimation - result animation to add every slot item
 * @param {IAnimationPatchParams} animationPatchParams - props params to patch slot item. Delay, staticStyles, animationDuration
 */
export function useOnPatchSlotContent(
  slotContent: VNode[],
  resultAnimation: animation,
  animationPatchParams: IAnimationPatchParams,
) {
  const { delay, staticStyles, animationDuration } = animationPatchParams;

  for (const [index, child] of slotContent.entries()) {
    if (child.props || child.props === null) {
      child.props = {
        ...child?.props,
        style: {
          ...child?.props?.style,
          ...staticStyles,
          animationDelay: `${index * delay}ms`,
          animationDuration: `${animationDuration}s`,
        },
        class: child?.props?.class
          ? `${child.props.class} ${resultAnimation}`
          : resultAnimation,
      };
    }
  }
}
