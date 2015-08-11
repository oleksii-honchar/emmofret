import _ from 'lodash'

let { Input } = RB

class EmailInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = _.clone(props)
  }

  validateValue (value=null) {
    value = _.isNull(value) ? this.state.value : value
    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i
    let isValid = reg.test(value)

    return !_.isEmpty(value) && isValid
  }

  getValidationState () {
    if (!_.isEmpty(this.state.value)) {
      return this.state.isValid ? 'success' : 'warning'
    }
  }

  onChange (e) {
    let value = e.target.value
    let isValid = this.validateValue(value)

    this.setState({
      value: value,
      isValid : isValid
    })

    this.onSave()
  }

  onSave () {
    let res = { value: this.state.value }

    if (!this.props.noValidation)
      res.isValid = this.state.isValid

    this.props.onSave(res)
  }

  render () {
    let icon = <Icon fw name='envelope-o'/>

    let props = {}
    if (!this.props.noValidation)
      props.bsStyle = this.getValidationState()

    return (
      <Input
        addonBefore={icon}
        type='text' ref='EmailInput'
        id={this.props.id}
        className={this.props.className}
        placeholder={this.props.placeholder}
        hasFeedback
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onBlur={this.onSave.bind(this)}
        autoFocus={this.props.autoFocus}
        {...props}
        />
    )
  }
}

EmailInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  noValidation: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool
}

EmailInput.defaultProps = {
  value: '',
  placeholder: 'your@email.com',
  noValidation: false,
  autoFocus: false
}

export default EmailInput