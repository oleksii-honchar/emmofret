import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { show } from '../actions/ModalActions.js'

import { Button } from 'react-bootstrap'

function actions (dispatch) {
  return {
    actions: {
      show : bindActionCreators(show, dispatch)
    }
  }
}

@connect(null, actions)
export default class HelloWorld extends React.Component {
  show (modalName) {
    const self = this
    return () => {
      self.props.actions.show(modalName)
    }
  }

  render () {
    return (
      <div className='container-fluid'>
        <div className='jumbotron'>
          <h1><i className='fa fa-fw fa-rocket'></i>Hello world</h1>
        </div>
        <Button bsStyle='default' onClick={ this.show('test1') } >Open 'Test1' modal</Button>
        &nbsp;
        <Button bsStyle='default' onClick={ this.show('test2') } >Open 'Test2' modal</Button>
      </div>
    )
  }
}
