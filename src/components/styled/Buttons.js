import styled from 'styled-components'
import { darken } from 'polished'
import Button from 'react-bootstrap/Button'

import { primary, secondary, accent, light } from './colors'

const StyledButton = styled(Button)`
  background: ${primary};
  border: 1px solid ${light};
  color: white;
  margin-top: 1em;

  &:hover, &:focus {
    color: ${accent}};
  }
`

export const AddToCartButton = styled(Button)`
  background: ${secondary};
  border: 1px solid ${light};
  color: white;
  margin: 0 auto;
  width: 60%;

  &:hover, &:focus {
    background: ${darken(0.2, secondary)};
    color: white;
  }
`

// Base styled button
export default StyledButton
