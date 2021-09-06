import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const CountFormStyled = styled(Form)`
  display: flex;
  max-width: 80%;
`

const CountInput = styled(FormControl)`
  max-width: 6em;
  display: inline;
`

const SubmitCountBtn = styled.button`
  border: 0;
  background: transparent;
  text-decoration: underline;

  &:hover, &:focus {
    font-weight: 800;
  }
`

const CountForm = ({ prodId, count, updateProductInCart }) => {
  const [tempCount, setTempCount] = useState(0)

  useEffect(() => {
    if (tempCount) {
      setTempCount(0)
    }
  }, [count])

  return (
    <CountFormStyled
      onSubmit={event => {
        event.preventDefault()
        updateProductInCart(prodId, tempCount || count)
      }}
    >
      <CountInput
        onChange={event => setTempCount(event.target.value)}
        type="number"
        size="sm"
        value={tempCount || count}
      />
      <SubmitCountBtn type="submit">Update</SubmitCountBtn>
    </CountFormStyled>
  )
}

export default CountForm
