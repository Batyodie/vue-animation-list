import { VNode } from 'vue-demi';
import {
  animation,
  AnimatePosition,
  IDefaultAnimationCollection,
  IAnimationPatchParams,
} from '../types/types';

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

export function useOnPatchListContent(
  slotContent: VNode[],
  resultAnimation: string,
  animationPatchParams: IAnimationPatchParams,
) {
  const { delay, staticStyles, animationDuration } = animationPatchParams;

  for (const [index, child] of slotContent.entries()) {
    child.props = {
      ...child?.props,
      style: {
        ...child?.props?.style,
        ...staticStyles,
        animationDelay: `${index * delay}ms`,
        animationDuration: `${animationDuration}s`,
      },
      class: child?.props?.class
        ? (child.props.class += ' ' + resultAnimation)
        : resultAnimation,
    };
  }
}
