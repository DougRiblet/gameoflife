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
    this.generateAcorn = this.generateAcorn.bind(this)
    this.generateGGG = this.generateGGG.bind(this)
  }

  generateRandomBoard () {
    let newrandom = Array.from({length: 60}, () => Array.from({length: 100}, () => Math.random() < 0.2))
    this.setState({grid: newrandom, generation: 0})
  }

  clearBoard () {
    let emptyBoard = Array(60).fill(Array(100).fill(false))
    this.setState({grid: emptyBoard, generation: 0})
  }

  generateGGG () {
    let gggBoard = Array.from({length: 60}, () => Array.from({length: 100}, () => false))
    let gggArray = [[10, 12], [10, 13], [11, 12], [11, 13], [10, 22], [11, 22], [12, 22], [9, 23], [13, 23], [8, 24], [8, 25], [14, 24], [14, 25], [11, 26], [13, 27], [9, 27], [10, 28], [11, 28], [12, 28], [11, 29], [8, 32], [8, 33], [9, 32], [9, 33], [10, 32], [10, 33], [7, 34], [11, 34], [7, 36], [11, 36], [6, 36], [12, 36], [8, 46], [8, 47], [9, 46], [9, 47]]
    gggArray.forEach(function (p) {
      gggBoard[p[0]][p[1]] = true
    })
    this.setState({grid: gggBoard, generation: 0})
  }

  generateAcorn () {
    let acornBoard = Array.from({length: 60}, () => Array.from({length: 100}, () => false))
    let acornArray = [[10, 12], [10, 13], [10, 16], [10, 17], [10, 18], [8, 13], [9, 15]]
    acornArray.forEach(function (p) {
      acornBoard[p[0]][p[1]] = true
    })
    this.setState({grid: acornBoard, generation: 0})
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
          generateAcorn={() => this.generateAcorn()}
          generateGGG={() => this.generateGGG()}
          generation={this.state.generation}
        />
      </div>
    )
  }

}
