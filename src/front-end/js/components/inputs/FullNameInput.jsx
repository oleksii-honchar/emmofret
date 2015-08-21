/* global RB, React, Icon */
let { Input } = RB
import _ from 'lodash'

export default class FullNameInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = _.clone(props)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  validateValue (value=null) {
    value = _.isNull(value) ? this.state.value : value

    let words = _.words(value)

    return words.length === 2 && !_.isEmpty(value)
  }

  /*
   * @params {string} name - 'first' | 'last' -> _[name]()
   */
  getName (name) {
    return _.chain(this.state.value).words()[name]().value()
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
      isValid: isValid
    })

    _.debounce(this.onSave, 300)()
  }

  onSave () {
    let res = {
      firstName: this.getName('first'),
      lastName: this.getName('last')
    }

    if (!this.props.noValidation) {
      res.isValid = this.state.isValid
    }

    this.props.onSave(res)
  }

  render () {
    let icon = <Icon fw name='user'/>

    let props = {}
    if (!this.props.noValidation) {
      props.bsStyle = this.getValidationState()
    }

    return (
      <Input
        addonBefore={icon}
        type='text' ref='FullNameInput'
        id={this.props.id}
        className={this.props.className}
        placeholder={this.props.placeholder}
        hasFeedback
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onSave}
        onKeyPress={this.props.onKeyPress}
        autoFocus={this.props.autoFocus}
        {...props}
        />
    )
  }
}

FullNameInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  onKeyPress: React.PropTypes.func,
  value: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  noValidation: React.PropTypes.bool,
  autoFocus: React.PropTypes.bool
}

FullNameInput.defaultProps = {
  value: '',
  placeholder: 'John Dow',
  noValidation: false,
  autoFocus: false
}
