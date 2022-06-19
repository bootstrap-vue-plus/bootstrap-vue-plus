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
      const tag = link ? BvLink : props.tag
      const variant = props.variant || 'secondary'
      return h(
        tag,
        mergeProps(props, {
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
        }),
        link ? null : [renderSlot(slots, 'default')]
      )
    }
  },
})

export default Badge
export type BadgeInstance = InstanceType<typeof Badge>
