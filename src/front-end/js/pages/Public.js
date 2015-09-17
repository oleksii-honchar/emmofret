import React from 'react'

import TopNavbar from '../components/TopNavbar.js'

class Public extends React.Component {
  render () {
    return (
      <div>
        <TopNavbar />
        <div className='container-fluid'>
          <p>public content pending</p>
        </div>
      </div>
    )
  }
}

export default Public
