import ModalActions from '../actions/ModalActions.js'

let { Nav, NavItem } = RB

class UserNavbar extends React.Component {
  showLogin () {
    ModalActions.show('login')
  }

  showSignUp () {
    ModalActions.show('sign-up')
  }

  render () {
    return (
      <Nav data-class='UserNavbar' navbar right >
        <NavItem onSelect={this.showLogin}>Log in</NavItem>
        <NavItem onSelect={this.showSignUp}>Sign up</NavItem>
      </Nav>
    )
  }
}

export default UserNavbar