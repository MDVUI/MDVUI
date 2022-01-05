import type { InjectionKey, Ref } from 'vue-demi'
import type { ExtractTypes } from '@mdvui/utils/types'

export interface ConfigProviderKeyProps {
  zIndex?: number
}

export type ExtractConfigProviderProps = ExtractTypes<ConfigProviderKeyProps>

export const ConfigProviderKey: InjectionKey<Ref<ConfigProviderKeyProps>> = Symbol('MDVUI')
