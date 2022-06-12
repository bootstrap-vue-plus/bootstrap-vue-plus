import { withInstallFunction } from '@bootstrap-vue-plus/utils'

import Message from './src/message-method'

export const BvMessage = withInstallFunction(Message, '$message')
export default BvMessage

export * from './src/message'
