import styled from 'styled-components'

import { ProfilePhoto as PostProfilePhoto } from '../../components/Post/styles'

type BannerProps = {
  $banner: string | null
}

import {
  ProfilePhoto as ProfilePhotoPost,
  Name as NamePost,
  Username as UsernamePost
} from '../../components/Post/styles'
import { breakpoints, colors } from '../../styles'

export const Header = styled.div`
  position: relative;
  margin: 0 auto;
`

export const ProfileContent = styled.div`
  &.container {
    margin-top: 402px;
  }

  .bio {
    width: 100%;
    margin-bottom: 16px;
    background-color: ${colors.blue};
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${colors.white};
  }
`

export const BackgroundBanner = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 330px;
  object-fit: cover;
  filter: blur(10px);
`

export const Banner = styled.div<BannerProps>`
  background-image: ${({ $banner }) =>
    $banner
      ? `url(${$banner})`
      : `url(${process.env.REACT_APP_API_URL}/media/images/no-banner.png)`};
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 330px;
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

export const Info = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 20px;

  .maininfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 8px;
    }
  }

  .social {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: translateY(-10%);
      }
    }
    .description {
      cursor: pointer;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    justify-content: center;

    .maininfo {
      height: 100%;
      flex-direction: column-reverse;
      justify-content: space-between;
    }
  }
`

export const ProfilePhoto = styled(ProfilePhotoPost)`
  max-width: 64px;
  width: 64px;
  max-height: 64px;
  height: 64px;
  margin: 0;
  cursor: auto;
`

export const Name = styled(NamePost)`
  font-size: 20px;
  cursor: auto;
`

export const Username = styled(UsernamePost)`
  font-size: 16px;
  cursor: auto;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 8px;
  }
`

export const ListProfilePhoto = styled(PostProfilePhoto)`
  margin-top: 0;
  max-width: 60px;
  width: 60px;
  max-height: 60px;
  height: 60px;
  object-fit: cover;
`
