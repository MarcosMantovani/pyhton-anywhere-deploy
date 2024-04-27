import styled from 'styled-components'

import { colors } from '../../styles'
import { StandardButton } from '../../components/Button/styles'

export const Form = styled.form`
  background-color: ${colors.white};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  width: 100%;
  max-width: 384px;
  min-height: 480px;

  span {
    font-size: 12px;
    text-align: center;
  }

  ${StandardButton} {
    margin-top: 16px;
  }
`

export const Title = styled.h2`
  text-align: center;
  font-size: 2em;
  margin-bottom: 40px;
`
