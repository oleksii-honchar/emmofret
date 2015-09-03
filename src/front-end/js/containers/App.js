import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PropTypes } from 'react'
import Router from 'react-router'
import TopNavbar from '../components/TopNavbar.js'
import ModalsContainer from '../components/modals/ModalsContainer.js'
import { rememberRouter } from '../actions/AppActions.js'

function select(state) {
  return { application: state.application }
}

function actions(dispatch) {
  return {
    actions: {
      rememberRouter: bindActionCreators( rememberRouter, dispatch)
    }
  }
}

class App extends React.Component {
  componentDidMount () {
    this.props.actions.rememberRouter(this.context.router)
  }

  render () {
    return (
      <div id='app'>
        <TopNavbar/>
        <div className='container-fluid'>
          {this.props.children}
        </div>
        <ModalsContainer />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.any
}

App.contextTypes = {
  router: PropTypes.any
}

export default connect(select, actions)(App)

