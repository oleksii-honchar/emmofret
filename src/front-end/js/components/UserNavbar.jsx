import ModalActions from '../actions/ModalActions.js'
import UserActions from '../actions/UserActions.js'
import MeStore from '../stores/MeStore.js'
import _ from 'lodash'

let { Nav, NavItem, DropdownButton, MenuItem } = RB

class UserNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getStoreState()
    this.onChangeStore = this.onChangeStore.bind(this)
  }

  componentDidMount () {
    MeStore.on('change', this.onChangeStore)
    window.UserNavbar = this
  }

  componentWillUnmount () {
    MeStore.off('change', this.onChangeStore, this)
  }

  getStoreState () {
    return {
      store: MeStore.getState()
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
    if(_.has(this.state.store,'id')) {
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

export default UserNavbar