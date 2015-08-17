import TopNavbar from '../components/TopNavbar.jsx'
import ModalContainer from '../components/modals/ModalContainer.jsx'
import MeStore from '../stores/MeStore.js'

let { RouteHandler } = Router

class App extends React.Component {
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