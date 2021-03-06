import type { FunctionDirective, ObjectDirective, Plugin } from 'vue-demi'

export type SFCWithInstall<T> = Plugin & T

export type ExtractTypes<T> = T[keyof T]

export type Fn = () => void

export interface MvObjDirective extends ObjectDirective{
  name: string
}

export interface MvFunctionDirective extends FunctionDirective {
}

export interface MvDirectiveHTMLElement extends HTMLElement {
  ripple?: MvRippleElement
  rippleColor?: string
}

export interface MvRippleElement extends HTMLElement {
  seed?: number
}

export interface MvNavigator extends Navigator {
  userAgentData: {
    platform: string
  }
}

export interface MvComponentProps {
  color?: string
}
