import React, { PropTypes } from 'react'
import Router from 'react-router'
import { Provider } from 'react-redux'

import RouterContainer from './containers/RouterContainer'
import createRoutes from './routes'

export default (location, history, store) => {

  return new Promise( (resolve, reject) => {
    const routes = createRoutes(store)
    Router.run(routes, location, (error, initialState, transition) => {
      if (error) {
        return reject(error)
      }

      if (history) {
        initialState.history = history
      }

      const content = (
        <Provider store={store} key="provider">
          {() => <RouterContainer {...initialState} children={routes}/>}
        </Provider>
      )
      resolve({content})
    })
  })
}
