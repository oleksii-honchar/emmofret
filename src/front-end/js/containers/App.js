import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import Router from 'react-router'
import TopNavbar from '../components/TopNavbar.js'
import ModalsContainer from '../components/modals/ModalsContainer.js'

function select(state) {
  return { application: state.application }
}

class App extends React.Component {
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

export default connect(select)(App)

