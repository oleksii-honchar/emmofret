import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AppActions from '../actions/AppActions.js'

import EmailInput from '../components/inputs/EmailInput.js'
import PasswordInput from '../components/inputs/PasswordInput.js'

import _ from 'lodash'

import { Modal, Button } from 'react-bootstrap'
let { Dialog, Header, Body, Title, Footer } = Modal

function select(state) {
  return {
    nextTransitionPath: state.application.nextTransitionPath,
  }
}

function actions(dispatch) {
  return {
    actions: {
      logIn: bindActionCreators(AppActions.logIn, dispatch),
      discardNextTransition: bindActionCreators(AppActions.discardNextTransition, dispatch)
    }
  }
}

@connect(select, actions)
export default class Login extends React.Component {
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
    this.checkSubmitBtnState = _.debounce(this.checkSubmitBtnState, 200)
    this.onChangeFormState = this.onChangeFormState.bind(this)
    this.submitOnReturn = this.submitOnReturn.bind(this)
  }

  checkSubmitBtnState () {
    let isAllValid = _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return !_.isEmpty(prop.value)
      } else return false
    })
    this.setState({ isFormCompleted: isAllValid })
  }

  logIn (e) {
    e.preventDefault()
    const {email, password} = this.state.form

    const payload = {
      credentials: {
        email: email.value,
        password: password.value
      },
      shake: {
        selector: '[data-class="Login"]',
        style: 'horizontal'
      }
    }

    this.props.actions.logIn(payload)
  }

  onChangeFormState (propName) {
    return (newValue) => {
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
      <div className='static-modal'>
        <Dialog bsSize='sm'
               data-class='Login' onHide={ ()=>{} }
          >
          <Header>
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
        </Dialog>
      </div>
    )
  }
}
