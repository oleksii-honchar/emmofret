import React from 'react'

import HelloWorld from '../components/HelloWorld.js'
import TopNavbar from '../components/TopNavbar.js'

class Dashboard extends React.Component {
  render () {
    return (
      <div>
        <TopNavbar/>
        <div className='container-fluid'>
          <HelloWorld />
        </div>
      </div>
    )
  }
}

export default Dashboard
