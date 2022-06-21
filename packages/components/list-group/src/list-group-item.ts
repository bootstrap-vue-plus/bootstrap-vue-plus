import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import {
  arrayIncludes,
  isLink,
  isTag,
  pluckProps,
} from '@bootstrap-vue-plus/utils'
import BvLink, { linkProps } from '../../link'
import { listGroupItemProps } from './props'

const actionTags = ['a', 'router-link', 'button', 'bv-link']

const ListGroupItem = defineComponent({
  name: 'BvListGroupItem',
  props: listGroupItemProps,
  setup(props, { slots, attrs }) {
    return () => {
      const { button, variant, active, disabled } = props
      const link = isLink(props)
      const tag = button ? 'button' : !link ? props.tag : BvLink
      const action = !!(
        props.action ||
        link ||
        button ||
        arrayIncludes(actionTags, props.tag)
      )

      const isButton = isTag(tag, 'button')
      const attributes: any = {}
      const itemProps = !isButton ? pluckProps(linkProps, props) : {}
      if (isButton) {
        if (!attrs || !attrs.type) {
          // Add a type for button is one not provided in passed attributes
          attributes.type = 'button'
        }
        if (disabled) {
          // Set disabled attribute if button and disabled
          attributes.disabled = true
        }
      }

      const mergedProps = mergeProps({
        ...attributes,
        ...itemProps,
        class: [
          'list-group-item',
          {
            [`list-group-item-${variant}`]: variant,
            'list-group-item-action': action,
            active,
            disabled,
          },
        ],
      })
      if (!button && link) {
        return h(BvLink, mergedProps)
      }

      return h(button ? 'button' : props.tag, mergedProps, [
        renderSlot(slots, 'default'),
      ])
    }
  },
})

export default ListGroupItem
export type ListGroupItemInstance = InstanceType<typeof ListGroupItem>
