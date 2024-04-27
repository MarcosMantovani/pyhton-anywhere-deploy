import styled from 'styled-components'

function hexToRGBA(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

type BannerProps = {
  $banner: string
}

type ProfilePhotoProps = {
  $profilePhoto: string
}

import { breakpoints, colors } from '../../styles'

export const Header = styled.div`
  position: relative;
  margin: 0 auto;
`

export const ProfileContent = styled.div`
  row-gap: 32px;
  &.container {
    margin-top: 402px;
  }

  .bio,
  .password {
    display: flex;
    max-width: 100%;
    width: 100%;
    background-color: ${colors.blue};
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${colors.white};

    .textarea {
      background-color: transparent;
      border: none;
      width: 100%;
      font-size: 14px;
      resize: none;
      color: ${colors.white};
      outline: none;
    }

    .confirmIcon {
      width: 20px;
      height: 20px;
      fill: ${colors.white};
    }

    .confirmButton {
      background-color: transparent;
      border: none;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: ${colors.white};

        .confirmIcon * {
          fill: ${colors.black};
        }
      }
    }
  }

  .password {
    flex-direction: column;
    row-gap: 16px;

    .title {
      text-align: center;
    }

    .passwordInputs {
      display: flex;
      column-gap: 16px;

      @media (max-width: ${breakpoints.tablet}) {
        flex-direction: column;
        row-gap: 8px;
      }
    }

    .input {
      background-color: transparent;
      border: none;
      border-bottom: 1px solid ${colors.white};
      width: 100%;
      font-size: 14px;
      resize: none;
      color: ${colors.white};
      outline: none;
    }

    .newPassword {
      display: flex;
      column-gap: 16px;
    }

    .confirmButton {
      width: 100%;
      border-radius: 8px;
    }
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
  position: absolute;
  background-image: ${({ $banner }) =>
    $banner
      ? `url(${$banner})`
      : `url(${process.env.REACT_APP_API_URL}/media/images/no-banner.png)`};
  background-size: cover;
  background-position: center;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 330px;
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;
  transition: opacity 0.3s ease-in-out;

  .bannerInput {
    display: none;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .editBanner {
    position: absolute;
    height: 250px;
    width: 100%;
    cursor: pointer;
    z-index: 1;

    .editBannerIcon {
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 80px;
      height: 80px;
      fill: ${colors.white};

      @media (max-width: ${breakpoints.tablet}) {
        display: block;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &:hover {
      .editBannerIcon {
        display: block;
      }
    }
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
    align-items: end;

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 8px;
    }

    @media (max-width: ${breakpoints.tablet}) {
      height: 100%;
      flex-direction: column-reverse;
      align-items: center;
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
  }
`

export const ProfilePhoto = styled.div<ProfilePhotoProps>`
  position: relative;
  background-image: ${({ $profilePhoto }) =>
    $profilePhoto
      ? `url(${$profilePhoto})`
      : `url(${process.env.REACT_APP_API_URL}/media/images/no-banner.png)`};
  background-size: cover;
  background-position: center;
  background-position: center;
  width: 64px;
  max-width: 64px;
  height: 64px;
  max-height: 64px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  .profilePhotoInput {
    display: none;
  }

  .editIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    width: 46px;
    height: 46px;
    fill: ${colors.white};
    z-index: 1;

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover {
    .editIcon {
      display: block;
    }
    &::after {
      background-color: rgba(0, 0, 0, 0.75);
    }
  }
`

export const NameInput = styled.div`
  display: flex;

  .input {
    background-color: transparent;
    color: ${colors.white};
    font-size: 16px;
    padding: 1px 0 1px 4px;
    border: none;
    border-bottom: 1px solid ${colors.white};
    width: 220px;
    outline: none;
  }

  .confirmIcon * {
    fill: ${colors.white};
    height: 20px;
    width: 20px;
  }

  .confirmButton {
    background-color: transparent;
    border: none;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${colors.white};

      .confirmIcon * {
        fill: ${colors.black};
      }
    }
  }
`

export const UsernameInput = styled(NameInput)`
  .input {
    color: ${hexToRGBA(colors.white, 0.75)};
    font-size: 13px;
  }
`

export const RequestPassword = styled.div`
  position: absolute;
  z-index: 10;
  height: 100svh;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.73);

  .requestPasswordForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 320px;
    row-gap: 32px;
    padding: 32px 16px;
    background-color: ${colors.blue};
    border: 1px solid ${colors.white};
    border-radius: 8px;
  }

  .passwordInput {
    background-color: transparent;
    color: ${colors.white};
    font-size: 16px;
    padding: 1px 0 1px 4px;
    border: none;
    border-bottom: 1px solid ${colors.white};
    width: 220px;
    outline: none;
  }
`
