import React from 'react'
import ReactDOM from 'react-dom'
import History from './History'
import renderer from 'react-test-renderer'

test('History component displays history', () => {
  const component = renderer.create(
    <History />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

describe('History', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<History/>, div)
    })
})