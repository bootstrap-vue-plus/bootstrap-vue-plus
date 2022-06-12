<template>
  <div :class="ns.b()">
    <slot />
    <transition :name="`${ns.namespace.value}-zoom-in-center`">
      <sup
        v-show="!hidden && (content || isDot)"
        :class="[
          ns.e('content'),
          ns.em('content', type),
          ns.is('fixed', !!$slots.default),
          ns.is('dot', isDot),
        ]"
        v-text="content"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@bootstrap-vue-plus/hooks'
import { isNumber } from '@bootstrap-vue-plus/utils'
import { badgeProps } from './badge.ts'

defineOptions({
  name: 'BvBadge',
})

const props = defineProps(badgeProps)

const ns = useNamespace('badge')

const content = computed<string>(() => {
  if (props.isDot) return ''

  if (isNumber(props.value) && isNumber(props.max)) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`
  }
  return `${props.value}`
})

defineExpose({
  /** @description badge content */
  content,
})
</script>
