import type { Fn } from '@mdvui/utils/types'

export function useMount(fn: Fn) {
  setTimeout(() => {
    fn()
  })
}
