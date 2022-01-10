import type { App, Plugin } from 'vue-demi'
import type { MvFunctionDirective, MvObjDirective } from '@mdvui/utils/types'
import type { ConfigProviderKeyProps } from '../tokens/config-provider'
import { provideGlobalConfig } from '../hooks/use-global-config'
import { version } from './version'

export const makeInstaller = (components: Plugin[] = [], directives: MvObjDirective[] | MvFunctionDirective[]) => {
  const install = (app: App, options: ConfigProviderKeyProps = {}) => {
    options.zIndex = options.zIndex || 2000
    provideGlobalConfig(options, app)
    components.forEach(c => app.use(c))
    directives.forEach(d => app.directive(d.name, d))
  }

  return {
    install,
    version,
  }
}
