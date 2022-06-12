import { withInstall } from '@bootstrap-vue-plus/utils'

import ConfigProvider from './src/config-provider'

export const BvConfigProvider = withInstall(ConfigProvider)
export default BvConfigProvider

export * from './src/config-provider'
