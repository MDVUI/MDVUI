import type { MaybeRef } from '@vueuse/core'
import { computed, getCurrentInstance, inject, ref } from 'vue-demi'
import { isObject } from '@vueuse/core'
import type { App, Ref } from 'vue-demi'
import { debugWarn } from '@mdvui/utils/error'
import { hasOwn } from '@mdvui/utils/utils'
import { unref } from 'vue'
import type { ConfigProviderKeyProps, ExtractConfigProviderProps } from '../../tokens/config-provider'
import { ConfigProviderKey } from '../../tokens/config-provider'

const defaultInject = ref<ConfigProviderKeyProps>({})

export function useGlobalConfig<T extends keyof ConfigProviderKeyProps>(key: T): Ref<ConfigProviderKeyProps[T]>
export function useGlobalConfig(): Ref<ExtractConfigProviderProps>
export function useGlobalConfig<T extends keyof ConfigProviderKeyProps>(key?: T) {
  const config = inject(ConfigProviderKey, defaultInject) || defaultInject

  if (key) {
    return isObject(config.value) && hasOwn(config.value, key) ? computed(() => config.value[key]) : undefined
  } else {
    return config as Ref<ConfigProviderKeyProps[T]>
  }
}

export const provideGlobalConfig = (config: MaybeRef<ConfigProviderKeyProps>, app?: App) => {
  const inSetup = !!getCurrentInstance()

  if (!inSetup) {
    debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().')
  }

  if (!app) {
    return undefined
  }

  const provideFn = (value: any) => {
    app.provide(ConfigProviderKey, value)
  }
  const oldConfig = useGlobalConfig()

  const context = computed(() => Object.assign(unref(oldConfig) || {}, config))

  provideFn(unref(context))

  return context
}
