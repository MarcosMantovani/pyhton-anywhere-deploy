import styled from 'styled-components'

import { ProfilePhoto as PostProfilePhoto } from '../Post/styles'

type ContainerProps = {
  $type: 'followers' | 'following' | 'none'
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-height: 400px;
  text-align: start;
  display: ${({ $type }) => ($type === 'none' ? 'none' : 'block')};

  .sectionTitle {
    margin-top: 16px;
  }
`
export const List = styled.ul`
  max-height: 384px;
  height: 100%;
  overflow: scroll;

  li {
    display: flex;
    margin-top: 8px;
  }
`

export const ProfilePhoto = styled(PostProfilePhoto)`
  margin-top: 0;
  margin-right: 8px;
`
