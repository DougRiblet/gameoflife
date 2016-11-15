import React from 'react'

export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <h2>Conway's Game of Life</h2>
      </div>
    )
  }

}
