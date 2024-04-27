import styled from 'styled-components'

import { breakpoints, colors } from '../../styles'

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 64px 16px 32px 16px;
  height: 100vh;
  height: 100svh;
  width: 300px;
  background-color: ${colors.blue};

  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`

export const MainOptions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`
