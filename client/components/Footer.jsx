import React from 'react'

export default class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <p>
          Created by Doug Riblet | <a href='https://github.com/smashzen'>github.com/smashzen</a>
        </p>
      </div>
    )
  }

}
