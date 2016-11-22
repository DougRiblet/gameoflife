import React from 'react'

export default class Controls extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div id='ctbar'>
        <button onClick={this.props.generateRandomBoard} >New Board</button>
        <button onClick={this.props.clearBoard} >Clear Board</button>
        <button onClick={this.props.stepForward} >Step Forward</button>
        <button onClick={this.props.startGens} >Start Gens</button>
        <button onClick={this.props.pauseGens} >Pause Gens</button>
        <span id='generations'>
          Gen: {this.props.generation}
        </span>
      </div>
    )
  }

}
