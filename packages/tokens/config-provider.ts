import type { InjectionKey, Ref } from 'vue-demi'

export interface ConfigProviderKeyProps {
  zIndex?: number
}

export const ConfigProviderKey: InjectionKey<Ref<ConfigProviderKeyProps>> = Symbol('MDVUI')
