import React from 'react'
import History from './History'
import renderer from 'react-test-renderer'

test('History component displays history', () => {
  const component = renderer.create(
    <History />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})