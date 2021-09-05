import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

import CartHoverIcon from '../shared/CartHoverIcon'

const authenticatedOptions = (
  <Fragment>
    <NavLink
      to='/cart'
      className='nav-link cart-hover'
      style={{
        minHeight: '2.5em'
      }}
    ><CartHoverIcon/></NavLink>
    <NavLink to='/account' className='nav-link'>Account</NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar style={{ padding: '0.5em 1em' }} bg='primary' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' className="brand">Buy Things</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ms-auto w-100 justify-content-end'>
        {user && (
          <span className='navbar-text me-auto'>Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
