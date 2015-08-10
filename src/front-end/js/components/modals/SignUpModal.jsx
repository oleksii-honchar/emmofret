import ModalActions from '../../actions/ModalActions.js'
import ModalStore from '../../stores/ModalStore.js'

let { Modal, Button } = RB
let { Header, Body, Title, Footer } = Modal

class SignUpModal extends React.Component{
  constructor(props) {
    super(props)
    this.state = this.getState()

    this.onChange = this.onChange.bind(this)
  }

  getState () {
    return {
      data: ModalStore.getState().get('sign-up')
    }
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChange)
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChange)
  }

  close () {
    ModalActions.hide('sign-up')
  }

  onChange () {
    this.setState(this.getState())
  }

  render () {
    return (
      <Modal show={this.state.data.get('isOpen')} onHide={this.close} bsSize='sm'>
        <Header closeButton>
          <Title>Sign up</Title>
        </Header>
        <Body>
          <h4>Text in a modal</h4>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </Body>
        <Footer>
          <Button onClick={this.close}>Close</Button>
        </Footer>
      </Modal>
    )
  }
}

export default SignUpModal