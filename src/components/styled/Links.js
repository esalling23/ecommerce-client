import styled from 'styled-components'
import { lighten } from 'polished'
import { Link } from 'react-router-dom'
import { primary } from './colors'

const StyledLink = styled(Link)`
  color: ${primary};
  &:hover, &:focus {
    color: ${lighten(0.2, primary)};
    font-weight: 600;
  }
`

export default StyledLink
