import styled from 'styled-components'

import {
  Name as NamePost,
  ProfilePhoto as ProfilePhotoPost,
  Username as UsernamePost
} from '../Post/styles'
import { Sidebar } from '../Sidebar/styles'
import { breakpoints, colors } from '../../styles'

export const Profilebar = styled(Sidebar)`
  right: 0;
  left: auto;

  > div {
    position: relative;
  }

  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`

export const Banner = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 264px;
  height: 132px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10%);
  }
`

export const MainInfo = styled.div`
  position: absolute;
  width: 268px;
  top: 104px;
  row-gap: 0;
  align-items: center;
  text-align: center;
`

export const Photo = styled(ProfilePhotoPost)`
  max-width: 80px;
  width: 80px;
  max-height: 80px;
  height: 80px;
  margin: 0;
  cursor: default;
`

export const Name = styled(NamePost)`
  font-size: 20px;
  cursor: auto;
`

export const UserName = styled(UsernamePost)`
  font-size: 16px;
  cursor: auto;
`

export const UserEmail = styled(UsernamePost)`
  font-size: 12px;
  cursor: auto;
`

export const FollowListButtons = styled.div`
  display: flex;
  column-gap: 20px;
  margin-top: 8px;
  justify-content: center;

  button {
    font-size: 12px;
    border: none;
    background-color: transparent;
    color: ${colors.white};
    opacity: 0.75;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-10%);
    }
  }
`
