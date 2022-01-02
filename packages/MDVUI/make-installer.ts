import type { App, Plugin } from 'vue-demi'
import { version } from './version'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    components.forEach(c => app.use(c))
  }

  return {
    install,
    version,
  }
}
