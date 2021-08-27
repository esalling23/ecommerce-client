import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

import CartHoverIcon from '../shared/CartHoverIcon'

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/cart' className='nav-link cart-hover'><CartHoverIcon/></NavLink>
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
    <NavLink exact to='/' className='nav-link'>Products</NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar style={{ padding: '0.5em 1em' }} bg='primary' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' className="brand">Buy Things</Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='ml-auto'>
        {user && (
          <span className='navbar-text mr-2'>Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
