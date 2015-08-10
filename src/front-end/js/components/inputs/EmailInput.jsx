let { Input } = RB

class EmailInput extends React.Component {
  validateState () {
    return ''
  }

  onChange () {
    console.log(this.context.email)
  }

  render () {
    return (
      <Input
        type='text'
        value={this.context.email}
        placeholder='your@email.here'
        bsStyle={this.validateState()}
        hasFeedback
        ref='input'
        onChange={this.onChange} />
    )
  }
}

EmailInput.contextTypes = {
  email: React.PropTypes.string.isRequired
}

export default EmailInput