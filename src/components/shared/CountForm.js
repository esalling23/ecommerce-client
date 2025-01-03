import React from 'react'

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

const CountForm = ({ prodId, count, updateProductInCart }) => {
  return (
    <CountFormStyled>
      <CountInput
        onChange={event => updateProductInCart(prodId, event.target.value || count)}
        type="number"
        size="sm"
        value={count}
      />
    </CountFormStyled>
  )
}

export default CountForm
