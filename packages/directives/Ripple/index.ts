import type { MvDirectiveHTMLElement, MvFunctionDirective, MvRippleElement } from '@mdvui/utils/types'
import type { DirectiveBinding } from 'vue-demi'
import { useEventListener } from '@vueuse/core'
import { addClass, removeClass } from '@mdvui/utils/dom'
import { useMount } from '@mdvui/hooks/use-mount'

type MvRippleEvent = MouseEvent | TouchEvent

const instances: MvRippleElement[] = []
let seed = 0

function append(appendTo: HTMLElement, el: HTMLElement) {
  appendTo.appendChild(el)
}
function isTouchEvent(e: MvRippleEvent): e is TouchEvent {
  return e.constructor.name === 'TouchEvent'
}

const calculate = (
  e: MvRippleEvent,
  el: MvDirectiveHTMLElement,
) => {
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e
  const offsetX = target.pageX - el.getBoundingClientRect().x
  const offsetY = target.pageY - el.getBoundingClientRect().y
  const elSquare = el.clientWidth * el.clientHeight

  let radius = el.clientWidth > el.clientHeight ? el.clientHeight / 2 : el.clientWidth / 2
  let scale = 1
  const initialRippleSquare = radius * 2

  scale += elSquare / initialRippleSquare / 10 + 0.15

  return {
    offsetX,
    offsetY,
    radius,
    scale,
  }
}

const showRipple = (e: MvRippleEvent) => {
  const el = e.currentTarget as MvDirectiveHTMLElement || undefined
  // Ripple is triggered only once before hiding
  if (!el) {
    return
  }

  const { offsetX, offsetY, scale, radius } = calculate(e, el)
  const container = document.createElement('div')
  const animation = document.createElement('div')
  const initialSize = `${radius / 1.5}px`

  container.className = 'mv-ripple'
  animation.className = `mv-ripple-animation mv-ripple-animation-in mv-ripple-${el.rippleColor}`
  append(container, animation)

  animation.style.width = initialSize
  animation.style.height = initialSize
  animation.style.left = `${offsetX}px`
  animation.style.top = `${offsetY}px`

  append(el, container)

  el.ripple = container
  el.ripple.seed = seed++

  instances.push(el.ripple)
  // Ensure animation can be triggered
  useMount(() => {
    animation.style.transform = `scale(${scale})`
    // After 500ms, the ripple animation will be closed
    setTimeout(() => {
      hideRipple(el, animation, el.ripple as MvRippleElement)
    }, 300)
  })
}

const hideRipple = (
  el: MvDirectiveHTMLElement,
  animationEl: HTMLElement,
  rippleEl: MvRippleElement,
) => {
  removeClass(animationEl, 'mv-ripple-animation-in')
  addClass(animationEl, 'mv-ripple-animation-out')
  setTimeout(() => {
    instances.forEach((instance, index) => {
      if (instance.seed === rippleEl.seed) {
        instance.remove()
      }
    })
  }, 600)
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

export default Ripple
