import textlyLogo from '../../assets/media/Textly-logo.png'

import * as S from './styles'

type TextlyTitleProps = {
  position?: 'middle-top' | 'static'
}

const TextlyTitle = ({ position = 'static' }: TextlyTitleProps) => {
  return (
    <S.Title $position={position}>
      <img src={textlyLogo} alt="Textly" />
    </S.Title>
  )
}

export default TextlyTitle
