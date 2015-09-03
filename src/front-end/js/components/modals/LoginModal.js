import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from '../../actions/AppActions.js'
import * as ModalActions from '../../actions/ModalActions.js'

import EmailInput from '../inputs/EmailInput.js'
import PasswordInput from '../inputs/PasswordInput.js'

import _ from 'lodash'

import { Modal, Button } from 'react-bootstrap'
let { Header, Body, Title, Footer } = Modal

function select(state) {
  return {
    modal: state.modals['login']
  }
}

function actions(dispatch) {
  return {
    actions: {
      hide: bindActionCreators( () => ModalActions.hide('login'), dispatch),
      logIn: bindActionCreators(AppActions.logIn, dispatch)
    }
  }
}

class LoginModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        email: '',
        password: ''
      },
      isFormCompleted: false
    }

    this.logIn = this.logIn.bind(this)
    this.close = this.close.bind(this)
    this.checkSubmitBtnState = _.debounce(this.checkSubmitBtnState, 200)
    //this.checkSubmitBtnState = this.checkSubmitBtnState.bind(this)
    this.onChangeFormState = this.onChangeFormState.bind(this)
    this.submitOnReturn = this.submitOnReturn.bind(this)
  }

  componentDidMount () { this.mounted = true }

  componentWillUnmount () { this.mounted = false }

  close () { this.props.actions.hide() }

  checkSubmitBtnState () {
    if (!this.mounted) return

    let isAllValid = _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return !_.isEmpty(prop.value)
      } else return false
    })
    this.setState({ isFormCompleted: isAllValid })
  }

  getClassName () {
    const { modal } = this.props
    let res = ''

    if (modal.isShaking) {
      res = `shake shake-constant shake-${modal.shakeStyle}`
    }
    return res
  }

  logIn () {
    const {email, password} = this.state.form

    let credentials = {
      email: email.value,
      password: password.value
    }

    this.props.actions.logIn(credentials)
  }

  onChangeFormState (propName) {
    return (newValue) => {
      if (!this.mounted) return

      let state = { form: this.state.form }
      state.form[propName] = newValue
      this.setState(state)

      this.checkSubmitBtnState()
    }
  }

  submitOnReturn (e) {
    if (e.charCode === 13 && this.state.isFormCompleted) {
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
      <Modal show onHide={this.close} bsSize='sm'
             dialogClassName={this.getClassName()} keyboard={false}
             data-class='LoginModal'
        >
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

export default connect(select, actions)(LoginModal)
