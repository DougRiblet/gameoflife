import React from 'react'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grid: Array.from({length: 40}, () => Array.from({length: 80}, () => Math.random() < 0.2))
    }
  }

  redrawBoard () {
    let newgrid = this.grid.map((row, y) => {
      return row.map((dot, x) => {
        let nearby = []
        nearby.push(this.grid[(y - 1) % 40][(x - 1) % 80])
        nearby.push(this.grid[(y - 1) % 40][x])
        nearby.push(this.grid[(y - 1) % 40][(x + 1) % 80])
        nearby.push(this.grid[y][(x - 1) % 80])
        nearby.push(this.grid[y][(x + 1) % 80])
        nearby.push(this.grid[(y + 1) % 40][(x - 1) % 80])
        nearby.push(this.grid[(y + 1) % 40][x])
        nearby.push(this.grid[(y + 1) % 40][(x + 1) % 80])
        let nearcount = nearby.filter(i => true).length
        if (nearcount === 3 || (dot && nearcount === 2)) {
          return true
        } else {
          return false
        }
      })
    })
    this.setState({grid: newgrid})
  }

  render () {
    return (
      <div>
        <svg width='802' height='402'>
          <rect width='802' height='402' fill='papayawhip' />
          {
            this.state.grid.map((row, y) => {
              return row.map((dot, x) => {
                let oxo = 'on' + String(dot)
                return (
                  <circle className={oxo} cx={x * 10 + 6} cy={y * 10 + 6} r='4' />
                )
              })
            })
          }
        </svg>
      </div>
    )
  }

}
