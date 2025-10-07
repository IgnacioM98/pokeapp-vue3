import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheWelcome from '../TheWelcome.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(TheWelcome, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.exists()).toBe(true)
  })
})
