import styled from 'styled-components'

import { breakpoints, colors } from '../../styles'

type ContainerProps = {
  $signup: boolean
}

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  color: ${colors.black};
`

export const SignIn = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`

export const SignUp = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`

export const Container = styled.div<ContainerProps>`
  background-color: ${colors.white};
  border-radius: 30px;
  position: relative;
  width: 768px;
  max-width: 100%;
  min-height: 480px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 80%;
  }

  span {
    font-size: 12px;
  }

  .mobileButton {
    display: none;
    text-align: center;
    margin-top: 16px;

    .button {
      text-decoration: underline;
      cursor: pointer;
    }

    @media (max-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .toggle-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    transform: ${({ $signup }) => ($signup ? 'translateX(-100%)' : '')};
    border-radius: ${({ $signup }) =>
      $signup ? '25px 150px 100px 25px' : '150px 25px 25px 100px'};
    z-index: 6;

    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  .toggle {
    background-color: ${colors.blue};
    height: 100%;
    background: linear-gradient(to right, #343434, ${colors.blue});
    color: ${colors.white};
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: ${({ $signup }) => ($signup ? 'translateX(50%)' : '')};
    transition: all 0.6s ease-in-out;
  }

  .toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
  }

  .toggle-left {
    transform: ${({ $signup }) => ($signup ? '' : 'translateX(-200%)')};
  }

  .toggle-right {
    right: 0;
    transform: ${({ $signup }) => ($signup ? 'translateX(200%)' : '')};
  }

  ${SignIn} {
    transform: ${({ $signup }) => ($signup ? 'translateX(100%)' : '')};
  }

  ${SignUp} {
    transform: ${({ $signup }) => ($signup ? 'translateX(100%)' : '')};
    opacity: ${({ $signup }) => ($signup ? '1' : '0')};
    z-index: ${({ $signup }) => ($signup ? '5' : '')};

    @media (max-width: ${breakpoints.tablet}) {
      transform: ${({ $signup }) => ($signup ? 'translateX(0%)' : '')};
    }
  }
`

export const Form = styled.form`
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  border-radius: 30px;

  span {
    text-align: center;
  }
`

export const ForgotPasswordButton = styled.button`
  padding: 4px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: none;

  font-size: 16px;
  cursor: pointer;

  background-color: transparent;

  transition: all 0.3s ease-in-out;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.black};
  }
`

export const Input = styled.input`
  background-color: ${colors.white2};
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
`

export const Title = styled.h2`
  text-align: center;
  font-size: 2em;
`

export const Subtitle = styled.p`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
`

export const SocialIcons = styled.div`
  margin: 20px 0;

  div {
    border: 1px solid ${colors.lightGray};
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;

    a,
    img {
      width: 25px;
      height: 25px;
    }
  }
`
