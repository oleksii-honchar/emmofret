import React from 'react'
import UserNavbar from './UserNavbar.js'
import { Link } from 'react-router'

import { Nav, Navbar, CollapsibleNav } from 'react-bootstrap'
import { NavItemLink } from 'react-router-bootstrap'

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
