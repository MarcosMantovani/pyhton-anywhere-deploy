import styled from 'styled-components'

import { colors } from '../../styles'

type Props = {
  $opened: boolean
}

export const Container = styled.div<Props>`
  position: fixed;
  display: flex;
  top: ${({ $opened }) => ($opened ? '32px' : '12px')};
  left: 50%;
  background-color: ${colors.blue};
  transform: translateX(-50%);
  flex-direction: column;
  justify-content: center;
  row-gap: 16px;
  width: 300px;
  padding: 16px 8px;
  border-radius: 8px;
  border: 1px solid ${colors.white};
  text-align: center;
  opacity: ${({ $opened }) => ($opened ? '1' : '0')};
  transition: top 0.3s ease, opacity 0.3s ease;
  z-index: 11;

  .button {
    display: ${({ $opened }) => ($opened ? '' : 'none')};
  }
`
