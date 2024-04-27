import styled from 'styled-components'

import { colors } from '../../styles'

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  width: 100%;
  margin-bottom: 20px;
  color: ${colors.white};
  padding-bottom: 24px;
  border-bottom: 1px solid ${colors.white};
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  cursor: pointer;

  img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
`
