let { Input, ProgressBar } = RB
import _ from 'lodash'

class PasswordInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = _.clone(props)
  }

  getValidationScore () {
    let val = this.state.value
    let res = [
      val.match(/[A-Z]/),
      val.match(/[a-z]/),
      val.match(/\d/),
      val.match(/[\W]/),
      (val.length > 6)
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

  onChange (e) {
    this.setState({
      value: e.target.value
    })

    let score = this.getValidationScore()
    this.setState({
      validationScore: score
    })

    this.setState({
      isValid : score === 5 ? true : false
    })
  }

  onSave () {
    this.props.onSave(this.state.value)
  }

  render () {
    let icon = <Icon fw name='lock'/>

    let props = {}
    if (!this.props.noValidation)
      props.bsStyle = this.getValidationState()

    return (
      <div>
        <Input
          addonBefore={icon}
          type='text' ref='PasswordInput'
          id={this.props.id}
          className={this.props.className}
          placeholder={this.props.placeholder}
          hasFeedback
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onBlur={this.onSave.bind(this)}
          {...props}
          data-is-valid={this.state.isValid}
          />
        <ProgressBar />
      </div>
    )
  }
}

PasswordInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string
}

PasswordInput.defaultProps = {
  value: ''
}

export default PasswordInput