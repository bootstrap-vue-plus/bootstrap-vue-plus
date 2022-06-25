import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import { buttonGroupProps } from './props'

const ButtonGroup = defineComponent({
  name: 'BvButtonGroup',
  props: buttonGroupProps,
  setup(props, { slots }) {
    return () => {
      return h(
        props.tag,
        mergeProps(props, {
          class: {
            'btn-group': !props.vertical,
            'btn-group-vertical': props.vertical,
            [`btn-group-${props.size}`]: props.size,
          },
          role: props.ariaRole,
        }),
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default ButtonGroup
export type ButtonGroupInstance = InstanceType<typeof ButtonGroup>
