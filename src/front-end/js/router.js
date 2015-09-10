import React, { PropTypes } from 'react'
import Router from 'react-router'
import { Provider } from 'react-redux'

import RouterContainer from './containers/RouterContainer'
import createRoutes from './routes'
import fetchCmpState from './helpers/fetchComponentState'

export default (location, history, store) => {
  return new Promise( (resolve, reject) => {
    const routes = createRoutes(store)
    Router.run(routes, location, (error, routerState, transition) => {
      if (error) {
        return reject(error)
      }

      if (history) {
        routerState.history = history
      }

      try {
        if (window) {
          console.log('before fetch')
          fetchCmpState(store.dispatch, routerState.components, routerState.params)
            .then( (res) => {
              const content = (
                <Provider store={store} key="provider">
                  {() => <RouterContainer {...routerState} children={routes}/>}
                </Provider>
              )
              console.log('after fetch')
              resolve({content})
            })
        }
      }
      catch (e) {
        const content = (
          <Provider store={store} key="provider">
            {() => <RouterContainer {...routerState} children={routes}/>}
          </Provider>
        )

        resolve({content})
      }

    })
  })
}
