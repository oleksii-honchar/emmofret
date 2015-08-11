let { Input } = RB

class PasswordInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  validateState () {
    return ''
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
    return (
      <Input
        addonBefore={icon}
        type='password' ref='PasswordInput'
        id={this.props.id}
        className={this.props.className}
        placeholder={this.props.placeholder}
        hasFeedback
        value={this.state.value}
        onChange={this.onChange.bind(this)}
        onBlur={this.onSave.bind(this)}
        />
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