import React from 'react'
import Router from 'react-router'
import { Provider } from 'react-redux'

import RouterContainer from './containers/RouterContainer'
import createRoutes from './routes'

const getFetchStateFns = (component = {}) => {
  return component.WrappedComponent ?
    getFetchStateFns(component.WrappedComponent) :
    component.fetchState
}

function createTransitionHook (store) {
  return (nextState, transition, callback) => {
    const { params, location: { query } } = nextState

    const promises = nextState.branch
      .map(route => route.component)
      .filter((component) => getFetchStateFns(component))
      .map(getFetchStateFns)
      .map(fetchState => fetchState(store, params, query || {}))

    Promise.all(promises).then(
      () => callback(),
      callback
    )
  }
}

export default (location, history, store) => {
  return new Promise((resolve, reject) => {
    const routes = createRoutes(store)
    Router.run(routes, location, [createTransitionHook(store)], (error, routerState, transition) => {
      if (error) {
        return reject(error)
      }

      if (history) {
        routerState.history = history
      }

      const content = (
        <Provider store={store} key='provider'>
          {() => <RouterContainer {...routerState} children={routes}/>}
        </Provider>
      )

      resolve({content})

    })
  })
}
