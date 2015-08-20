import Authenticated from '../components/helpers/Authenticated.jsx'

export default Authenticated(class Private extends React.Component {
  render () {
    return (
      <p>private content pending</p>
    )
  }
})