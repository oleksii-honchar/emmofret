import React from 'react'
import Authenticated from '../components/helpers/Authenticated.js'

export default Authenticated(class Private extends React.Component {
  render () {
    return (
      <p>private content pending</p>
    )
  }
})
