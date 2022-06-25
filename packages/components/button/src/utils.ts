import {
  addClass,
  isBoolean,
  isLink as isLinkStrict,
  isTag,
  pluckProps,
  removeClass,
} from '@bootstrap-vue-plus/utils'
import { linkProps } from '../../link'

// Focus handler for toggle buttons
// Needs class of 'focus' when focused

export const handleFocus = (event: any) => {
  if (event.type === 'focusin') {
    addClass(event.target, 'focus')
  } else if (event.type === 'focusout') {
    removeClass(event.target, 'focus')
  }
}

// Is the requested button a link?
// If tag prop is set to `a`, we use a <b-link> to get proper disabled handling
export const isLink = (props: Record<string, any>) =>
  isLinkStrict(props) || isTag(props.tag, 'a')

// Is the button to be a toggle button?
export const isToggle = (props: Record<string, any>) => isBoolean(props.pressed)

// Is the button "really" a button?
export const isButton = (props: Record<string, any>) =>
  !(isLink(props) || (props.tag && !isTag(props.tag, 'button')))

// Is the requested tag not a button or link?
export const isNonStandardTag = (props: Record<string, any>) =>
  !isLink(props) && !isButton(props)

// Compute required classes (non static classes)
export const computeClass = (props: Record<string, any>) => [
  'btn',
  `btn-${props.variant || 'secondary'}`,
  {
    [`btn-${props.size}`]: props.size,
    'btn-block': props.block,
    'rounded-pill': props.pill,
    'rounded-0': props.squared && !props.pill,
    disabled: props.disabled,
    active: props.pressed,
  },
]

// Compute the link props to pass to b-link (if required)
export const computeLinkProps = (props: Record<string, any>) =>
  isLink(props) ? pluckProps(linkProps, props) : {}

// Compute the attributes for a button
export const computeAttrs = (
  props: Record<string, any>,
  attrs: Record<string, any>
) => {
  const button = isButton(props)
  const link = isLink(props)
  const toggle = isToggle(props)
  const nonStandardTag = isNonStandardTag(props)
  const hashLink = link && props.href === '#'
  const role = attrs && attrs.role ? attrs.role : null
  let tabindex = attrs ? attrs.tabindex : null
  if (nonStandardTag || hashLink) {
    tabindex = '0'
  }
  return {
    // Type only used for "real" buttons
    type: button && !link ? props.type : null,
    // Disabled only set on "real" buttons
    disabled: button ? props.disabled : null,
    // We add a role of button when the tag is not a link or button for ARIA
    // Don't bork any role provided in `data.attrs` when `isLink` or `isButton`
    // Except when link has `href` of `#`
    role: nonStandardTag || hashLink ? 'button' : role,
    // We set the `aria-disabled` state for non-standard tags
    'aria-disabled': nonStandardTag ? String(props.disabled) : null,
    // For toggles, we need to set the pressed state for ARIA
    'aria-pressed': toggle ? String(props.pressed) : null,
    // `autocomplete="off"` is needed in toggle mode to prevent some browsers
    // from remembering the previous setting when using the back button
    autocomplete: toggle ? 'off' : null,
    // `tabindex` is used when the component is not a button
    // Links are tabbable, but don't allow disabled, while non buttons or links
    // are not tabbable, so we mimic that functionality by disabling tabbing
    // when disabled, and adding a `tabindex="0"` to non buttons or non links
    tabindex: props.disabled && !button ? '-1' : tabindex,
  }
}
