import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

import * as AppActions from '../actions/AppActions.js'

import FullNameInput from '../components/inputs/FullNameInput.js'
import EmailInput from '../components/inputs/EmailInput.js'
import PasswordInput from '../components/inputs/PasswordInput.js'

import { Modal, Button } from 'react-bootstrap'
const { Header, Body, Title, Footer, Dialog } = Modal

function actions (dispatch) {
  return {
    actions: {
      signUp: bindActionCreators(AppActions.signUp, dispatch)
    }
  }
}

@connect(null, actions)
export default class SignUpModal extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object
  }

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
    this.checkSubmitBtnState = _.debounce(this.checkSubmitBtnState, 200)
    this.onChangeFormState = this.onChangeFormState.bind(this)
    this.submitOnReturn = this.submitOnReturn.bind(this)
  }

  checkSubmitBtnState () {
    let isAllValid = _.every(this.state.form, (prop, key) => {
      if (_.isObject(prop)) {
        return prop.isValid
      } else {
        return false
      }
    })

    this.setState({ isFormCompleted: isAllValid })
  }

  onChangeFormState (propName) {
    return (newValue) => {
      let state = { form: this.state.form }
      state.form[propName] = newValue
      this.setState(state)

      this.checkSubmitBtnState()
    }
  }

  signUp () {
    const payload = {
      user: {
        firstName: this.state.form.fullName.firstName,
        lastName: this.state.form.fullName.lastName,
        email: this.state.form.email.value,
        password: this.state.form.password.value
      },
      shake: {
        selector: '[data-class="Registration"]',
        style: 'horizontal'
      }
    }

    this.props.actions.signUp(payload)
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
      <div className='modal-static'>
        <Dialog onHide={ () => {} } bsSize='sm'
               data-class='Registration'>
          <Header>
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
        </Dialog>
      </div>
    )
  }
}
