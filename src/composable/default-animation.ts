import {
    animation,
    AnimatePosition,
    IDefaultAnimationCollection,
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
