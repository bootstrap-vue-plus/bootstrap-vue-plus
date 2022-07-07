import { defineComponent, h } from 'vue'

const Transporter = defineComponent({
  name: 'BvAlert',
  setup(props, { slots }) {
    return () => {
      return h()
    }
  },
})

export default Transporter
export type TransporterInstance = InstanceType<typeof Transporter>
