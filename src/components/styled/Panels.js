import styled from 'styled-components'

import colors from './colors'

export const CenteredPanel = styled.div`
  align-items: center;
  border: 1px solid ${colors.light};
  border-radius: 0.25em;
  display: flex;
  height: 100%;
  justify-content: center;
`

export const ColoredPanel = styled(CenteredPanel)`
  background-color: ${(props) => colors[props.variant]}
`
