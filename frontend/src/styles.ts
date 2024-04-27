import { createGlobalStyle } from 'styled-components'

export const colors = {
  black: '#0D0D0D',
  blue: '#14141A',
  white: '#F2F2F2',
  white2: '#FFFFFF',
  lightGray: '#ccc',
  likeColor: '#E97A6D'
}

export const breakpoints = {
  desktop: '1023px',
  tablet: '767px'
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, Roboto;
    font-weight: bold;
    list-style: none;
  }

  body {
    background-color: ${colors.black};
    color: ${colors.white};
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 648px;
    margin: 40px auto 0 auto;

    @media (max-width: ${breakpoints.desktop}) {
      max-width: 80%;
    }
  }
`
