import { buildProps } from '@bootstrap-vue-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const buttonToolbarProps = buildProps({
  justify: {
    type: Boolean,
    default: false,
  },
  keyNav: {
    type: Boolean,
    default: false,
  },
} as const)
export type ButtonToolbarProps = ExtractPropTypes<typeof buttonToolbarProps>
