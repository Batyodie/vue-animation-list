/** @type {AnimatePosition} */
export type AnimatePosition = 'fromTop' | 'fromRight' | 'fromBottom' | 'fromLeft';

/** @type {animation} */
export type animation = 'entranceFromTop' | 'entranceFromBottom' | 'entranceFromLeft' | 'entranceFromRight' | string;


/** @type {IAnimationPatchParams} */
export interface IAnimationPatchParams {
  delay: number;
  staticStyles: object;
  animationDuration: number;
}

/** @type {IDefaultAnimationCollection} */
export interface IDefaultAnimationCollection {
  fromTop: string,
  fromRight: string,
  fromBottom: string,
  fromLeft: string,
}
