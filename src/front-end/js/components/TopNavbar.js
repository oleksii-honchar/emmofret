import React from 'react'
import UserNavbar from './UserNavbar.js'
import { Link } from 'react-router'

import { Nav, Navbar, CollapsibleNav } from 'react-bootstrap'
import { NavItemLink } from 'react-router-bootstrap'

NavItemLink.contextTypes = Object.assign(NavItemLink.contextTypes, {
  router: React.PropTypes.object
})

class TopNavbar extends React.Component {
  render () {
    return (
      <Navbar fixedtop fluid toggleNavKey={0}>
        <div className='navbar-header'>
          <span className='navbar-brand'>
            <Link to='/app/dashboard'>My brand name</Link>
          </span>
        </div>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <NavItemLink to='/app/public'>
              <span className='text-success'>Public</span>
            </NavItemLink>
            <NavItemLink to='/app/private'>
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
