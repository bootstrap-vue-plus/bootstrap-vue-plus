import { defineComponent, h, mergeProps, renderSlot } from 'vue'
import { isString } from '@bootstrap-vue-plus/utils'
import { listGroupProps } from './props'

const ListGroup = defineComponent({
  name: 'BvListGroup',
  props: listGroupProps,
  setup(props, { slots }) {
    return () => {
      let horizontal = props.horizontal === '' ? true : props.horizontal
      horizontal = props.flush ? false : horizontal
      return h(
        props.tag,
        mergeProps(props, {
          class: [
            'list-group',
            {
              'list-group-flush': props.flush,
              'list-group-horizontal': horizontal === true,
              [`list-group-horizontal-${horizontal}`]: isString(horizontal),
            },
          ],
        }),
        [renderSlot(slots, 'default')]
      )
    }
  },
})

export default ListGroup
export type ListGroupInstance = InstanceType<typeof ListGroup>
