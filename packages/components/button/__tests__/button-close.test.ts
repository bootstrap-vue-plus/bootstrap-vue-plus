import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { BvButtonClose } from '..'

describe('button-close', () => {
  test('has root element "button"', async () => {
    const wrapper = mount(BvButtonClose)

    expect(wrapper.element.tagName).toBe('BUTTON')

    wrapper.unmount()
  })

  test('has class "close"', async () => {
    const wrapper = mount(BvButtonClose)

    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  test('has attribute type="button"', async () => {
    const wrapper = mount(BvButtonClose)

    expect(wrapper.attributes('type')).toBe('button')

    wrapper.unmount()
  })

  test('does not have attribute "disabled" by default', async () => {
    const wrapper = mount(BvButtonClose)

    expect(wrapper.attributes('disabled')).toBeUndefined()

    wrapper.unmount()
  })

  test('has attribute "disabled" when prop "disabled" is set', async () => {
    const wrapper = mount(BvButtonClose, {
      props: { disabled: true },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })

  test('has attribute aria-label="Close" by default', async () => {
    const wrapper = mount(BvButtonClose)

    expect(wrapper.attributes('aria-label')).toBe('Close')

    wrapper.unmount()
  })

  test('has custom attribute "aria-label" when prop "aria-label" set', async () => {
    const wrapper = mount(BvButtonClose, {
      props: { ariaLabel: 'foobar' },
    })

    expect(wrapper.attributes('aria-label')).toBe('foobar')

    wrapper.unmount()
  })

  test('has text variant class when "variant" prop set', async () => {
    const wrapper = mount(BvButtonClose, {
      props: { textVariant: 'primary' },
    })

    expect(wrapper.classes()).toContain('close')
    expect(wrapper.classes()).toContain('text-primary')
    expect(wrapper.classes().length).toBe(2)

    wrapper.unmount()
  })

  test('should have default content', async () => {
    const wrapper = mount(BvButtonClose)

    // '&times;' gets converted to '×'
    expect(wrapper.text()).toContain('×')

    wrapper.unmount()
  })

  test('should have custom content from "content" prop', async () => {
    const wrapper = mount(BvButtonClose, {
      props: { content: 'Close' },
    })

    expect(wrapper.text()).toContain('Close')

    wrapper.unmount()
  })

  test('should have custom content from default slot', async () => {
    const wrapper = mount(BvButtonClose, {
      slots: {
        default: '<i>foobar</i>',
      },
    })

    expect(wrapper.text()).toContain('foobar')

    wrapper.unmount()
  })

  test('should emit "click" event when clicked', async () => {
    let event = null
    const spy1 = vi.fn((e) => {
      event = e
    })
    const wrapper = mount(BvButtonClose, {
      attrs: {
        onClick: spy1,
      },
      slots: {
        default: '<i>some <span>text</span></i>',
      },
    })

    expect(spy1).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    await btn.trigger('click')

    expect(spy1).toHaveBeenCalled()
    expect(spy1.mock.calls.length).toBe(1)
    expect(event).toBeInstanceOf(MouseEvent)

    // Works when clicking on an inner element
    const span = wrapper.find('span')
    expect(span).toBeDefined()
    await span.trigger('click')

    expect(spy1.mock.calls.length).toBe(2)

    wrapper.unmount()
  })

  test('should not emit "click" event when disabled and clicked', async () => {
    const spy1 = vi.fn()
    const wrapper = mount(BvButtonClose, {
      props: {
        disabled: true,
      },
      attrs: {
        onClick: spy1,
      },
      slots: {
        default: '<i>some <span>text</span></i>',
      },
    })

    expect(spy1).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    await btn.trigger('click')

    expect(spy1).not.toHaveBeenCalled()

    // For some reason, JSDOM emits a click on button when clicking inner element
    // Although testing in docs, this click is not emitted when disabled
    // Appears to be a bug in JSDOM
    //
    // // Does not emit click on inner element clicks
    // const span = wrapper.find('span')
    // expect(span).toBeDefined()
    // await span.trigger('click')
    //
    // expect(spy1).not.toHaveBeenCalled()

    wrapper.unmount()
  })

  test('handles multiple click listeners', async () => {
    const spy1 = vi.fn()
    const spy2 = vi.fn()
    const wrapper = mount(BvButtonClose, {
      attrs: {
        onClick: [spy1, spy2],
      },
    })

    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    const btn = wrapper.find('button')
    expect(btn).toBeDefined()
    await btn.trigger('click')

    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(spy1.mock.calls.length).toBe(1)
    expect(spy2.mock.calls.length).toBe(1)

    wrapper.unmount()
  })
})
