import {
  computed,
  defineComponent,
  defineExpose,
  h,
  ref,
  renderSlot,
  unref,
  withDirectives,
} from 'vue'
import { BvHover } from '@bootstrap-vue-plus/directives'
import {
  useDropdown,
  useFormSize,
  useFormState,
  useId,
} from '@bootstrap-vue-plus/hooks'
import { attemptBlur, attemptFocus, stopEvent } from '@bootstrap-vue-plus/utils'
import { ChevronDown } from '@bootstrap-vue-plus/icons-vue'
import { formBtnLabelControlProps } from './props'

const FormBtnLabelControl = defineComponent({
  name: 'BvFormBtnLabelControl',
  props: formBtnLabelControlProps,
  setup(props, { slots }) {
    const isHovered = ref<boolean>(false)
    const hasFocus = ref<boolean>(false)
    const toggleRef = ref<HTMLButtonElement>()

    const safeId = useId()
    const { stateClass } = useFormState()
    const sizeFormClass = useFormSize()
    const {
      visible,
      directionClass,
      boundaryClass,
      onMousedown,
      onKeydown,
      toggle,
    } = useDropdown()
    const idButton = computed(() => unref(safeId)())
    const idLabel = computed(() => unref(safeId)('_value_'))
    const idMenu = computed(() => unref(safeId)('_dialog_'))
    const idWrapper = computed(() => unref(safeId)('_outer_'))
    const computedDir = computed(() =>
      props.rtl === true ? 'rtl' : props.rtl === false ? 'ltr' : null
    )

    const focus = () => {
      if (!props.disabled) {
        unref(toggleRef) && attemptFocus(unref(toggleRef)!)
      }
    }

    const blur = () => {
      if (!props.disabled) {
        unref(toggleRef) && attemptBlur(unref(toggleRef)!)
      }
    }

    const setFocus = (event: any) => {
      hasFocus.value = event.type === 'focus'
    }

    const handleHover = (hovered: boolean) => {
      isHovered.value = hovered
    }

    defineExpose({
      focus,
      blur,
    })

    return () => {
      const {
        disabled,
        form,
        formattedValue,
        right,
        readonly,
        required,
        name,
        state,
        size,
        labelSelected,
        buttonVariant,
        buttonOnly,
        menuClass,
        placeholder,
        lang,
      } = props
      const value = props.modelValue || ''
      const invalid = state === false || (required && !value)

      const btnScope = {
        isHovered,
        hasFocus: unref(hasFocus),
        state,
        opened: unref(visible),
      }
      const $button = withDirectives(
        h(
          'button',
          {
            class: [
              'btn',
              {
                [`btn-${buttonVariant}`]: buttonOnly,
                [`btn-${size}`]: size,
                'h-auto': !buttonOnly,
                // `dropdown-toggle` is needed for proper
                // corner rounding in button only mode
                'dropdown-toggle': buttonOnly,
                'dropdown-toggle-no-caret': buttonOnly,
              },
            ],
            ...{
              id: unref(idButton),
              type: 'button',
              '^disabled': disabled ? disabled : null,
              'aria-haspopup': 'dialog',
              'aria-expanded': unref(visible) ? 'true' : 'false',
              'aria-invalid': invalid ? 'true' : null,
              'aria-required': required ? 'true' : null,
            },
            ...{
              onMousedown,
              onClick: toggle,
              onKeydown: toggle, // Handle ENTER, SPACE and DOWN
              '!focus': setFocus,
              '!blur': setFocus,
            },
            ref: 'toggle',
          },
          [
            slots['button-content']
              ? renderSlot(slots, 'button-content', btnScope)
              : /* istanbul ignore next */ h(ChevronDown, { scale: 1.25 }),
          ]
        ),
        [[BvHover, handleHover]]
      )

      // Hidden input
      let $hidden = null
      if (name && !disabled) {
        $hidden = h('input', {
          type: 'hidden',
          name: name || null,
          form: form || null,
          value,
        })
      }

      // Dropdown content
      const $menu = h(
        'div',
        {
          class: [
            'dropdown-menu',
            menuClass,
            {
              show: unref(visible),
              'dropdown-menu-right': right,
            },
          ],
          ...{
            id: unref(idMenu),
            role: 'dialog',
            tabindex: '-1',
            'aria-modal': 'false',
            'aria-labelledby': unref(idLabel),
          },
          onKeydown,
          ref: 'menu',
        },
        [renderSlot(slots, 'default', { opened: unref(visible) })]
      )

      // Value label
      const $label = withDirectives(
        h(
          'label',
          {
            class: buttonOnly
              ? ['sr-only'] // Hidden in button only mode
              : [
                  'form-control',
                  // Mute the text if showing the placeholder
                  { 'text-muted': !value },
                  unref(stateClass),
                  unref(sizeFormClass),
                ],
            ...{
              id: unref(idLabel),
              for: unref(idButton),
              'aria-invalid': invalid ? 'true' : null,
              'aria-required': required ? 'true' : null,
            },
            on: {
              // Disable bubbling of the click event to
              // prevent menu from closing and re-opening

              '!click': /* istanbul ignore next */ (event: any) => {
                stopEvent(event, { preventDefault: false })
              },
            },
          },
          [
            value ? formattedValue || value : placeholder || '',
            // Add the selected label for screen readers when a value is provided
            value && labelSelected
              ? h('bdi', { staticClass: 'sr-only' }, labelSelected)
              : '',
          ]
        ),
        [[BvHover, handleHover]]
      )

      // Return the custom form control wrapper
      return h(
        'div',
        {
          class: [
            'b-form-btn-label-control dropdown',
            unref(directionClass),
            unref(boundaryClass),
            {
              'btn-group': buttonOnly,
              'form-control': !buttonOnly,
              focus: hasFocus.value && !buttonOnly,
              show: unref(visible),
              'is-valid': state === true,
              'is-invalid': state === false,
            },
            buttonOnly ? null : unref(sizeFormClass),
          ],
          ...{
            id: unref(idWrapper),
            role: buttonOnly ? null : 'group',
            lang: lang || null,
            dir: unref(computedDir),
            'aria-disabled': disabled,
            'aria-readonly': readonly && !disabled,
            'aria-labelledby': unref(idLabel),
            'aria-invalid':
              state === false || (required && !value) ? 'true' : null,
            'aria-required': required ? 'true' : null,
          },
        },
        [$button, $hidden, $menu, $label]
      )
    }
  },
})

export default FormBtnLabelControl
export type FormBtnLabelControlInstance = InstanceType<
  typeof FormBtnLabelControl
>
