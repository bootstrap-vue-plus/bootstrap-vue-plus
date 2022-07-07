import { computed } from 'vue'
import { buildProps, isBoolean } from '@bootstrap-vue-plus/utils'
import { useProp } from '../use-prop'

export const formStateProps = buildProps({
  //
  state: {
    type: Boolean,
    default: null,
  },
} as const)

export const useFormState = () => {
  const state = useProp<boolean>('state')
  const ariaInvalid = useProp<boolean | string>('ariaInvalid')

  const computedState = computed(() => {
    return isBoolean(state.value) ? state.value : null
  })

  const stateClass = computed(() => {
    const state = computedState.value
    return state === true ? 'is-valid' : state === false ? 'is-invalid' : null
  })

  const computedAriaInvalid = computed(() => {
    if (
      ariaInvalid.value === true ||
      ariaInvalid.value === 'true' ||
      ariaInvalid.value === ''
    ) {
      return 'true'
    }
    return computedState.value === false ? 'true' : ariaInvalid.value
  })

  return {
    computedState,
    stateClass,
    computedAriaInvalid,
  }
}
