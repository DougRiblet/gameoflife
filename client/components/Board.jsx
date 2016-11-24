import React from 'react'
import Controls from './Controls'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: Array.from({length: 40}, () => Array.from({length: 80}, () => Math.random() < 0.2)),
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
    let newrandom = Array.from({length: 40}, () => Array.from({length: 80}, () => Math.random() < 0.2))
    this.setState({grid: newrandom, generation: 0})
  }

  clearBoard () {
    let emptyBoard = Array(40).fill(Array(80).fill(false))
    this.setState({grid: emptyBoard, generation: 0})
  }

  stepForward () {
    let newgrid = this.state.grid.map((row, y) => {
      return row.map((dot, x) => {
        let nearby = []
        nearby.push(this.state.grid[(y + 39) % 40][(x + 79) % 80])
        nearby.push(this.state.grid[(y + 39) % 40][x])
        nearby.push(this.state.grid[(y + 39) % 40][(x + 1) % 80])
        nearby.push(this.state.grid[y][(x + 79) % 80])
        nearby.push(this.state.grid[y][(x + 1) % 80])
        nearby.push(this.state.grid[(y + 1) % 40][(x + 79) % 80])
        nearby.push(this.state.grid[(y + 1) % 40][x])
        nearby.push(this.state.grid[(y + 1) % 40][(x + 1) % 80])
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
      let toggrid = this.state.grid.map((row, y) => {
        return row.map((dot, x) => {
          console.log('dot: ', dot, !dot)
          if (x === togx && y === togy) {
            return !dot
          } else {
            return dot
          }
        })
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
