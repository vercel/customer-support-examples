/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'

import Button from '../components/button'

jest.setTimeout(30000)
global.Intercom = jest.fn()

describe('The button', () => {
  it('should load intercom when mouse hovers', () => {
    let wrapper = shallow(<Button appName="intercom" />)
    wrapper.find('a').simulate('mouseenter')
    expect(wrapper.find('span').prop('style')).toEqual({
      display: 'none',
    })
    expect(wrapper.find('LoadableComponent')).toHaveLength(1)
  })

  it('should show loading status after click', () => {
    let wrapper = shallow(<Button appName="intercom" />)
    wrapper.find('a').simulate('mouseenter')
    wrapper.find('a').simulate('click')
    expect(wrapper.find('a').hasClass('disabled'))
    expect(wrapper.find('LoadableComponent')).toHaveLength(1)
  })

  it('should stop loading component after 5500', done => {
    let wrapper = shallow(<Button appName="intercom" />)
    wrapper.find('a').simulate('click')
    setTimeout(() => {
      expect(wrapper.find('span')).toHaveLength(0)
      expect(wrapper.find('a').hasClass('disabled')).toBeFalsy()
      done()
    }, 5500)
  })
})
