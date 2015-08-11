let { Input, ProgressBar } = RB
import _ from 'lodash'

class PasswordInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = _.clone(props)
  }

  getValidationState () {
    let pwd = this.state.value
    let res = [
      pwd.match(/[A-Z]/),
      pwd.match(/[a-z]/),
      pwd.match(/\d/),
      pwd.match(/[\W]/)
    ]

    let score = 0
    _.each(res, (val) => {
      score += val ? 1 : 0
    })

    score = pwd.length >= 6 ? score : 0

    console.log(score)

    if (!_.isEmpty(pwd)) {
      return score === 4 ? 'success' : 'warning'
    }
  }

  onChange (e) {
    this.setState({
      value: e.target.value
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