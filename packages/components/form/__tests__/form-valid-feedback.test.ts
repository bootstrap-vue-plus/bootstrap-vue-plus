import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvFormValidFeedback } from '..'

describe('form-valid-feedback', () => {
  test('default should have tag div', async () => {
    const wrapper = mount(BvFormValidFeedback)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  test('default should contain base class', async () => {
    const wrapper = mount(BvFormValidFeedback)

    expect(wrapper.classes()).toContain('valid-feedback')

    wrapper.unmount()
  })

  test('default should not have class d-block', async () => {
    const wrapper = mount(BvFormValidFeedback)

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.unmount()
  })

  test('default should not have class valid-tooltip', async () => {
    const wrapper = mount(BvFormValidFeedback)

    expect(wrapper.classes()).not.toContain('valid-tooltip')

    wrapper.unmount()
  })

  test('default should not have id', async () => {
    const wrapper = mount(BvFormValidFeedback)

    expect(wrapper.attributes('id')).toBeUndefined()

    wrapper.unmount()
  })

  test('default should have user supplied id', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        id: 'foobar',
      },
    })

    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.unmount()
  })

  test('should have tag small when tag=small', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        tag: 'small',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')

    wrapper.unmount()
  })

  test('should contain class d-block when force-show is set', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        forceShow: true,
      },
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  test('should contain class d-block when state is true', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        state: true,
      },
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  test('should not contain class d-block when state is false', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        state: false,
      },
    })

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.unmount()
  })

  test('should contain class d-block when force-show is true and state is false', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        forceShow: true,
        state: false,
      },
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  test('should contain class valid-tooltip when tooltip is set', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        tooltip: true,
      },
    })

    expect(wrapper.classes()).toContain('valid-tooltip')

    wrapper.unmount()
  })

  test('should not contain class valid-feedback when tooltip is set', async () => {
    const wrapper = mount(BvFormValidFeedback, {
      props: {
        tooltip: true,
      },
    })

    expect(wrapper.classes()).not.toContain('valid-feedback')

    wrapper.unmount()
  })
})
