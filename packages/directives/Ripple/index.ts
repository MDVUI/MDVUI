import type { MvDirectiveHTMLElement, MvFunctionDirective } from '@mdvui/utils/types'
import type { DirectiveBinding } from 'vue-demi'
import { useEventListener } from '@vueuse/core'
import { addClass, removeClass, removeDom } from '@mdvui/utils/dom'
import { useMount } from '@mdvui/hooks/use-mount'

const calculate = (el: MvDirectiveHTMLElement) => {
  let offsetX = el.offsetWidth / 2
  let offsetY = el.offsetHeight / 2

  let scale = 1
  const currentSquare = 100
  const offsetSquare = el.offsetWidth * el.offsetHeight
  scale = offsetSquare / currentSquare / 2

  return {
    offsetX,
    offsetY,
    scale,
  }
}

const showRipple = (e: Event) => {
  const el = e.currentTarget as MvDirectiveHTMLElement || undefined

  // Ripple is triggered only once before hiding
  if (!el || el.ripple) {
    return
  }
  el.ripple = true

  const { offsetX, offsetY, scale } = calculate(el)
  const container = document.createElement('div')
  const animation = document.createElement('div')
  container.className = 'mv-ripple'
  animation.className = `mv-ripple-animation mv-ripple-animation-in mv-ripple-${el.rippleColor}`
  append(container, animation)
  animation.style.left = `${offsetX}px`
  animation.style.top = `${offsetY}px`
  append(el, container)
  // Ensure animation can be triggered
  useMount(() => {
    animation.style.transform = `scale(${scale})`
    // After 500ms, the ripple animation will be closed
    setTimeout(() => {
      // hideRipple(el, animation)
    }, 500)
  })
}

const hideRipple = (el: MvDirectiveHTMLElement, animationEl: HTMLElement) => {
  el.ripple = false
  removeClass(animationEl, 'mv-ripple-animation-in')
  addClass(animationEl, 'mv-ripple-animation-out')
  animationEl.style.opacity = '0'
}

const updateRipple = <T extends MvDirectiveHTMLElement>(
  el: T,
  binding: DirectiveBinding,
) => {
  const color = binding.value || 'white'
  el.rippleColor = color
  useEventListener(el, 'mousedown', showRipple)
}

const Ripple: MvFunctionDirective = (
  el: HTMLElement,
  binding: DirectiveBinding,
) => {
  updateRipple(el, binding)
}

function remove(el: HTMLElement) {
  removeDom(el)
}

function append(appendTo: HTMLElement, el: HTMLElement) {
  appendTo.appendChild(el)
}

export default Ripple
