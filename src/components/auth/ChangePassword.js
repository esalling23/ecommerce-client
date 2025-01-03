import React, { useState } from 'react'

import { changePassword } from '../../api/auth'
import { changePasswordSuccess, changePasswordFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from '../styled/Buttons'
import handleBadCreds from '../../lib/handleBadCreds'

const ChangePassword = ({ msgAlert, history, clearUser, user }) => {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' })

  const handleChange = (event) =>
    setFormData(curr => ({
      ...curr,
      [event.target.name]: event.target.value
    }))

  const clearForm = () => setFormData({ oldPassword: '', newPassword: '' })

  const onChangePassword = (event) => {
    event.preventDefault()

    changePassword(formData, user)
      .then(() => {
        msgAlert({
          heading: 'Change Password Success',
          message: changePasswordSuccess,
          variant: 'success'
        })
      })
      .catch((error) => {
        handleBadCreds(error, history, clearUser)
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: changePasswordFailure,
          variant: 'danger'
        })
      })
      .finally(clearForm)
  }

  return (
    <>
      <h5>Change Password</h5>
      <Form onSubmit={onChangePassword}>
        <Form.Group controlId='oldPassword'>
          <Form.Label>Old password</Form.Label>
          <Form.Control
            required
            name='oldPassword'
            value={formData.oldPassword}
            type='password'
            placeholder='Old Password'
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='newPassword'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            required
            name='newPassword'
            value={formData.newPassword}
            type='password'
            placeholder='New Password'
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>Submit</Button>
      </Form>
    </>
  )
}

export default ChangePassword
