import React from 'react'
import { PropTypes } from 'react'
import TopNavbar from '../components/TopNavbar.js'
//import ModalContainer from '../components/modals/ModalContainer.js'
import UserStore from '../store/UserStore.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getLoggedInState()

    this.onChangeLoggedInState = this.onChangeLoggedInState.bind(this)
  }

  componentDidMount () {
    //UserStore.on('change', this.onChangeLoggedInState)
  }

  componentWillUnmount () {
    //UserStore.off('change', this.onChangeLoggedInState, this)
  }

  getLoggedInState () {
    return {
      isLoggedIn: UserStore.isLoggedIn()
    }
  }

  onChangeLoggedInState () {
    this.setState(this.getLoggedInState())

    let transitionPath = RouterStore.nextTransitionPath || '/'

    if (this.state.isLoggedIn) {
      router.transitionTo(transitionPath)
    } else {
      router.transitionTo('/')
    }
  }

  render () {
    return (
      <div id='app'>
        <TopNavbar/>
        <div className='container-fluid'>
          {this.props.children}
        </div>

      </div>
    )
  }
}
//<ModalContainer />

App.propTypes = {
  children: PropTypes.any
}

export default App

