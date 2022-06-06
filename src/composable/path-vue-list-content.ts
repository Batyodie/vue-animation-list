import { VNode } from 'vue-demi';
import {
  animation,
  IAnimationPatchParams,
} from '../types/types';


/**
 * @description path every slot item to the animation-styles and animation-classes
 * @param {VNode[]} slotContent - VNode Array slot content
 * @param {animation} resultAnimation - result animation to add every slot item
 * @param {IAnimationPatchParams} animationPatchParams - props params to patch slot item. Delay, staticStyles, animationDuration
 */
export function usePatchVueListContent(
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
