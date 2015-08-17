import ModalActions from '../actions/ModalActions.js'
import MeStore from '../stores/MeStore.js'

let { Nav, NavItem } = RB

class UserNavbar extends React.Component {
  constructor(props) {
    super(props)
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
    return (
      <Nav data-class='UserNavbar' navbar right >
        <NavItem onSelect={this.showLogin}>Log in</NavItem>
        <NavItem onSelect={this.showSignUp}>Sign up</NavItem>
      </Nav>
    )
  }
}

export default UserNavbar