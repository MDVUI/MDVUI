import type { MaybeRef } from '@vueuse/core'
import { unref } from 'vue'

export const removeDom = <T extends MaybeRef<HTMLElement>>(el: T) => {
  if (!(el instanceof HTMLElement) && el.value) {
    el.value.remove()
  } else {
    (el as HTMLElement).remove()
  }
}

export const addClass = <T extends MaybeRef<HTMLElement>>(
  el: T,
  clsName: string,
) => {
  const unrefEl = unref(el)
  if (unrefEl.classList.contains(clsName)) {
    return
  }
  unrefEl.classList.add(clsName)
}

export const removeClass = <T extends MaybeRef<HTMLElement>>(
  el: T,
  clsName: string,
) => {
  const unrefEl = unref(el)
  unrefEl.classList.remove(clsName)
}
