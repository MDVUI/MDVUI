import type { Ref } from 'vue-demi'

export const removeDom = <T extends Ref>(el: T) => {
  if (el.value.remove) {
    el.value.remove()
  }
}

// export const isExistAttr = (attrs: any, targetAttr: string) => {
//   return !isUndefined(attrs[targetAttr]) || attrs[targetAttr] === ''
// }
