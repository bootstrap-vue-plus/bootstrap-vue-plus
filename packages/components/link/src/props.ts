import { buildProps } from '@bootstrap-vue-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const routerLinkProps = buildProps({
  // `<router-link>` specific props
  activeClass: {
    type: String,
  },
  append: {
    type: Boolean,
  },
  event: {
    type: [Array, String],
  },
  exact: {
    type: Boolean,
    default: false,
  },
  exactActiveClass: {
    type: String,
  },
  exactPath: {
    type: Boolean,
    default: false,
  },
  exactPathActiveClass: {
    type: String,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  routerTag: {
    type: String,
  },
  to: {
    type: [Object, String],
  },
} as const)
export const nuxtLinkProps = buildProps({
  // `<nuxt-link>` specific props
  noPrefetch: {
    type: Boolean,
    default: false,
  },
  prefetch: {
    type: Boolean,
    default: null,
  },
} as const)
export const linkProps = buildProps({
  ...routerLinkProps,
  ...nuxtLinkProps,

  //
  active: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  href: {
    type: String,
  },
  rel: {
    type: String,
    default: null,
  },
  routerComponentName: {
    type: String,
  },
  target: {
    type: String,
    default: '_self',
  },
} as const)
export type LinkProps = ExtractPropTypes<typeof linkProps>
