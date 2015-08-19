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

    this.state = {
      form : {
        email: '',
        password: ''
      },
      isFormCompleted: false
    }

    this.state = _.extend(this.state, this.getStoreState()) // -> {store: object}

    this.onChangeStore = this.onChangeStore.bind(this)
    this.logIn = this.logIn.bind(this)
    this.checkSubmitBtnState = this.checkSubmitBtnState.bind(this)
    this.onChangeFormState = this.onChangeFormState.bind(this)
    this.submitOnReturn = this.submitOnReturn.bind(this)
  }

  componentDidMount () {
    ModalStore.on('change', this.onChangeStore)
    this.mounted = true
  }

  componentWillUnmount () {
    ModalStore.off('change', this.onChangeStore, this)
    this.mounted = false
  }

  close () {
    ModalActions.hide('login')
  }

  checkSubmitBtnState () {
    if(!this.mounted) return
    let isAllValid =  _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return !_.isEmpty(prop.value)
      } else
        return false
    })

    this.setState({ isFormCompleted : isAllValid })
  }

  getStoreState () {
    return {
      store: _.findWhere(ModalStore.getState(), { name:'login' })
    }
  }

  getClassName () {
    let res = ''
    if (this.state.store.isShaking) {
      res = `shake shake-constant shake-${this.state.store.shakeStyle}`
    }
    return res
  }

  logIn () {
    let credentials = {
      email : this.state.form.email.value,
      password : this.state.form.password.value
    }

    UserActions.logIn(credentials)
  }

  onChangeStore () {
    if(!this.mounted) return

    let state = this.getStoreState()
    if(state.store.isOpen) {
      this.setState(this.getStoreState())
    }
  }

  onChangeFormState (propName) {
    return (newValue) => {
      let state = { form : this.state.form }
      state.form[propName] = newValue
      this.setState(state)

      _.debounce(this.checkSubmitBtnState, 200)()
    }
  }

  submitOnReturn (e) {
    if(e.charCode === 13 && this.state.isFormCompleted) {
      this.logIn()
    }
  }

  render () {
    let btnProps = {}

    if (this.state.isFormCompleted) {
      btnProps.disabled = false
    } else {
      btnProps.disabled = true
    }

    let inputProps = {
      onKeyPress: this.submitOnReturn,
      noValidation: true
    }

    return (
      <Modal show={this.state.store.isOpen} onHide={this.close} bsSize='sm'
             dialogClassName={this.getClassName()}>
        <Header closeButton>
          <Title>Login</Title>
        </Header>
        <Body>
          <form>
            <EmailInput autoFocus onSave={this.onChangeFormState('email')} {...inputProps}/>
            <PasswordInput onSave={this.onChangeFormState('password')} {...inputProps}/>
          </form>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.logIn} {...btnProps}>Log in</Button>
        </Footer>
      </Modal>
    )
  }
}

export default LoginModal