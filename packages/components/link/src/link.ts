import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  renderSlot,
} from 'vue'
import { isFunction } from '@vue/shared'
import {
  computeHref,
  computeRel,
  computeTag,
  concat,
  isBoolean,
  isEvent,
  isRouterLink,
  isTag,
  isUndefined,
  omit,
  pluckProps,
  stopEvent,
} from '@bootstrap-vue-plus/utils'
import { linkProps, nuxtLinkProps, routerLinkProps } from './props'

const Link = defineComponent({
  name: 'BvLink',
  props: linkProps,
  emits: ['bv::link::clicked', 'click'],
  setup(props, { slots, attrs, emit }) {
    // init here
    const app = getCurrentInstance()
    provide('link', slots)

    const computedTag = computed(() => {
      const { to, disabled, routerComponentName } = props
      return computeTag({ to, disabled, routerComponentName }, app)
    })

    const computedRel = computed(() => {
      const { target, rel } = props
      return computeRel({ target, rel })
    })

    const computedHref = computed(() => {
      const { to, href } = props
      return computeHref({ to, href }, computedTag.value)
    })

    const computedAttrs = computed(() => {
      const { disabled, target, routerTag } = props

      return {
        ...attrs,
        // If `href` attribute exists on `<router-link>` (even `undefined` or `null`)
        // it fails working on SSR, so we explicitly add it here if needed
        // (i.e. if `computedHref` is truthy)
        ...(computedHref.value ? { href: computedHref.value } : {}),
        // We don't render `rel` or `target` on non link tags when using `vue-router`
        ...(isLink.value && routerTag && !isTag(routerTag, 'a')
          ? {}
          : { rel: computedRel.value, target }),
        tabindex: disabled
          ? '-1'
          : isUndefined(attrs.tabindex)
          ? null
          : attrs.tabindex,
        'aria-disabled': disabled ? 'true' : null,
      }
    })

    const computedProps = computed(() => {
      const { event, prefetch, routerTag } = props
      return isLink.value
        ? {
            ...pluckProps(
              omit({ ...routerLinkProps, ...nuxtLinkProps }, [
                'event',
                'prefetch',
                'routerTag',
              ]),
              props
            ),
            // Only add these props, when actually defined
            ...(event ? { event } : {}),
            ...(isBoolean(prefetch) ? { prefetch } : {}),
            // Pass `router-tag` as `tag` prop
            ...(routerTag ? { tag: routerTag } : {}),
          }
        : {}
    })

    const isLink = computed(() => isRouterLink(computedTag.value))

    const onClick = (event: Event) => {
      const eventIsEvent = isEvent(event)
      const isRouterLink = isLink.value
      const suppliedHandler = attrs.onClick
      if (eventIsEvent && props.disabled) {
        // Stop event from bubbling up
        // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing its thing
        stopEvent(event, { immediatePropagation: true })
      } else {
        // Router links do not emit instance `click` events, so we
        // add in an `$emit('click', event)` on its Vue instance
        /* istanbul ignore next: difficult to test, but we know it works */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (isRouterLink && event.currentTarget.__vue__) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          event.currentTarget.__vue__.$emit('click', event)
        }
        // Call the suppliedHandler(s), if any provided
        concat(suppliedHandler)
          .filter((h) => isFunction(h))
          .forEach((handler) => {
            // eslint-disable-next-line prefer-rest-params
            handler(...arguments)
          })
        // Emit the global `$root` click event
        emit('bv::link::clicked', event)
      }
      // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'
      if (eventIsEvent && !isRouterLink && computedHref.value === '#') {
        stopEvent(event, { propagation: false })
      }
    }

    const computedListeners = computed(() => ({
      // Transfer all listeners (native) to the root element
      ...attrs,
      // We want to overwrite any click handler since our callback
      // will invoke the user supplied handler(s) if `!this.disabled`
      onClick,
    }))

    return () => {
      return h(
        computedTag.value,
        {
          class: { active: props.active, disabled: props.disabled },
          ...computedAttrs.value,
          ...computedProps.value,
          // We must use `nativeOn` for `<router-link>`/`<nuxt-link>` instead of `on`
          [isLink.value ? 'nativeOn' : 'on']: computedListeners.value,
        },
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default Link
export type LinkInstance = InstanceType<typeof Link>
