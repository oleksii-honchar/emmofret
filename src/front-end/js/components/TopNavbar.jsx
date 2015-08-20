/* global RB, RRB, React */
import UserNavbar from './UserNavbar.jsx'
import { Link } from 'react-router'

let { Nav, Navbar, CollapsibleNav } = RB
let { NavItemLink } = RRB

class TopNavbar extends React.Component {
  constructor (props) { super(props) }

  render () {
    return (
      <Navbar fixedtop fluid toggleNavKey={0}>
        <div className='navbar-header'>
          <span className='navbar-brand'>
            <Link to='dashboard'>My brand name</Link>
          </span>
        </div>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <NavItemLink eventKey={1} to='public'>
              <span className='text-success'>Public</span>
            </NavItemLink>
            <NavItemLink eventKey={2} to='private'>
              <span className='text-warning'>Private</span>
            </NavItemLink>
          </Nav>
          <UserNavbar />
        </CollapsibleNav>
      </Navbar>
    )
  }
}

export default TopNavbar
