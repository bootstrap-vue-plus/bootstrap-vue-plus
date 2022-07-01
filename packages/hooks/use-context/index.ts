import { computed, getCurrentInstance } from 'vue'
import type { ComputedRef } from 'vue'

export const useContext = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance()!
  return computed(() => (vm as any)[name] ?? undefined)
}
