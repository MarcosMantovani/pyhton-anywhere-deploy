import Button from '../Button'

import * as S from './styles'

type Props = {
  children?: string | React.ReactNode
  opened: boolean
  onClick?: () => void
}

const Message = ({ children, opened = false, onClick }: Props) => {
  return (
    <>
      <S.Container $opened={opened}>
        <div>
          <p>{children}</p>
        </div>
        <div className="button">
          <Button
            className="button"
            type="button"
            title="fechar"
            styled="minimalist"
            onClick={onClick}
          >
            Fechar
          </Button>
        </div>
      </S.Container>
    </>
  )
}

export default Message
