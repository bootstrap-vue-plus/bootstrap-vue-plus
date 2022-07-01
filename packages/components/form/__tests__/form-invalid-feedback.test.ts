import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvFormInvalidFeedback } from '..'

describe('form-invalid-feedback', () => {
  test('default should have tag div', async () => {
    const wrapper = mount(BvFormInvalidFeedback)

    expect(wrapper.element.tagName).toBe('DIV')

    wrapper.unmount()
  })

  test('default should contain base class', async () => {
    const wrapper = mount(BvFormInvalidFeedback)

    expect(wrapper.classes()).toContain('invalid-feedback')

    wrapper.unmount()
  })

  test('default should not have class d-block', async () => {
    const wrapper = mount(BvFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.unmount()
  })

  test('default should not have class invalid-tooltip', async () => {
    const wrapper = mount(BvFormInvalidFeedback)

    expect(wrapper.classes()).not.toContain('invalid-tooltip')

    wrapper.unmount()
  })

  test('default should not have id', async () => {
    const wrapper = mount(BvFormInvalidFeedback)

    expect(wrapper.attributes('id')).toBeUndefined()

    wrapper.unmount()
  })

  test('default should have user supplied id', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        id: 'foobar',
      },
    })

    expect(wrapper.attributes('id')).toBe('foobar')

    wrapper.unmount()
  })

  test('should have tag small when tag=small', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        tag: 'small',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')

    wrapper.unmount()
  })

  test('should contain class d-block when force-show is set', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        forceShow: true,
      },
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  test('should contain class d-block when state is false', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        state: false,
      },
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  test('should not contain class d-block when state is true', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        state: true,
      },
    })

    expect(wrapper.classes()).not.toContain('d-block')

    wrapper.unmount()
  })

  test('should contain class d-block when force-show is true and state is true', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        forceShow: true,
        state: true,
      },
    })

    expect(wrapper.classes()).toContain('d-block')

    wrapper.unmount()
  })

  test('should contain class invalid-tooltip when tooltip is set', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        tooltip: true,
      },
    })

    expect(wrapper.classes()).toContain('invalid-tooltip')

    wrapper.unmount()
  })

  test('should not contain class invalid-feedback when tooltip is set', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      props: {
        tooltip: true,
      },
    })

    expect(wrapper.classes()).not.toContain('invalid-feedback')

    wrapper.unmount()
  })

  test('should have children in the default slot when supplied', async () => {
    const wrapper = mount(BvFormInvalidFeedback, {
      slots: {
        default: ['foo', '<span>bar</span>'],
      },
    })

    expect(wrapper.text()).toContain('foo')
    expect(wrapper.text()).toContain('bar')

    wrapper.unmount()
  })
})
