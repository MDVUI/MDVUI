import type { MvDirectiveHTMLElement, MvFunctionDirective, MvRippleElement } from '@mdvui/utils/types'
import type { DirectiveBinding } from 'vue-demi'
import { useEventListener } from '@vueuse/core'
import { addClass, removeClass } from '@mdvui/utils/dom'
import { useMount } from '@mdvui/hooks/use-mount'
import { Device, cloneArray, getCurrentDevice } from '@mdvui/utils/utils'

type MvRippleEvent = MouseEvent | TouchEvent

interface AnimationsTransform {
  translateX: number
  translateY: number
  scale: number
}

interface Animations {
  el: HTMLElement
  transform: AnimationsTransform
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
    const transform = currentAnimation.transform
    currentAnimation.el.style.transitionDuration = '300ms'
    currentAnimation.el.style.transform = `translate3d(${transform.translateX}px, ${transform.translateY}px, 0) scale(${transform.scale + 2})`
    // After 600ms, the ripple animation will be closed
    setTimeout(() => {
      hideRipple(rootEl, currentAnimation.el, rootEl.ripple as MvRippleElement)
    }, 300)
  })
}

const calculate = (
  e: MvRippleEvent,
  el: MvDirectiveHTMLElement,
) => {
  const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e
  const elWidth = el.clientWidth
  const elHeight = el.clientHeight
  const elMaxSide = (elWidth > elHeight ? elWidth : elHeight)
  const diameter = elMaxSide / 10
  const clickX = target.clientX - el.getBoundingClientRect().x
  const clickY = target.clientY - el.getBoundingClientRect().y

  const scale = 13
  const translateX = elWidth / 2 - clickX + diameter / 2
  const translateY = elHeight / 2 - clickY + diameter / 2

  return {
    clickX,
    clickY,
    diameter,
    translateX,
    translateY,
    scale,
  }
}

const showRipple = (e: MvRippleEvent) => {
  const el = e.currentTarget as MvDirectiveHTMLElement || undefined
  // Make sure that only TouchEvent can be triggered when using phone or pad
  if (!el || ((getCurrentDevice() === Device.phone) && e.type === 'mousedown')) {
    return
  }

  if (e.type === 'mouseup' || e.type === 'touchmove') {
    removeRipple(el)
    return
  }

  const { clickX, clickY, diameter, translateX, translateY, scale } = calculate(e, el)
  const container = document.createElement('div')
  const animation = document.createElement('div')
  const initialSize = `${diameter}px`

  container.className = 'mv-ripple'
  animation.className = `mv-ripple-animation mv-ripple-animation-in mv-ripple-animation-color-${el.rippleColor}`
  append(container, animation)

  animation.style.width = initialSize
  animation.style.height = initialSize
  animation.style.transform = 'translate3d(0, 0, 0) scale(1)'
  animation.style.left = `${clickX - diameter / 2}px`
  animation.style.top = `${clickY - diameter / 2}px`

  append(el, container)

  el.ripple = container
  el.ripple.seed = seed++

  instances.push(el.ripple)

  animations.push({
    el: animation,
    transform: {
      translateX,
      translateY,
      scale,
    },
  })
  useMount(() => {
    animation.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`
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
