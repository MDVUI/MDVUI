import type { DataHTMLAttributes, Ref } from 'vue-demi'
import { isUndefined } from '@mdvui/utils/isUndefined'

export const removeDom = <T extends Ref>(el: T) => {
  if (el.value.remove) {
    el.value.remove()
  }
}

export const isExistAttr = (attrs: any, targetAttr: string) => {
  if (!isUndefined(attrs[targetAttr])) {
    return true
  }
  return false
}
