import type { App, Plugin } from 'vue-demi'
import type { ConfigProviderKeyProps } from '../tokens/config-provider'
import { provideGlobalConfig } from '../hooks/use-global-config'
import { version } from './version'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: ConfigProviderKeyProps = {}) => {
    if (!options.zIndex) {
      options.zIndex = 2000
    }
    provideGlobalConfig(options, app)
    components.forEach(c => app.use(c))
  }

  return {
    install,
    version,
  }
}
