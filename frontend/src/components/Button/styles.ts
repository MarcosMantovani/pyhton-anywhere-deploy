import styled from 'styled-components'

import { colors } from '../../styles'

type StandardButtonProps = {
  $styled?: 'standard' | 'minimalist' | 'sidebar' | 'post' | 'follow'
}

type SideBarButtonProps = {
  $active: boolean
}

export const StandardButton = styled.button<StandardButtonProps>`
  background-color: ${({ $styled }) =>
    $styled === 'minimalist' ? 'transparent' : `${colors.blue}`};
  color: ${colors.white};
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  border-color: ${({ $styled }) =>
    $styled === 'minimalist' ? `${colors.white2}` : 'transparent'};
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
    border-color: ${({ $styled }) =>
      $styled === 'minimalist' ? 'transparent' : `${colors.black}`};
  }

  &:disabled {
    background-color: ${colors.lightGray};
    color: ${colors.black};
    border-color: ${({ $styled }) =>
      $styled === 'minimalist' ? 'transparent' : `${colors.blue}`};
    cursor: not-allowed;
  }

  &:active {
    background-color: ${colors.black};
    color: ${colors.white};
    transition: none;
  }
`

export const PostButton = styled.button`
  position: relative;
  background-color: ${colors.blue};
  width: 40px;
  height: 40px;
  padding: 8px;
  border: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom: 1px solid ${colors.white};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  svg {
    width: 20px;
    height: 20px;

    * {
      fill: ${colors.white};
    }
  }

  &:hover {
    background-color: ${colors.white};
    border-bottom-color: ${colors.black};

    svg * {
      fill: ${colors.blue};
    }
  }

  &:active {
    background-color: ${colors.black};
    transition: none;
  }
`

export const PostImgButton = styled.div`
  .postImgInput[type='file'] {
    display: none;
  }
`

export const SideBarButton = styled.button<SideBarButtonProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px 20px;
  border: none;
  border-radius: 16px;
  margin: 0;

  font-size: 16px;
  text-align: left;

  background-color: ${({ $active }) =>
    $active ? `${colors.white}` : `${colors.black}`};
  color: ${({ $active }) => ($active ? `${colors.black}` : `${colors.white}`)};

  column-gap: 8px;

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};

    svg * {
      fill: ${colors.black};
    }
  }

  svg {
    height: 30px;
    width: 30px;

    * {
      fill: ${({ $active }) =>
        $active ? `${colors.black}` : `${colors.white}`};
    }
  }

  &:active {
    background-color: ${colors.black};
    color: ${colors.white};
    transition: none;
  }
`

export const SearchButton = styled(SideBarButton)`
  width: auto;
  padding: 8px;
  border-radius: 8px;

  svg {
    height: 20px;
    width: 20px;
  }
`

export const FollowButton = styled.button<StandardButtonProps>`
  background-color: rgba(0, 0, 0, 0.3);
  color: ${colors.white};
  font-size: 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 4px 8px;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }

  &:active {
    background-color: ${colors.white};
    color: ${colors.black};
    transition: none;
  }
`
