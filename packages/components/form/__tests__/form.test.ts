import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvForm } from '..'

describe('form', () => {
  test('has expected default structure', async () => {
    const wrapper = mount(BvForm)

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('renders default slot content', async () => {
    const wrapper = mount(BvForm, {
      slots: {
        default: 'foobar',
      },
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).toBeUndefined()
    expect(wrapper.attributes('novalidate')).toBeUndefined()
    expect(wrapper.text()).toEqual('foobar')

    wrapper.unmount()
  })

  test('has class form-inline when prop inline set', async () => {
    const wrapper = mount(BvForm, {
      props: {
        inline: true,
      },
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes()).toContain('form-inline')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeUndefined()
    expect(wrapper.attributes('novalidate')).toBeUndefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('has class was-validation when prop validated set', async () => {
    const wrapper = mount(BvForm, {
      props: {
        validated: true,
      },
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes()).toContain('was-validated')
    expect(wrapper.classes().length).toBe(1)
    expect(wrapper.attributes('id')).toBeUndefined()
    expect(wrapper.attributes('novalidate')).toBeUndefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('has user supplied id', async () => {
    const wrapper = mount(BvForm, {
      props: {
        id: 'foo',
      },
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('foo')
    expect(wrapper.attributes('novalidate')).toBeUndefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })

  test('has attribute novalidate when prop novalidate set', async () => {
    const wrapper = mount(BvForm, {
      props: {
        novalidate: true,
      },
    })

    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBe(0)
    expect(wrapper.attributes('id')).toBeUndefined()
    expect(wrapper.attributes('novalidate')).toBeDefined()
    expect(wrapper.text()).toEqual('')

    wrapper.unmount()
  })
})
