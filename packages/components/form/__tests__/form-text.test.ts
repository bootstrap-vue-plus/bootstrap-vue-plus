import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvFormText } from '..'

describe('form > form-text', () => {
  test('has expected default structure', async () => {
    const wrapper = mount(BvFormText)

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('renders default slot content', async () => {
    const wrapper = mount(BvFormText, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  test('renders custom root element when prop tag set', async () => {
    const wrapper = mount(BvFormText, {
      props: {
        tag: 'p',
      },
    })

    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('has user supplied ID', async () => {
    const wrapper = mount(BvFormText, {
      props: {
        id: 'foo',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')

    wrapper.unmount()
  })

  test('does not have class form-text when prop inline set', async () => {
    const wrapper = mount(BvFormText, {
      props: {
        inline: true,
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).not.toContain('form-text')
    expect(wrapper.classes()).toContain('text-muted')
    expect(wrapper.classes().length).toBe(1)

    wrapper.unmount()
  })

  test('has variant class applied when prop text-variant is set', async () => {
    const wrapper = mount(BvFormText, {
      props: {
        textVariant: 'info',
      },
    })

    expect(wrapper.element.tagName).toBe('SMALL')
    expect(wrapper.classes()).toContain('form-text')
    expect(wrapper.classes()).toContain('text-info')
    expect(wrapper.classes().length).toBe(2)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })
})
