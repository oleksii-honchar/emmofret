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
    const rootContent = [
      <Provider store={AppStore} key="provider">
        {routes.bind(null, this.props.history)}
      </Provider>
    ]

    if (__DEVTOOLS__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
      rootContent.push(
        <DebugPanel key="debug-panel" top right bottom>
          <DevTools store={AppStore} monitor={LogMonitor} />
        </DebugPanel>
      )
    }

    return (
      <div>{rootContent}</div>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired
}