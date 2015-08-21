/* global React */
import TopNavbar from '../components/TopNavbar.jsx'
import ModalContainer from '../components/modals/ModalContainer.jsx'
import UserStore from '../stores/UserStore.js'
import RouterStore from '../stores/RouterStore.js'
import { RouteHandler } from 'react-router'
import router from '../router.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getLoggedInState()

    this.onChangeLoggedInState = this.onChangeLoggedInState.bind(this)
  }

  componentDidMount () {
    UserStore.on('change', this.onChangeLoggedInState)
  }

  componentWillUnmount () {
    UserStore.off('change', this.onChangeLoggedInState, this)
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
          <RouteHandler/>
        </div>
        <ModalContainer />
      </div>
    )
  }
}

export default App
