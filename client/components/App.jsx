import React from 'react'
import Header from './Header'
import Board from './Board'
import Footer from './Footer'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='app'>
        <div id='header'>
          <Header />
        </div>
        <div id='board'>
          <Board />
        </div>
        <div id='footer'>
          <Footer />
        </div>
      </div>
    )
  }

}
