import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import * as AppActions from '../../actions/AppActions.js'
import * as ModalActions from '../../actions/ModalActions.js'

import FullNameInput from '../inputs/FullNameInput.js'
import EmailInput from '../inputs/EmailInput.js'
import PasswordInput from '../inputs/PasswordInput.js'

import { Modal, Button }  from 'react-bootstrap'
const { Header, Body, Title, Footer } = Modal

function select(state) {
  return {
    modal: _.where(state.modals, { name: 'sign-up'})
  }
}

function actions(dispatch) {
  return {
    actions: {
      hide: bindActionCreators(() => ModalActions.hide('sign-up'), dispatch),
      signUp: bindActionCreators(AppActions.signUp, dispatch)
    }
  }
}

class SignUpModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      form: {
        fullName: '',
        email: '',
        password: ''
      },
      isFormCompleted: false
    }

    this.signUp = this.signUp.bind(this)
    this.close = this.close.bind(this)
    this.checkSubmitBtnState = this.checkSubmitBtnState.bind(this)
    this.onChangeFormState = this.onChangeFormState.bind(this)
    this.submitOnReturn = this.submitOnReturn.bind(this)
  }

  isMounted () {
    return $('[data-class="SignUpModal"]')
  }

  checkSubmitBtnState () {
    if (!this.isMounted()) return

    let isAllValid = _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return prop.isValid
      } else {
        return false
      }
    })

    this.setState({ isFormCompleted: isAllValid })
  }

  close () {
    this.props.actions.hide()
  }

  onChangeFormState (propName) {
    return (newValue) => {
      let state = { form: this.state.form }
      state.form[propName] = newValue
      this.setState(state)

      _.debounce(this.checkSubmitBtnState, 200)()
    }
  }

  signUp () {
    let data = {
      firstName: this.state.form.fullName.firstName,
      lastName: this.state.form.fullName.lastName,
      email: this.state.form.email.value,
      password: this.state.form.password.value
    }
    this.props.actions.signUp(data)
  }

  submitOnReturn (e) {
    if (e.charCode === 13 && this.state.isFormCompleted) {
      this.signUp()
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
      onKeyPress: this.submitOnReturn
    }

    return (
      <Modal show onHide={this.close} bsSize='sm' keyboard={false} data-class='SignUpModal'>
        <Header closeButton>
          <Title>Sign up</Title>
        </Header>
        <Body>
          <FullNameInput onSave={this.onChangeFormState('fullName')} {...inputProps}/>
          <EmailInput onSave={this.onChangeFormState('email')} {...inputProps}/>
          <PasswordInput onSave={this.onChangeFormState('password')} {...inputProps}/>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.signUp} {...btnProps}>Sign up</Button>
        </Footer>
      </Modal>
    )
  }
}
export default connect(select, actions)(SignUpModal)
