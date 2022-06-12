<template>
  <transition
    :name="ns.b('fade')"
    @before-leave="onClose"
    @after-leave="$emit('destroy')"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[
        ns.b(),
        { [ns.m(type)]: type && !icon },
        ns.is('center', center),
        ns.is('closable', showClose),
        customClass,
      ]"
      :style="customStyle"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <bv-badge
        v-if="repeatNum > 1"
        :value="repeatNum"
        :type="badgeType"
        :class="ns.e('badge')"
      />
      <bv-icon v-if="iconComponent" :class="[ns.e('icon'), typeClass]">
        <component :is="iconComponent" />
      </bv-icon>
      <slot>
        <p v-if="!dangerouslyUseHTMLString" :class="ns.e('content')">
          {{ message }}
        </p>
        <!-- Caution here, message could've been compromised, never use user's input as message -->
        <p v-else :class="ns.e('content')" v-html="message" />
      </slot>
      <bv-icon v-if="showClose" :class="ns.e('closeBtn')" @click.stop="close">
        <close />
      </bv-icon>
    </div>
  </transition>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useEventListener, useTimeoutFn } from '@vueuse/core'
import { TypeComponents, TypeComponentsMap } from '@bootstrap-vue-plus/utils'
import { EVENT_CODE } from '@bootstrap-vue-plus/constants'
import BvBadge from '@bootstrap-vue-plus/components/badge'
import { BvIcon } from '@bootstrap-vue-plus/components/icon'

import { useNamespace } from '@bootstrap-vue-plus/hooks'
import { messageEmits, messageProps } from './message.ts'
import type { BadgeProps } from '@bootstrap-vue-plus/components/badge'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'BvMessage',

  components: {
    BvBadge,
    BvIcon,
    ...TypeComponents,
  },

  props: messageProps,
  emits: messageEmits,

  setup(props) {
    const ns = useNamespace('message')
    const visible = ref(false)
    const badgeType = ref<BadgeProps['type']>(
      props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info'
    )
    let stopTimer: (() => void) | undefined = undefined

    const typeClass = computed(() => {
      const type = props.type
      return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] }
    })

    const iconComponent = computed(() => {
      return props.icon || TypeComponentsMap[props.type] || ''
    })

    const customStyle = computed<CSSProperties>(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex,
    }))

    function startTimer() {
      if (props.duration > 0) {
        ;({ stop: stopTimer } = useTimeoutFn(() => {
          if (visible.value) close()
        }, props.duration))
      }
    }

    function clearTimer() {
      stopTimer?.()
    }

    function close() {
      visible.value = false
    }

    function keydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.esc) {
        // press esc to close the message
        if (visible.value) {
          close()
        }
      } else {
        startTimer() // resume timer
      }
    }

    onMounted(() => {
      startTimer()
      visible.value = true
    })

    watch(
      () => props.repeatNum,
      () => {
        clearTimer()
        startTimer()
      }
    )

    useEventListener(document, 'keydown', keydown)

    return {
      ns,
      typeClass,
      iconComponent,
      customStyle,
      visible,
      badgeType,

      close,
      clearTimer,
      startTimer,
    }
  },
})
</script>
