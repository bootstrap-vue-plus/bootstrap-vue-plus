import { computed, getCurrentInstance } from 'vue'
import type { ComputedRef } from 'vue'

export const useContext = <T>(name?: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance()!
  if (!name) computed(() => (vm.proxy as any) ?? undefined)
  return computed(() => (vm.proxy as any)[name!] ?? undefined)
}
