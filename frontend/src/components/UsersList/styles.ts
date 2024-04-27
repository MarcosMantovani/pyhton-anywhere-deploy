import styled from 'styled-components'

import { ProfilePhoto as PostProfilePhoto } from '../../components/Post/styles'
import { Name as PostName } from '../../components/Post/styles'
import { Username as PostUsername } from '../../components/Post/styles'
import { colors } from '../../styles'

export const UsersList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  .row {
    position: relative;
    display: grid;
    grid-template-columns: 100px auto;
    column-gap: 16px;
    background-color: ${colors.blue};
    padding: 16px;
    border-radius: 8px;
    min-width: 300px;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .secondInfo {
    position: absolute;
    bottom: 16px;
    right: 16px;
    font-size: 10px;
    opacity: 0.5;
  }

  .name {
    display: flex;
    column-gap: 8px;
  }

  .followButton {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    * {
      fill: ${colors.white};
    }

    &:hover * {
      fill: ${colors.likeColor};
    }
  }
`

export const ProfilePhoto = styled(PostProfilePhoto)`
  width: 100px;
  max-width: 100px;
  height: 100px;
  max-height: 100px;
`

export const Name = styled(PostName)`
  font-size: 20px;
`

export const Username = styled(PostUsername)`
  font-size: 16px;
`
