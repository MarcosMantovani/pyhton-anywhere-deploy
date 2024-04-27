import styled from 'styled-components'

import { ProfilePhoto as ProfilePhotoPost } from '../Post/styles'
import { breakpoints, colors } from '../../styles'

export const Form = styled.form`
  display: flex;
  width: 100%;
  column-gap: 8px;
  margin-bottom: 24px;

  .sideIcons {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column-reverse;
    row-gap: 8px;

    .sideIcons {
      justify-content: end;
      flex-direction: row;
      column-gap: 8px;
    }
  }
`

export const ProfilePhoto = styled(ProfilePhotoPost)`
  margin-top: 6px;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }
`

type TextPostProps = {
  $image: string | null | File
}

export const TextPost = styled.div<TextPostProps>`
  display: flex;
  flex-direction: column;
  background-color: ${colors.blue};
  border-radius: 8px;
  border-top-left-radius: 0;
  padding: 16px;
  min-height: 142px;
  height: 100%;
  row-gap: 8px;
  flex-grow: 1;

  @media (max-width: ${breakpoints.tablet}) {
    min-height: auto;
    border-top-left-radius: 8px;
  }

  .PostImage {
    object-fit: cover;
    width: 100%;
    max-height: 300px;
    border-radius: 8px;
  }

  .newPostContainer {
    background-color: transparent;
    border: 1px solid ${colors.white};
    border-radius: 8px;
    resize: none;
    overflow-y: auto;
    color: ${colors.white};
    font-size: 16px;
    width: 100%;
    height: 100%;
    padding: 8px;
    outline: none;
    flex-grow: 1;
  }

  .PostImage {
    position: relative;
    background-image: ${({ $image }) => ($image ? `url(${$image})` : ``)};
    background-size: cover;
    background-position: center;
    height: 300px;

    &:hover {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
      }

      .deletePostImage {
        display: block;
      }
    }

    .deletePostImage {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      fill: ${colors.likeColor};
      cursor: pointer;
      z-index: 5;

      @media (max-width: ${breakpoints.desktop}) {
        display: block;
      }
    }
  }
`
