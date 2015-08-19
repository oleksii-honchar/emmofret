let { Input, ProgressBar } = RB
import _ from 'lodash'

class PasswordInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = _.clone(props)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
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
    let now = Math.trunc((score/maxScore)*100)
    let labels = ['weird', 'weakest', 'weak', 'better', 'good', 'ok']
    let styles = ['danger', 'danger', 'danger', 'warning', 'warning', 'success']
    let props = {
      now: now,
      bsStyle: styles[score],
      label : labels[score],
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
      isValid : score === this.state.maxValidationScore ? true : false
    })

    _.debounce(this.onSave, 300)()
  }

  onSave () {
    let res = { value: this.state.value }

    if (!this.props.noValidation)
      res.isValid = this.state.isValid

    this.props.onSave(res)
  }

  render () {
    let icon = <Icon fw name='lock'/>

    let props = {}
    let validationProgress = {}
    if (!this.props.noValidation) {
      props.bsStyle = this.getValidationState()
      validationProgress = this.getValidationProgress()
    } else
      validationProgress  = null

    let type = this.props.visible ? 'text' : 'password'
    return (
      <div>
        <Input
          name='password'
          addonBefore={icon}
          type={type} ref='PasswordInput'
          id={this.props.id}
          className={this.props.className}
          placeholder={this.props.placeholder}
          hasFeedback
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.props.onKeyPress}
          onBlur={this.onSave}
          {...props}
          data-valid={this.state.isValid}
          />
        {validationProgress}
      </div>
    )
  }
}

PasswordInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onKeyPress: React.PropTypes.func,
  value: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  isValid: React.PropTypes.bool,
  maxValidationScore: React.PropTypes.number,
  visible: React.PropTypes.bool
}

PasswordInput.defaultProps = {
  value: '',
  isValid: false,
  maxValidationScore: 5,
  visible: false
}

export default PasswordInput