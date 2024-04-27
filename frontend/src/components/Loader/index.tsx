import * as S from './styles'

type Props = {
  active: boolean
  withBackground?: boolean
}

const Loader = ({ active, withBackground = true }: Props) => {
  return (
    <S.Loader $withBackground={withBackground} $active={active}>
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
      <div className="circle">
        <div className="dot"></div>
        <div className="outline"></div>
      </div>
    </S.Loader>
  )
}

export default Loader
