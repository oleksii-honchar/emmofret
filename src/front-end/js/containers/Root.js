import React from 'react'
import { PropTypes } from 'react'
import { Provider } from 'react-redux'

import AppStore from '../store/AppStore.js'

import routes from '../routes'

export default class Root extends React.Component {
  constructor (props) {
    super(props)

  }

  render() {
    return (
      <Provider store={AppStore} key="provider">
        {routes.bind(null, this.props.history)}
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired
}