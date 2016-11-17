import React from 'react'

export default class Board extends React.Component {
  constructor (props) {
    super(props)
    this.grid = Array.from({length: 40}, () => Array.from({length: 80}, () => Math.random() < 0.2))
  }

  render () {
    return (
      <svg width='800' height='400'>
        <rect width='800' height='400' fill='papayawhip' />
        {
          this.grid.map((row, y) => {
            return row.map((dot, x) => {
              let oxo = 'on' + String(dot)
              return (
                <circle className={oxo} cx={x * 10 + 5} cy={y * 10 + 5} r='4' />
              )
            })
          })
        }
      </svg>
    )
  }

}
