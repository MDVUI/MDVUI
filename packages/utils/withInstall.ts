import type { App } from 'vue-demi'
import type { SFCWithInstall } from '@mdvui/utils/types'

export const withInstall = <T>(main: T, name: string): SFCWithInstall<T> => {
  (main as SFCWithInstall<T>).install = (app: App) => {
    app.component(`M${name}`, main)
  }
  return main as SFCWithInstall<T>
}

export const withInstallFn = <T>(fn: T, name: string): SFCWithInstall<T> => {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    // Compatible Options API
    app.config.globalProperties[name] = fn
  }

  return fn as SFCWithInstall<T>
}
