import React from 'react'
import UserNavbar from './UserNavbar.js'
import { Link } from 'react-router'

import { Nav, NavItem, Navbar, CollapsibleNav } from 'react-bootstrap'
import { NavItemLink } from 'react-router-bootstrap'

class TopNavbar extends React.Component {
  render () {
    return (
      <Navbar fixedtop fluid toggleNavKey={0}>
        <div className='navbar-header'>
          <span className='navbar-brand'>
            <Link to='/'>My brand name</Link>
          </span>
        </div>
        <CollapsibleNav eventKey={0}>
          <Nav navbar>
            <NavItem eventKey={1} href='/#/public'>
              <span className='text-success'>Public</span>
            </NavItem>
            <NavItem eventKey={2} href='/#/private'>
              <span className='text-warning'>Private</span>
            </NavItem>
          </Nav>
          <UserNavbar />
        </CollapsibleNav>
      </Navbar>
    )
  }
}

export default TopNavbar
