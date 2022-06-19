import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  ref,
  renderSlot,
} from 'vue'
import { isFunction } from '@vue/shared'
import {
  attemptBlur,
  attemptFocus,
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
import emitter from 'tiny-emitter/instance'
import { linkProps, nuxtLinkProps, routerLinkProps } from './props'

const Link = defineComponent({
  name: 'BvLink',
  inheritAttrs: false,
  props: linkProps,
  emits: ['bv::link::clicked', 'click', 'clicked::link'],
  expose: ['focus', 'blur'],
  setup(props, { slots, attrs, emit, expose }) {
    // init here
    const app = getCurrentInstance()
    provide('link', slots)

    const el = ref<HTMLElement>()

    const computedTag = computed(() => {
      const { to, disabled, routerComponentName } = props
      return computeTag({ to, disabled, routerComponentName }, app?.proxy || {})
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

    const onClick = (event: any) => {
      const { disabled } = props
      const eventIsEvent = isEvent(event)
      const isRouterLink = isLink.value
      const suppliedHandler = attrs.click
      if (eventIsEvent && disabled) {
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
        emitter.emit('bv::link::clicked', event)
        // TODO: Remove deprecated 'clicked::link' event with next major release
        emitter.emit('clicked::link', event)
      }
      // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'
      if (eventIsEvent && !isRouterLink && computedHref.value === '#') {
        stopEvent(event, { propagation: false })
      }
    }

    const focus = () => {
      el.value && attemptFocus(el.value)
    }

    const blur = () => {
      el.value && attemptBlur(el.value)
    }

    expose({ focus, blur })

    return () => {
      return h(
        computedTag.value,
        {
          ref: el,
          class: { active: props.active, disabled: props.disabled },
          ...computedProps.value,
          ...computedAttrs.value,
          // We must use `nativeOn` for `<router-link>`/`<nuxt-link>` instead of `on`
          // [isLink.value ? 'nativeOn' : 'on']: computedListeners.value,
          onClick,
        },
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default Link
export type LinkInstance = InstanceType<typeof Link>
