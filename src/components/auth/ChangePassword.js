import React, { useState } from 'react'

import { changePassword } from '../../api/auth'
import { changePasswordSuccess, changePasswordFailure } from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from '../styled/Buttons'

const ChangePassword = ({ msgAlert, history, user }) => {
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' })

  const handleChange = (event) =>
    setFormData({
      [event.target.name]: event.target.value
    })

  const onChangePassword = (event) => {
    event.preventDefault()

    changePassword(formData, user)
      .then(() =>
        msgAlert({
          heading: 'Change Password Success',
          message: changePasswordSuccess,
          variant: 'success'
        })
      )
      .then(() => history.push('/'))
      .catch((error) => {
        setFormData({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <>
      <h3>Change Password</h3>
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
