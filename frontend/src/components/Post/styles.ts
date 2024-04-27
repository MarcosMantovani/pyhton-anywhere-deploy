import styled from 'styled-components'

import { breakpoints, colors } from '../../styles'

type ContainerProps = {
  $liked: boolean
}

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 40px auto;
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

  .likeButton svg * {
    fill: ${({ $liked }) => ($liked ? `${colors.likeColor}` : '')};
  }

  .textQuotePost {
    background-color: transparent;
    border: 1px solid ${colors.white};
    border-radius: 8px;
    resize: none;
    overflow-y: auto;
    color: ${colors.white};
    font-size: 16px;
    width: 100%;
    padding: 8px;
    outline: none;
  }
`

export const ProfilePhoto = styled.img`
  margin-top: 8px;
  max-width: 40px;
  width: 40px;
  max-height: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10%);
  }

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }
`

export const Name = styled.p`
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10%);
  }
`

export const Username = styled.p`
  font-size: 12px;
  opacity: 0.75;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10%);
  }
`

export const TextPost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.blue};
  border-radius: 8px;
  border-top-left-radius: 0;
  padding: 0 8px;
  width: 100%;
  flex-grow: 1;

  @media (max-width: ${breakpoints.tablet}) {
    border-radius: 8px;
  }

  .postHeader {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }

  .username {
    display: flex;
    column-gap: 4px;
  }

  .headerButtons {
    display: flex;
  }

  .headerButton {
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

  .secondInfo {
    text-align: end;
    font-size: 10px;
    opacity: 0.5;
  }

  .content {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    padding-bottom: 8px;

    .postImage {
      object-fit: cover;
      width: 100%;
      max-height: 300px;
      border-radius: 8px;
    }
  }

  transition: all 0.3s ease-in-out;
  &:hover {
    filter: brightness(110%);
    transform: translateY(-1%);
  }
`

export const QuotedProfilePhoto = styled(ProfilePhoto)`
  margin: 0;
`

export const QuotedPostContainer = styled.div`
  display: grid;
  grid-template-columns: 20px auto;

  .shareIcon {
    display: flex;
    align-items: center;
    max-width: 20px;
    height: 40px;

    svg * {
      fill: ${colors.white};
    }
  }

  .headInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mainInfo {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }

  .quotedBody {
    margin-top: 8px;
  }

  .quotedContent {
    .postImage {
      margin-top: 16px;
    }
  }
`

type QuotePostFormProps = {
  $image: string | null | File
}

export const QuotePostForm = styled.form<QuotePostFormProps>`
  display: flex;
  column-gap: 8px;
  margin-bottom: 24px;
  width: 100%;

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

  .textQuotePost {
    background-color: transparent;
    border: 1px solid ${colors.white};
    border-radius: 8px;
    resize: none;
    overflow-y: auto;
    color: ${colors.white};
    font-size: 16px;
    width: 100%;
    padding: 8px;
    outline: none;
  }

  .quotePostImage {
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

      .deleteQuotePostImage {
        display: block;
      }
    }

    .deleteQuotePostImage {
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

type EditPostContainerProps = {
  $image: string | null | File
}

export const EditPostContainer = styled.form<EditPostContainerProps>`
  display: flex;
  column-gap: 8px;
  margin-bottom: 24px;
  width: 100%;

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

  .textQuotePost {
    background-color: transparent;
    border: 1px solid ${colors.white};
    border-radius: 8px;
    resize: none;
    overflow-y: auto;
    color: ${colors.white};
    font-size: 16px;
    width: 100%;
    padding: 8px;
    outline: none;
  }

  .editPostImage {
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

      .deleteEditedPostImage {
        display: block;
      }
    }

    .deleteEditedPostImage {
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
