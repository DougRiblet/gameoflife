import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import renderer from 'react-test-renderer'

test('Header component displays header', () => {
  const component = renderer.create(
    <Header />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Header', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Header/>, div)
    })
})
