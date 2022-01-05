import type { Plugin } from 'vue-demi'

export type SFCWithInstall<T> = Plugin & T

export type ExtractTypes<T> = T[keyof T]
