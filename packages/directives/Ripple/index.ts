import type { MvDirectiveHTMLElement, MvFunctionDirective, MvRippleElement } from '@mdvui/utils/types'
import type { DirectiveBinding } from 'vue-demi'
import { useEventListener } from '@vueuse/core'
import { addClass, removeClass } from '@mdvui/utils/dom'
import { useMount } from '@mdvui/hooks/use-mount'
import { Device, cloneArray, getCurrentDevice } from '@mdvui/utils/utils'

type MvRippleEvent = MouseEvent | TouchEvent

interface Animations {
  el: HTMLElement
  scale: number
}

const instances: MvRippleElement[] = []
const animations: Animations[] = []
let seed = 0

function append(appendTo: HTMLElement, el: HTMLElement) {
  appendTo.appendChild(el)
}

function isTouchEvent(e: MvRippleEvent): e is TouchEvent {
  return e.constructor.name === 'TouchEvent'
}

function removeRipple(
  rootEl: MvDirectiveHTMLElement,
) {
  // Ensure animation can be triggered
  useMount(() => {
    const currentAnimation = animations[animations.length - 1]
    currentAnimation.el.style.transitionDuration = '600ms'
    currentAnimation.el.style.transform = 'scale(1)'
    // After 600ms, the ripple animation will be closed
    setTimeout(() => {
      hideRipple(rootEl, currentAnimation.el, rootEl.ripple as MvRippleElement)
    }, 600)
  })
}

const calculate = (
  e: MvRippleEvent,
  el: MvDirectiveHTMLElement,
) => {
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e
  const offsetX = target.pageX - el.getBoundingClientRect().x
  const offsetY = target.pageY - el.getBoundingClientRect().y
  const elMaxSide = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight
  const elMinSide = el.clientWidth > el.clientHeight ? el.clientHeight : el.clientWidth

  let centerX
  let centerY
  let radius = elMinSide * 2
  let scale = 0.8

  centerX = offsetX - radius / 2
  centerY = offsetY - radius / 2
  scale += elMaxSide / radius

  return {
    offsetX,
    offsetY,
    centerX,
    centerY,
    radius,
    scale,
  }
}

const showRipple = (e: MvRippleEvent) => {
  const el = e.currentTarget as MvDirectiveHTMLElement || undefined
  // Ripple is triggered only once before hiding
  if (!el || (getCurrentDevice() === Device.phone)) {
    return
  }

  if (e.type === 'mouseup' || e.type === 'touchmove') {
    removeRipple(el)
    return
  }

  const { centerX, centerY, scale, radius } = calculate(e, el)
  const container = document.createElement('div')
  const animation = document.createElement('div')
  const initialSize = `${radius}px`

  container.className = 'mv-ripple'
  animation.className = `mv-ripple-animation mv-ripple-animation-in mv-ripple-animation-color-${el.rippleColor}`
  append(container, animation)

  animation.style.width = initialSize
  animation.style.height = initialSize
  animation.style.transition = 'all 3000ms'
  animation.style.left = `${centerX}px`
  animation.style.top = `${centerY}px`

  append(el, container)

  el.ripple = container
  el.ripple.seed = seed++

  instances.push(el.ripple)
  animations.push({
    el: animation,
    scale,
  })
  useMount(() => {
    animation.style.transform = `scale(${scale})`
  })
}

const hideRipple = (
  el: MvDirectiveHTMLElement,
  animationEl: HTMLElement,
  rippleEl: MvRippleElement,
) => {
  removeClass(animationEl, 'mv-ripple-animation-in')
  addClass(animationEl, 'mv-ripple-animation-out')

  const cloneIns = cloneArray(instances)

  setTimeout(() => {
    const idx = cloneIns.findIndex(vm => vm.seed === rippleEl.seed)
    // Ensure all useless ripples will be remove
    cloneIns.forEach((cVm, index) => {
      if (index <= idx) {
        const cVmAnimation = cVm.firstElementChild as Element
        removeClass(cVmAnimation, 'mv-ripple-animation-in')
        addClass(cVmAnimation, 'mv-ripple-animation-out')
        setTimeout(() => {
          cVm.remove()
        }, 600)
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
  useEventListener(el, 'mouseup', showRipple)
  useEventListener(el, 'touchstart', showRipple)
  useEventListener(el, 'touchmove', showRipple)
}

const Ripple: MvFunctionDirective = (
  el: HTMLElement,
  binding: DirectiveBinding,
) => {
  updateRipple(el, binding)
}

export default Ripple
