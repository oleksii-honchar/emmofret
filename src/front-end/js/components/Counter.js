/* globals Icon */
import React from 'react'
import { Panel, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '../actions/CounterActions.js'


class Counter extends React.Component {
  render () {
    const footer = (
      <div>
        <Button onClick={this.props.actions.increment}><Icon fw name='plus-square' /></Button>
        &nbsp;
        <Button onClick={this.props.actions.decrement}><Icon fw name='minus-square' /></Button>
      </div>
    )

    return (
      <div className='col-md-3'>
        <Panel header='Counter' footer={footer}>
          {this.props.counter}
        </Panel>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CounterActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
