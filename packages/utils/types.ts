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
  ripple?: boolean
  rippleColor?: string
}
