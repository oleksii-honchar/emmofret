import ModalActions from '../../actions/ModalActions.js'
import ModalStore from '../../stores/ModalStore.js'

import EmailInput from '../inputs/EmailInput.jsx'

let { Modal, Button } = RB
let { Header, Body, Title, Footer } = Modal

class LoginModal extends React.Component{
  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChange.bind(this))
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChange.bind(this))
  }

  close () {
    ModalActions.hide('login')
  }

  getChildContext () {
    return {
      email : 'test@mail.com'
    }
  }

  getState () {
    return {
      data: ModalStore.getState().get('login')
    }
  }

  onChange () {
    this.setState(this.getState())
  }

  render () {
    return (
      <Modal show={this.state.data.get('isOpen')} onHide={this.close} bsSize='sm'>
        <Header closeButton>
          <Title>Login</Title>
        </Header>
        <Body>
          <EmailInput />
        </Body>
        <Footer>
          <Button onClick={this.close}>Close</Button>
        </Footer>
      </Modal>
    )
  }
}

LoginModal.childContextTypes = {
  email: React.PropTypes.string
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