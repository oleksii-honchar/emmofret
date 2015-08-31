import React from 'react'
import ModalActions from '../../actions/ModalActions.js'
import UserStore from '../../store/UserStore.js'
import Router from '../../containers/Router.js'

export default (Composed) => {
  return class Authenticated extends React.Component {
    constructor () {
      super()
    }

    static willTransitionTo (transition) {
      if (!UserStore.isLoggedIn()) {
        Router.nextTransitionPath = transition.path
        transition.abort()
        ModalActions.show('login')
      }
    }

    render () {
      return (
        <Composed {...this.props} />
      )
    }
  }
}
