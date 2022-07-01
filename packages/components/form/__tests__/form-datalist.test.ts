import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { BvFormDatalist } from '..'

describe('form-datalist', () => {
  test('has root element datalist', async () => {
    const wrapper = mount(BvFormDatalist, {
      props: {
        id: 'test-list',
      },
    })
    expect(wrapper.element.tagName).toBe('DATALIST')

    wrapper.unmount()
  })

  test('has user supplied ID', async () => {
    const wrapper = mount(BvFormDatalist, {
      props: {
        id: 'test-list',
      },
    })
    expect(wrapper.attributes('id')).toBe('test-list')

    wrapper.unmount()
  })

  test('has no option elements by default', async () => {
    const wrapper = mount(BvFormDatalist, {
      props: {
        id: 'test-list',
      },
    })
    expect(wrapper.findAll('option').length).toBe(0)

    wrapper.unmount()
  })

  test('has options when options set', async () => {
    const wrapper = mount(BvFormDatalist, {
      props: {
        id: 'test-list',
        options: ['one', 'two'],
      },
    })
    const $options = wrapper.findAll('option')

    expect($options.length).toBe(2)

    expect($options[0].text()).toBe('one')
    expect($options[1].text()).toBe('two')

    expect($options[0].attributes('value')).toBe('one')
    expect($options[1].attributes('value')).toBe('two')

    wrapper.unmount()
  })
})
