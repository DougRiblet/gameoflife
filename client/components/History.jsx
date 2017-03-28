import React from 'react'

export default class History extends React.Component {
  render () {
    return (
      <div>
        <p>British mathematician John Conway invented the Game of Life in 1970. The game involves tracking patterns on a two-dimensional grid. The patterns change from round to round according to a simple set of rules. Early enthusiasts tracked changes using pencil and paper or chess boards, but computers soon became the preferred tool.</p>
        <p>Each cell in the grid has one of two states: on or off, living or dead. You can set up an initial pattern or have it generated randomly. With each round or "generation", a cell's state is determined by interaction with its eight neighboring cells. The rules:</p>
        <ul>
          <li>A living cell with 2 or 3 live neighbors stays on ("Survival").</li>
          <li>A living cell with 0-1 or 4-8 live neighbors turns off ("Death").</li>
          <li>A dead cell with exactly 3 live neigbors turns on ("Birth").</li>
        </ul>
        <p>Read more at <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Wikipedia</a>, or read a lot more at <a href='http://www.conwaylife.com/wiki/Main_Page'>LifeWiki</a>.</p>
      </div>
    )
  }
}
