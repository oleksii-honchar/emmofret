import React from 'react'

import TopNavbar from '../components/TopNavbar.js'

export default class Private extends React.Component {
  render () {
    const {props} = this
    return (
      <div>
        <TopNavbar/>
        <div className='container-fluid'>
          <p>private content pending</p>
        </div>
      </div>
    )
  }
}
