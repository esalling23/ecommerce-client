import React from 'react'
import { withRouter } from 'react-router-dom'
import LinkButton from '../shared/LinkButton'

import ChangePassword from './ChangePassword'

// Contains change password, sign out, order history, preferences...
const Account = () => {
  return (
    <div className='row'>
      <div className='col-sm-10 col-md-8 mt-5'>
        <ChangePassword/>
      </div>
      <div className='col-sm-2 col-md-4 mt-5'>
        <LinkButton to='/sign-out'>Sign Out</LinkButton>
      </div>
    </div>
  )
}

export default withRouter(Account)
