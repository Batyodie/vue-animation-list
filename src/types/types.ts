export type AnimatePosition = 'fromTop' | 'fromRight' | 'fromBottom' | 'fromLeft';
export type animation = 'entranceFromTop' | 'entranceFromBottom' | 'entranceFromLeft' | 'entranceFromRight' | string;
export type defaultSlot =  typeof import('vue-demi')['useSlots'];


export interface IAnimationPatchParams {
  delay: number;
  staticStyles: object;
  animationDuration: number;
}

export interface IDefaultAnimationCollection {
  fromTop: string,
  fromRight: string,
  fromBottom: string,
  fromLeft: string,
}
