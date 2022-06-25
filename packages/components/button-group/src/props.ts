import { buildProps, pick } from '@bootstrap-vue-plus/utils'
import { buttonProps } from '../../button'
import type { ExtractPropTypes } from 'vue'

export const buttonGroupProps = buildProps({
  ...pick(buttonProps, ['size']),

  ariaRole: {
    type: String,
    default: 'group',
  },
  size: {
    type: String,
  },
  tag: {
    type: String,
    default: 'div',
  },
  vertical: {
    type: Boolean,
    default: false,
  },
} as const)
export type ButtonGroupProps = ExtractPropTypes<typeof buttonGroupProps>
