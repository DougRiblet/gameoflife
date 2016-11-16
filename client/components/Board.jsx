import React from 'react'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <svg width='800' height='400'>
        <rect width='800' height='400' fill='papayawhip' />
      </svg>
    )
  }

}
