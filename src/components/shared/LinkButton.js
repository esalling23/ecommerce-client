// https://stackoverflow.com/a/49439893/15835070
// unclear if this is an accessible solution, see https://stackoverflow.com/a/58846293/15835070
import React from 'react'
import { withRouter } from 'react-router'
import Button from 'react-bootstrap/Button'

const LinkButton = ({
  history,
  location,
  match,
  staticContext,
  to,
  onClick,
  // ⬆ filtering out props that `button` doesn’t know what to do with.
  ...rest
}) => {
  return (
    <Button
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}

export default withRouter(LinkButton)
