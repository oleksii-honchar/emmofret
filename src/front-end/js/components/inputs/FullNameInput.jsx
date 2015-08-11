let { Input } = RB
import _ from 'lodash'

class FullNameInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = _.clone(props)
  }

  getValidationState () {
    let words = _.words(this.state.value)

    if (!_.isEmpty(this.state.value)) {
      return words.length === 2 ? 'success' : 'warning'
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
    let icon = <Icon fw name='user'/>

    let props = {}
    if (!this.props.noValidation)
      props.bsStyle = this.getValidationState()

    return (
      <Input
        addonBefore={icon}
        type='text' ref='FullNameInput'
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

FullNameInput.propTypes = {
  onSave: React.PropTypes.func.isRequired,
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

export default FullNameInput