import { componentSizeMap } from '@bootstrap-vue-plus/constants'

import type { ComponentSize } from '@bootstrap-vue-plus/constants'

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default']
}
