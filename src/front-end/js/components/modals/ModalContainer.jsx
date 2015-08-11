import ModalStore from '../../stores/ModalStore.js'
import ModalActions from '../../actions/ModalActions.js'
import LoginModal from './LoginModal.jsx'
import SignUpModal from './SignUpModal.jsx'

class ModalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getState()
  }

  getState () {
    return {
      data : ModalStore.getState()
    }
  }

  componentDidMount () {
    ModalStore.addChangeListener(this.onChange.bind(this))
  }

  componentWillUnmount () {
    ModalStore.removeChangeListener(this.onChange.bind(this))
  }

  shouldComponentUpdate (nextProps, nextState) {
    let currEntry = this.state.data.findEntry( (modal) => modal.get('isOpen') )
    let nextEntry = nextState.data.findEntry( (modal) => modal.get('isOpen') )

    return !currEntry || !nextEntry || currEntry[0] !== nextEntry[0]
  }

  onChange () { this.setState(this.getState()) }

  render () {
    let entry = this.state.data.findEntry( (modal) => modal.get('isOpen') )
    let modalCmp = null

    if (!entry)
      modalCmp = null
    else if (entry[0] == 'login')
      modalCmp = ( <LoginModal /> )
    else if (entry[0] == 'sign-up')
      modalCmp = ( <SignUpModal /> )

    return (
      <div id='modal-container'>
        {modalCmp}
      </div>
    )
  }
}

export default ModalContainer