import type { Fn } from '@mdvui/utils/types'

/**
 * If you use the native method to add the class name with animation effect, the animation effect will not trigger correctly.
 * This method is to ensure that the animation is triggered correctly
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#adding_messages
 *
 * @param fn
 */
export default function useMicrotasksMount(fn: Fn) {
  setTimeout(() => {
    fn()
  })
}
