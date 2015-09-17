import React from 'react'

import { Modal, Button, Well } from 'react-bootstrap'
let { Header, Body, Title, Footer } = Modal

export default class LoginModal extends React.Component {
  static propTypes = {
    modal: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.close = this.close.bind(this)
  }

  close () {
    this.props.actions.hide()
  }

  render () {
    return (
      <Modal show onHide={this.close} bsSize='medium'
             keyboard={false}
             data-class='Test1Modal'
        >
        <Header closeButton>
          <Title>Test 1</Title>
        </Header>
        <Body>
          <Well>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla justo elit, finibus vitae condimentum sed, sagittis at elit. Quisque blandit malesuada libero in dapibus. In nec risus a diam efficitur blandit cursus vel tortor. Nulla nisi libero, varius et accumsan et, pharetra eget felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pretium, metus vel mollis dignissim, ligula erat facilisis nisl, sed tempus nunc arcu vel nunc. Fusce gravida dignissim consequat. Vivamus aliquam aliquam est, in aliquam orci euismod ac. Morbi sit amet libero at dui pellentesque congue.</Well>
        </Body>
        <Footer>
          <Button bsStyle='primary' onClick={this.close} >Close</Button>
        </Footer>
      </Modal>
    )
  }
}
