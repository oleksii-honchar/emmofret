import React from 'react'

export class Icon extends React.Component {
  constructor (props) {
    super(props)
    this.state = props
  }

  render () {
    let className = `fa ${this.state.className} fa-${this.state.name}`
    className += this.state.inverse ? ' fa-inverse' : ''
    className += this.state.fw ? ' fa-fw' : ''
    className += this.state.spin ? ' fa-spin' : ''
    className += this.state.flip ? ` fa-flip-${this.state.flip}` : ''
    className += this.state.size ? ` fa-size-${this.state.size}` : ''
    className += this.state.rotate ? ` fa-rotate-${this.state.rotate}` : ''

    return (<i className={className} />)
  }
}

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  inverse: React.PropTypes.bool,
  fw: React.PropTypes.bool,
  spin: React.PropTypes.bool,
  flip: React.PropTypes.oneOf(['horizontal', 'vertical']),
  size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
  rotate: React.PropTypes.oneOf(['45', '90', '135', '180', '225', '270', '315'])
}
