import { computed, nextTick, onMounted, ref } from 'vue'
import { buildProps } from '@bootstrap-vue-plus/utils'
import { useProp } from '../use-prop'
import { useContext } from '../use-context'
import type { ComputedRef } from 'vue'

export const COMPONENT_UID_KEY = 'uid'

type FuncType = (s?: string) => string | null

export const idProps = buildProps({
  //
  id: {
    type: String,
  },
} as const)

export const useId = (): ComputedRef<FuncType> => {
  const idVal = useProp<string>('id')
  const uidVal = useContext(COMPONENT_UID_KEY)
  const localId = ref<string | null>(null)

  const safeId = computed(() => {
    const id = idVal.value || localId.value

    // We return a function that accepts an optional suffix string
    // So this computed prop looks and works like a method
    // but benefits from Vue's computed prop caching
    return (suffix?: string) => {
      if (!id) {
        return null
      }
      suffix = String(suffix || '').replace(/\s+/g, '_')
      return suffix ? `${id}_${suffix}` : id
    }
  })

  onMounted(() => {
    nextTick(() => {
      // Update DOM with auto-generated ID after mount
      // to prevent SSR hydration errors
      localId.value = `__BVID__${uidVal.value}`
    })
  })

  return safeId
}
