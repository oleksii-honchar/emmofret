/* global RB, React */
import ModalActions from '../actions/ModalActions.js'
import UserActions from '../actions/UserActions.js'
import UserStore from '../stores/UserStore.js'
import _ from 'lodash'

let { Nav, NavItem, DropdownButton, MenuItem } = RB

export default class UserNavbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getStoreState()
    this.onChangeStore = this.onChangeStore.bind(this)
  }

  componentDidMount () {
    UserStore.on('change', this.onChangeStore)
    window.UserNavbar = this
  }

  componentWillUnmount () {
    UserStore.off('change', this.onChangeStore, this)
  }

  getStoreState () {
    return {
      store: UserStore.getState()
    }
  }

  onChangeStore () {
    this.setState(this.getStoreState())
  }

  showLogin () {
    ModalActions.show('login')
  }

  showSignUp () {
    ModalActions.show('sign-up')
  }

  render () {
    if (_.has(this.state.store, 'id')) {
      let fullName = `${this.state.store.firstName} ${this.state.store.lastName}`
      let title = (
        <span className='user-pic'>
          <img src='/public/images/avatar-flat-man-1.png'/>
          {fullName}
        </span>
      )

      return (
        <Nav data-class='UserNavbar' navbar right >
          <DropdownButton title={title}>
            <MenuItem onSelect={UserActions.logOut}>Logout</MenuItem>
          </DropdownButton>
        </Nav>
      )
    } else {
      return (
        <Nav data-class='UserNavbar' navbar right >
          <NavItem onSelect={this.showLogin}>Log in</NavItem>
          <NavItem onSelect={this.showSignUp}>Sign up</NavItem>
        </Nav>
      )
    }
  }
}
