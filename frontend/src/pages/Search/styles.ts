import styled from 'styled-components'

import { colors } from '../../styles'

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid ${colors.white};
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  padding: 8px;
  color: ${colors.white};

  &:focus {
    outline: none;
  }
`

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 32px;
  width: 100%;
  row-gap: 16px;
  background-color: ${colors.blue};

  .inputContainer {
    display: flex;
    column-gap: 8px;
  }

  .searchButton {
    border: none;
    border-radius: 8px;
    padding: 4px;
    background-color: transparent;
    width: 38px;
    height: 38px;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${colors.white};

      .searchIcon * {
        fill: ${colors.black};
      }
    }
  }

  .searchIcon {
    width: 100%;
    height: 100%;
    cursor: pointer;
    fill: ${colors.white};
  }

  .buttons {
    display: flex;
    justify-content: center;
    column-gap: 16px;
  }
`
