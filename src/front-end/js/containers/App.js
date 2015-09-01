import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import TopNavbar from '../components/TopNavbar.js'
import ModalsContainer from '../components/modals/ModalsContainer.js'
import UserStore from '../store/UserStore.js'

function select(state) {
  return { application: state.application }
}

//function actions(dispatch) {
//  return { actions: bindActionCreators(AppActions, dispatch) }
//}

class App extends React.Component {
  //constructor (props) {
  //  super(props)
  //  this.state = this.getLoggedInState()

    //this.onChangeLoggedInState = this.onChangeLoggedInState.bind(this)
  //}

  //componentDidMount () {
    //UserStore.on('change', this.onChangeLoggedInState)
  //}

  //componentWillUnmount () {
    //UserStore.off('change', this.onChangeLoggedInState, this)
  //}

  //getLoggedInState () {
  //  return {
  //    isLoggedIn: UserStore.isLoggedIn()
  //  }
  //}

  //onChangeLoggedInState () {
  //  this.setState(this.getLoggedInState())
  //
  //  let transitionPath = RouterStore.nextTransitionPath || '/'
  //
  //  if (this.state.isLoggedIn) {
  //    router.transitionTo(transitionPath)
  //  } else {
  //    router.transitionTo('/')
  //  }
  //}

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

