import type { MaybeRef } from '@vueuse/core'
import { computed, getCurrentInstance, inject, ref } from 'vue-demi'
import { isObject } from '@vueuse/core'
import type { App, Ref } from 'vue-demi'
import { debugWarn } from '@mdvui/utils/error'
import { hasOwn } from '@mdvui/utils/utils'
import { unref } from 'vue'
import type { ConfigProviderKeyProps } from '../../tokens/config-provider'
import { ConfigProviderKey } from '../../tokens/config-provider'

const defaultInject = ref<ConfigProviderKeyProps>({})

export const useGlobalConfig = (
  key?: keyof ConfigProviderKeyProps,
): Ref<number | undefined> | undefined => {
  const config = inject(ConfigProviderKey, defaultInject)
  if (key) {
    return isObject(config) && hasOwn(config, key)
      ? computed(() => config.value[key])
      : undefined
  }
}

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderKeyProps>,
  app?: App,
) => {
  const inSetup = !!getCurrentInstance()

  if (!inSetup) {
    debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().')
  }

  if (!app) {
    return undefined
  }

  const provideFn = <T>(key: any, value: T) => {
    app.provide(key, value)
  }
  const oldConfig = useGlobalConfig()

  const context = computed(() => Object.assign(unref(oldConfig) || {}, config))

  provideFn(ConfigProviderKey, unref(context))

  return context
}
