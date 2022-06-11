import { provideGlobalConfig } from '@bootstrap-vue-plus/hooks'
import { INSTALLED_KEY } from '@bootstrap-vue-plus/constants'
import { version } from './version'
import type { App, Plugin } from '@vue/runtime-core'
import type { ConfigProviderContext } from '@bootstrap-vue-plus/tokens'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    if (options) provideGlobalConfig(options, app, true)
  }

  return {
    version,
    install,
  }
}
