import React from 'react'

export class Icon extends React.Component {
  render () {
    let className = `fa ${this.props.className} fa-${this.props.name}`
    className += this.props.inverse ? ' fa-inverse' : ''
    className += this.props.fw ? ' fa-fw' : ''
    className += this.props.spin ? ' fa-spin' : ''
    className += this.props.flip ? ` fa-flip-${this.props.flip}` : ''
    className += this.props.size ? ` fa-size-${this.props.size}` : ''
    className += this.props.rotate ? ` fa-rotate-${this.props.rotate}` : ''

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

Icon.defaultProps = {
  className : ''
}
