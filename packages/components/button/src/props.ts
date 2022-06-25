import { buildProps, omit } from '@bootstrap-vue-plus/utils'
import { linkProps as BvLinkProps } from '../../link'
import type { ExtractPropTypes } from 'vue'

const linkProps = omit(BvLinkProps, ['event', 'routerTag'])

export const buttonProps = buildProps({
  ...linkProps,

  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  pill: {
    type: Boolean,
    default: false,
  },
  pressed: {
    type: Boolean,
    default: null,
  },
  size: {
    type: String,
  },
  squared: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'button',
  },
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'secondary',
  },
} as const)
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonCloseProps = buildProps({
  ariaLabel: {
    type: String,
    default: 'Close',
  },
  content: {
    type: String,
    default: '&times;',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textVariant: {
    type: String,
  },
} as const)
export type ButtonCloseProps = ExtractPropTypes<typeof buttonCloseProps>
