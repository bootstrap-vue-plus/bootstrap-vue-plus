import { buildProps, omit } from '@bootstrap-vue-plus/utils'
import { linkProps as BvLinkProps } from '../../link'
import type { ExtractPropTypes } from 'vue'

const linkProps = omit(BvLinkProps, ['event', 'routerTag'])

export const badgeProps = buildProps({
  ...linkProps,

  pill: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'span',
  },
  variant: {
    type: String,
    default: 'secondary',
  },
} as const)
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
