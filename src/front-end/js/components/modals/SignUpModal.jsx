import ModalActions from '../../actions/ModalActions.js'
import UserActions from '../../actions/UserActions.js'
import ModalStore from '../../stores/ModalStore.js'
import _ from 'lodash'

import FullNameInput from '../inputs/FullNameInput.jsx'
import EmailInput from '../inputs/EmailInput.jsx'
import PasswordInput from '../inputs/PasswordInput.jsx'

let { Modal, Button } = RB
let { Header, Body, Title, Footer } = Modal

class SignUpModal extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      form : {
        fullName: '',
        email: '',
        password: ''
      },
      isFormCompleted: false
    }
    this.state = _.extend(this.state, this.getStoreState())

    this.onChangeStore = this.onChangeStore.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  checkSignUpBtnState () {
    let isAllValid =  _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return prop.isValid
      } else
        return false
    })

    this.setState({ isFormCompleted : isAllValid })
  }

  getStoreState () {
    return {
      store: ModalStore.getState().get('sign-up')
    }
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChangeStore)
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChangeStore)
  }

  close () {
    ModalActions.hide('sign-up')
  }

  onChangeState (propName) {
    return (newValue) => {
      let state = { form: this.state.form }
      state.form[propName] = newValue
      this.setState(state)

      // TODO: when all prop is valid i need to click somewhere to fire btn check state
      this.checkSignUpBtnState()
    }
  }

  onChangeStore () {
    this.setState(this.getStoreState())
  }

  signUp () {
    let data = {
      firstName : this.state.form.fullName.firstName,
      lastName : this.state.form.fullName.lastName,
      email : this.state.form.email.value,
      password : this.state.form.password.value
    }
    UserActions.signUp(data)
  }

  render () {
    let props = {}

    if (this.state.isFormCompleted) {
      props.disabled = false
    } else {
      props.disabled = true
    }

    return (
      <Modal show={this.state.store.get('isOpen')} onHide={this.close} bsSize='sm'>
        <Header closeButton>
          <Title>Sign up</Title>
        </Header>
        <Body>
          <FullNameInput onSave={this.onChangeState('fullName').bind(this)}/>
          <EmailInput onSave={this.onChangeState('email').bind(this)}/>
          <PasswordInput onSave={this.onChangeState('password').bind(this)}/>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.signUp} {...props}>Sign up</Button>
        </Footer>
      </Modal>
    )
  }
}

export default SignUpModal