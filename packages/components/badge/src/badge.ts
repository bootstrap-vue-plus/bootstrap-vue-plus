import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import { isLink, pluckProps } from '@bootstrap-vue-plus/utils'
import { BvLink, linkProps } from '../../link'
import { badgeProps } from './props'

const Badge = defineComponent({
  name: 'BvBadge',
  props: badgeProps,
  setup(props, { slots }) {
    return () => {
      const { active, disabled } = props
      const link = isLink(props)
      const variant = props.variant || 'secondary'

      const mergedProps = mergeProps(props, {
        class: [
          'badge',
          `badge-${variant}`,
          {
            'badge-pill': props.pill,
            active,
            disabled,
          },
        ],
        ...(link ? pluckProps(linkProps, props) : {}),
      })

      if (link) {
        return h(BvLink, mergedProps)
      }
      return h(props.tag, mergedProps, [renderSlot(slots, 'default')])
    }
  },
})

export default Badge
export type BadgeInstance = InstanceType<typeof Badge>
