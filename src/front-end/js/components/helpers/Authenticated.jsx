import ModalActions from '../../actions/ModalActions.js'
import UserStore from '../../stores/UserStore.js'
import RouterActions from '../../actions/RouterActions.js'
import RouterStore from '../../stores/RouterStore.js'

import _ from 'lodash'

export default (Composed) => {
  return class Authenticated extends React.Component {
    constructor() {
      super()
    }

    static willTransitionTo (transition) {
      if (!UserStore.isLoggedIn()) {
        RouterActions.storeRouterTransitionPath(transition.path)
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