import type { ObjectDirective, Plugin } from 'vue-demi'
import { Directive } from 'vue'

export type SFCWithInstall<T> = Plugin & T

export type ExtractTypes<T> = T[keyof T]

export interface MvDirective extends ObjectDirective{
  name: string
}
