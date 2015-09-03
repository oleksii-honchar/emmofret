import React from 'react'
import { authenticated } from '../decorators'

@authenticated()
export default class Private extends React.Component {
  render () {
    return (
      <p>private content pending</p>
    )
  }
}
