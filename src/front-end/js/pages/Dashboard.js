import React from 'react'

import HelloWorld from '../components/HelloWorld.js'
import Counter from '../components/Counter.js'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <HelloWorld />
        <Counter />
      </div>
    )
  }
}

export default Dashboard
