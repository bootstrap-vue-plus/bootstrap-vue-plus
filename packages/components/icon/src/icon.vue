<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { addUnit, isUndefined } from '@bootstrap-vue-plus/utils'
import { useNamespace } from '@bootstrap-vue-plus/hooks'
import { iconProps } from './icon.ts'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'BvIcon',
  inheritAttrs: false,
})
const props = defineProps(iconProps)
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {}

  return {
    fontSize: isUndefined(props.size) ? undefined : addUnit(props.size),
    '--color': props.color,
  }
})
</script>
