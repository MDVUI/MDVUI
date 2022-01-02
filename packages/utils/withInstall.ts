import type { App } from 'vue-demi'
import type { SFCWithInstall } from '@mdvui/utils/types'

export const withInstall = <T>(
  main: T,
  name: string,
): SFCWithInstall<T> => {
  (main as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, main)
  }
  return main as SFCWithInstall<T>
}
