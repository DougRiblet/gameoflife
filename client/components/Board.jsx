import React from 'react'
import update from 'immutability-helper'
import Controls from './Controls'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: Array.from({length: 60}, () => Array.from({length: 100}, () => Math.random() < 0.2)),
      generation: 0,
      allow_toggle: false
    }
    this.generateRandomBoard = this.generateRandomBoard.bind(this)
    this.clearBoard = this.clearBoard.bind(this)
    this.stepForward = this.stepForward.bind(this)
    this.startGens = this.startGens.bind(this)
    this.pauseGens = this.pauseGens.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
  }

  generateRandomBoard () {
    let newrandom = Array.from({length: 60}, () => Array.from({length: 100}, () => Math.random() < 0.2))
    this.setState({grid: newrandom, generation: 0})
  }

  clearBoard () {
    let emptyBoard = Array(60).fill(Array(100).fill(false))
    this.setState({grid: emptyBoard, generation: 0})
  }

  stepForward () {
    let newgrid = this.state.grid.map((row, y) => {
      return row.map((dot, x) => {
        let nearby = []
        nearby.push(this.state.grid[(y + 59) % 60][(x + 99) % 100])
        nearby.push(this.state.grid[(y + 59) % 60][x])
        nearby.push(this.state.grid[(y + 59) % 60][(x + 1) % 100])
        nearby.push(this.state.grid[y][(x + 99) % 100])
        nearby.push(this.state.grid[y][(x + 1) % 100])
        nearby.push(this.state.grid[(y + 1) % 60][(x + 99) % 100])
        nearby.push(this.state.grid[(y + 1) % 60][x])
        nearby.push(this.state.grid[(y + 1) % 60][(x + 1) % 100])
        let nearcount = nearby.filter(i => i === true).length
        if (nearcount === 3 || (dot && nearcount === 2)) {
          return true
        } else {
          return false
        }
      })
    })
    this.setState({grid: newgrid, generation: this.state.generation + 1})
  }

  startGens () {
    var interval = setInterval(this.stepForward, 250)
    this.setState({interval: interval, allow_toggle: false})
  }

  pauseGens () {
    clearInterval(this.state.interval)
    this.setState({allow_toggle: true})
  }

  toggleCell (togx, togy) {
    if (this.state.allow_toggle) {
      let toggrid = update(this.state.grid, {
        [togy]: {
          [togx]: {$apply: function (x) { return !x }}
        }
      })
      this.setState({grid: toggrid})
    }
  }

  componentDidMount () {
    this.startGens()
  }

  componentWillUnmount () {
    this.pauseGens()
  }

  render () {
    return (
      <div>
        <svg>
          <rect />
          {
            this.state.grid.map((row, y) => {
              return row.map((dot, x) => {
                let oxo = 'on' + String(dot)
                return (
                  <circle
                    className={oxo}
                    cx={x * 10 + 6} cy={y * 10 + 6} r='4'
                    onClick={() => this.toggleCell(x, y)}
                  />
                )
              })
            })
          }
        </svg>
        <Controls
          generateRandomBoard={() => this.generateRandomBoard()}
          clearBoard={() => this.clearBoard()}
          stepForward={() => this.stepForward()}
          startGens={() => this.startGens()}
          pauseGens={() => this.pauseGens()}
          generation={this.state.generation}
        />
      </div>
    )
  }

}
