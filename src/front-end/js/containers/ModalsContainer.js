import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { hide } from '../actions/ModalActions.js'

import Test1Modal from '../components/modals/Test1Modal.js'
import Test2Modal from '../components/modals/Test2Modal.js'

function select (state) {
  return { modals: Object.assign({}, state.modals) }
}

@connect(select)
export default class ModalsContainer extends React.Component {
  static propTypes = {
    modals: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !_.isEqual(this.props, nextProps)
  }

  render () {
    const { modals } = this.props
    let modal = _.find(modals, (modal, name) => modal.isOpen)
    let modalName = _.result(modal, 'name')
    let modalCmp = null

    const props = {
      modal: modal,
      actions: {
        hide: bindActionCreators(() => hide(modalName), this.props.dispatch)
      }
    }

    if (!modalName) {
      modalCmp = null
    } else if (modalName === 'test1') {
      modalCmp = (<Test1Modal {...props} />)
    } else if (modalName === 'test2') {
      modalCmp = (<Test2Modal {...props}/>)
    }

    return (
      <div id='modal-container'>
        {modalCmp}
      </div>
    )
  }
}
