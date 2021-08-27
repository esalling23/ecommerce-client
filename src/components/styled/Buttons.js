import styled from 'styled-components'
import { darken } from 'polished'
import Button from 'react-bootstrap/Button'

const primary = '#1f3164'
const secondary = '#FF6A3D'
const accent = '#F4DB7D'

const StyledButton = styled(Button)`
  background: ${primary};
  color: white;
  margin-top: 1em;

  &:hover, &:focus {
    color: ${accent}};
  }
`

export const AddToCartButton = styled(Button)`
  background: ${secondary};
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
