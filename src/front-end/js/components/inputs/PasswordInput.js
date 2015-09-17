import React from 'react'
import { Input, ProgressBar, Button } from 'react-bootstrap'
import { Icon } from '../helpers/FontAwesome.js'
import _ from 'lodash'

// TODO fix autofill onchange event miss

export default class PasswordInput extends React.Component {
  static defaultProps = {
    value: '',
    isValid: false,
    maxValidationScore: 5,
    visible: false,
    placeholder: 'password'
  }

  static propTypes = {
    onSave: React.PropTypes.func.isRequired,
    onKeyPress: React.PropTypes.func,
    value: React.PropTypes.string,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    isValid: React.PropTypes.bool,
    maxValidationScore: React.PropTypes.number,
    visible: React.PropTypes.bool,
    noValidation: React.PropTypes.bool,
    placeholder: React.PropTypes.string
  }

  constructor (props) {
    super(props)
    this.state = _.clone(props)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.switchVisibility = this.switchVisibility.bind(this)
  }

  validateValue (value=null) {
    value = _.isNull(value) ? this.state.value : value
    let res = [
      value.match(/[A-Z]/),
      value.match(/[a-z]/),
      value.match(/\d/),
      value.match(/[\W]/),
      (value.length > 6)
    ]

    let score = 0
    _.each(res, (val) => {
      score += val ? 1 : 0
    })

    return score
  }

  getValidationState () {
    if (!_.isEmpty(this.state.value)) {
      return this.state.validationScore === 5 ? 'success' : 'warning'
    }
  }

  getValidationProgress () {
    let score = this.state.validationScore
    let maxScore = this.state.maxValidationScore
    let now = Math.trunc((score / maxScore) * 100)
    let labels = ['weird', 'weakest', 'weak', 'better', 'good', 'ok']
    let styles = ['danger', 'danger', 'danger', 'warning', 'warning', 'success']
    let props = {
      now: now,
      bsStyle: styles[score],
      label: labels[score],
      active: score < maxScore,
      'data-class': 'PasswordProgressBar'
    }

    return <ProgressBar {...props} />
  }

  onChange (e) {
    let value = e.target.value
    let score = this.validateValue(value)

    this.setState({
      value: value,
      validationScore: score,
      isValid: score === this.state.maxValidationScore
    })

    this.onSave()
  }

  onKeyPress (e) {
    this.onChange(e)
    this.props.onKeyPress(e)
  }

  onSave () {
    let res = { value: this.state.value }

    if (!this.props.noValidation) {
      res.isValid = this.state.isValid
    }

    this.props.onSave(res)
  }

  switchVisibility () {
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    let icon = <Icon fw name='lock'/>
    let eyeBtn = null

    if (!this.props.visible) {
      eyeBtn = (
        <Button onClick={this.switchVisibility}>
          <Icon fw name={!this.state.visible ? 'eye' : 'eye-slash'}/>
        </Button>
      )
    }


    let props = {}
    let validationProgress = {}
    if (!this.props.noValidation) {
      props.bsStyle = this.getValidationState()
      validationProgress = this.getValidationProgress()
    } else {
      validationProgress = null
    }

    let type = this.state.visible ? 'text' : 'password'
    //let type = this.state.visible ? 'text' : 'text'
    return (
      <div>
        <Input
          name='password'
          addonBefore={icon}
          buttonAfter={eyeBtn}
          type={type} ref='PasswordInput'
          id={this.props.id}
          className={this.props.className}
          hasFeedback
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          onBlur={this.onSave}
          {...props}
          data-valid={this.state.isValid}
          placeholder={this.props.placeholder}
          />
        {validationProgress}
      </div>
    )
  }
}
