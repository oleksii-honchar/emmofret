import React from 'react'
import { connect } from 'react-redux'
import LoginModal from './LoginModal.js'
import SignUpModal from './SignUpModal.js'

import _ from 'lodash'

function select(state) {
  return { modals: state.modals}
}

class ModalsContainer extends React.Component {
  render () {
    const { modals } = this.props
    let modal = _.find(modals, (modal) => modal.isOpen )
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