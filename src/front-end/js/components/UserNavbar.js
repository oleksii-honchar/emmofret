import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModalActions from '../actions/ModalActions.js'
import * as AppActions from '../actions/AppActions.js'
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
      showLogIn: bindActionCreators(() => ModalActions.show('login'), dispatch),
      logOut: bindActionCreators(AppActions.logOut, dispatch),
      showSignUp: bindActionCreators(() => ModalActions.show('sign-up'), dispatch)
    }
  }
}

class UserNavbar extends React.Component {
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
            <MenuItem onSelect={actions.logOut}>Logout</MenuItem>
          </DropdownButton>
        </Nav>
      )
    } else {
      return (
        <Nav data-class='UserNavbar' navbar right >
          <NavItem onSelect={ actions.showLogIn }>Log in</NavItem>
          <NavItem onSelect={ actions.showSignUp }>Sign up</NavItem>
        </Nav>
      )
    }
  }
}

export default connect(select, actions)(UserNavbar)
