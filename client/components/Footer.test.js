import React from 'react'
import ReactDOM from 'react-dom'
import Footer from './Footer'
import renderer from 'react-test-renderer'

test('Footer component displays footer', () => {
  const component = renderer.create(
    <Footer />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Footer', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Footer/>, div)
    })
})
