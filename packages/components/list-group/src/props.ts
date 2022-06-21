import { buildProps, omit } from '@bootstrap-vue-plus/utils'
import { linkProps as BvLinkProps } from '../../link'
import type { ExtractPropTypes } from 'vue'

const linkProps = omit(BvLinkProps, ['event', 'routerTag'])

export const listGroupProps = buildProps({
  flush: {
    type: Boolean,
    default: false,
  },
  horizontal: {
    type: [String, Boolean],
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
} as const)
export type ListGroupProps = ExtractPropTypes<typeof listGroupProps>

export const listGroupItemProps = buildProps({
  ...linkProps,

  action: {
    type: Boolean,
    default: false,
  },
  button: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
  variant: {
    type: String,
  },
} as const)
export type ListGroupItemProps = ExtractPropTypes<typeof listGroupItemProps>
