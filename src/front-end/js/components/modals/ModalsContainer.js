import React from 'react'
import { connect } from 'react-redux'
import LoginModal from './LoginModal.js'
import SignUpModal from './SignUpModal.js'

import _ from 'lodash'

function select (state) {
  return {
    modals: _.clone(state.modals)
  }
}

class ModalsContainer extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    return !_.isEqual(this.props, nextProps)
  }

  render () {
    const { modals } = this.props
    let modal = _.find(modals, (modal, name) => modal.isOpen)
    let modalName = _.result(modal, 'name')
    let modalCmp = null

    if (!modalName) {
      modalCmp = null
    } else if (modalName === 'login') {
      modalCmp = (<LoginModal />)
    } else if (modalName === 'sign-up') {
      modalCmp = (<SignUpModal />)
    }

    return (
      <div id='modal-container'>
        {modalCmp}
      </div>
    )
  }
}

export default connect(select)(ModalsContainer)