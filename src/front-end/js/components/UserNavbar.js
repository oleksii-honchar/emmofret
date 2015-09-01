import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModalActions from '../actions/ModalActions.js'
import * as AppActions from '../actions/AppActions.js'
//import UserStore from '../store/UserStore.js'
import _ from 'lodash'

import { Nav, NavItem, DropdownButton, MenuItem } from 'react-bootstrap'

function select(state) {
  return {
    application: state.application,
    modals: state.modals
  }
}

function actions(dispatch) {
  return {
    actions: {
      modal: bindActionCreators(ModalActions, dispatch),
      application: bindActionCreators(AppActions, dispatch)
    }
  }
}

export default class UserNavbar extends React.Component {
  //constructor (props) {
  //  super(props)
    //this.state = this.getStoreState()
    //this.onChangeStore = this.onChangeStore.bind(this)
  //}

  //componentDidMount () {
  //  UserStore.on('change', this.onChangeStore)
  //}
  //
  //componentWillUnmount () {
  //  UserStore.off('change', this.onChangeStore, this)
  //}

  //getStoreState () {
  //  return {
  //    store: UserStore.getState()
  //  }
  //}

  //onChangeStore () {
  //  this.setState(this.getStoreState())
  //}

  render () {
    const { application, modals, actions } = this.props
    const { user } = application

    if (!_.isNull(user)) {
      let fullName = `${user.firstName} ${user.lastName}`
      let title = (
        <span className='user-pic'>
          <img src='/public/images/avatar-flat-man-1.png'/>
          {fullName}
        </span>
      )

      return (
        <Nav data-class='UserNavbar' navbar right >
          <DropdownButton title={title}>
            <MenuItem onSelect={actions.application.logout}>Logout</MenuItem>
          </DropdownButton>
        </Nav>
      )
    } else {
      return (
        <Nav data-class='UserNavbar' navbar right >
          <NavItem onSelect={ ()=> actions.modal.show('login') }>Log in</NavItem>
          <NavItem onSelect={ ()=> actions.modal.show('sign-up') }>Sign up</NavItem>
        </Nav>
      )
    }
  }
}

export default connect(select, actions)(UserNavbar)
