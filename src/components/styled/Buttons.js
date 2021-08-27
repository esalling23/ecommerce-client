import styled from 'styled-components'
import { darken } from 'polished'
import Button from 'react-bootstrap/Button'

const primary = '#1f3164'
const accent = '#F4DB7D'

const StyledButton = styled(Button)`
  background: ${primary};
  color: white;
  margin-top: 1em;

  &:hover, &:focus {
    color: ${accent}};
  }
`

// Base styled button
export default StyledButton
