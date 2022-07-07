import { computed } from 'vue'
import { buildProps } from '@bootstrap-vue-plus/utils'
import { useProp } from '../use-prop'

export const formCustomProps = buildProps({
  //
  plain: {
    type: Boolean,
    default: false,
  },
} as const)

export const useFormCustom = () => {
  const plain = useProp<boolean>('plain')

  return computed(() => !plain.value)
}
