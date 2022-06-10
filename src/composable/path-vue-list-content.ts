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
export function usePatchSlotContent(
  slotContent: VNode[],
  resultAnimation: animation,
  animationPatchParams: IAnimationPatchParams,
) {
  const { delay, staticStyles, animationDuration } = animationPatchParams;

  if (slotContent?.length === 0) return slotContent;

  const animationSlotContent = slotContent.map((slotItem, index) => {
    if (slotItem.props || slotItem.props === null) {
      slotItem.props = {
        ...slotItem?.props,
        style: {
          ...slotItem?.props?.style,
          ...staticStyles,
          animationDelay: `${index * delay}ms`,
          animationDuration: `${animationDuration}s`,
        },
        class: slotItem?.props?.class
          ? `${slotItem.props.class} ${resultAnimation}`
          : resultAnimation,
      };
    }
    return slotItem;
  });

  return animationSlotContent;
}
