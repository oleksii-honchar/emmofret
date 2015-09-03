import React from 'react'
import { PropTypes } from 'react'
import { Provider } from 'react-redux'

import AppStore from '../store.js'

import Routes from './Routes'

export default class Root extends React.Component {
  render() {
    const rootContent = [
      <Provider store={AppStore} key="provider">
        { () => <Routes {...this.props}/> }
      </Provider>
    ]

    //if (__DEVTOOLS__) {
    //  const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react')
    //  rootContent.push(
    //    <DebugPanel key="debug-panel" top left bottom>
    //      <DevTools store={AppStore} monitor={LogMonitor} />
    //    </DebugPanel>
    //  )
    //}

    return (
      <div>{rootContent}</div>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired
}