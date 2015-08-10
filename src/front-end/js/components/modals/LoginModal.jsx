import UserActions from '../../actions/UserActions.js'
import ModalActions from '../../actions/ModalActions.js'
import ModalStore from '../../stores/ModalStore.js'

import EmailInput from '../inputs/EmailInput.jsx'
import PasswordInput from '../inputs/PasswordInput.jsx'

import _ from 'lodash'

let { Modal, Button } = RB
let { Header, Body, Title, Footer } = Modal

class LoginModal extends React.Component{
  constructor(props) {
    super(props)
    this.state = this.getStoreState()

    this.onChange = this.onChange.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChange)
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChange)
  }

  close () {
    ModalActions.hide('login')
  }

  getStoreState () {
    return {
      store: ModalStore.getState().get('login')
    }
  }

  login () {
    let credentials = _.pick(this.state, ['email', 'password'])
    UserActions.login(credentials)
  }

  onChange () {
    this.setState(this.getStoreState())
  }

  onChangeProp (propName) {
    let state = {}

    return (newValue) => {
      state[propName] = newValue
      this.setState(state)
    }
  }

  render () {
    return (
      <Modal show={this.state.store.get('isOpen')} onHide={this.close} bsSize='sm'>
        <Header closeButton>
          <Title>Login</Title>
        </Header>
        <Body>
          <EmailInput onSave={this.onChangeProp('email').bind(this)}/>
          <PasswordInput onSave={this.onChangeProp('password').bind(this)}/>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.login}>Log in</Button>
        </Footer>
      </Modal>
    )
  }
}

LoginModal.propsTypes = {
  email: React.PropTypes.string.isRequired,
  password: React.PropTypes.string.isRequired
}

LoginModal.defaultsProps = {
  email: '',
  password: ''
}

export default LoginModal