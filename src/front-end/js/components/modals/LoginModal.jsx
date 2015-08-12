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

    this.state = _.clone(props)
    this.state = _.extend(this.state, this.getStoreState())

    this.onChangeStore = this.onChangeStore.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChangeStore)
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChangeStore)
  }

  close () {
    ModalActions.hide('login')
  }

  getStoreState () {
    return {
      store: ModalStore.getState().get('login')
    }
  }

  getClassName () {
    let res = ''
    if (this.state.store.get('shaking')) {
      res = `shake shake-constant shake-${this.state.store.get('shakeStyle')}`
    }
    return res
  }

  login () {
    let credentials = {
      email : this.state.email.value,
      password : this.state.password.value
    }

    UserActions.login(credentials)
  }

  onChangeStore () {
    this.setState(this.getStoreState())
  }

  onChangeState (propName) {
    let state = {}

    return (newValue) => {
      state[propName] = newValue
      this.setState(state)
    }
  }

  render () {
    return (
      <Modal show={this.state.store.get('isOpen')} onHide={this.close} bsSize='sm'
             dialogClassName={this.getClassName()}>
        <Header closeButton>
          <Title>Login</Title>
        </Header>
        <Body>
          <EmailInput autoFocus noValidation onSave={this.onChangeState('email').bind(this)}/>
          <PasswordInput noValidation onSave={this.onChangeState('password').bind(this)}/>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.login}>Log in</Button>
        </Footer>
      </Modal>
    )
  }
}

LoginModal.propsTypes = {
  email: React.PropTypes.any,
  password: React.PropTypes.any
}

LoginModal.defaultsProps = {
  email: '',
  password: ''
}

export default LoginModal