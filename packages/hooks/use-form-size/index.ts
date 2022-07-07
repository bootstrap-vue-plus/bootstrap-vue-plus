import { computed } from 'vue'
import { buildProps } from '@bootstrap-vue-plus/utils'
import { useProp } from '../use-prop'
import type { ComputedRef } from 'vue'

export const formSizeProps = buildProps({
  //
  size: {
    type: String,
  },
} as const)

export const useFormSize = (): ComputedRef<Array<any>> => {
  const size = useProp<boolean>('size')

  return computed(() => {
    return [size.value ? `form-control-${size.value}` : null]
  })
}
