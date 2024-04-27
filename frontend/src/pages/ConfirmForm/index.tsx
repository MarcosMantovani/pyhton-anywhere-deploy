import { ChangeEvent, useEffect, useState } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { reset_password_confirm, verify } from '../../store/actions/auth'

import Button from '../../components/Button'
import TextlyTitle from '../../components/TextlyTitle'

import { Body, Input } from '../LoginRegister/styles'
import * as S from './styles'
import { RootState } from '../../store/reducers'

const connector = connect(
  (state: RootState) => ({
    type: state.auth.type,
    error: state.auth.error
  }),
  {
    reset_password_confirm: reset_password_confirm,
    verify: verify
  }
)

type PropsFromRedux = ConnectedProps<typeof connector>

type Params = {
  uid: string
  token: string
}

const ConfirmForm: React.FC<PropsFromRedux> = ({
  error,
  type,
  reset_password_confirm,
  verify
}) => {
  const [verified, setVerified] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  })
  const { new_password, re_new_password } = formData

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { uid, token } = useParams<Params>()

  useEffect(() => {
    if (type === 'PASSWORD_RESET_CONFIRM_FAIL') {
      setErrorMsg(error)
      console.log('sim')
    } else if (type === 'PASSWORD_RESET_CONFIRM_SUCCESS') {
      setErrorMsg('Sua senha foi alterada com sucesso')
      console.log('nao')
    }
    console.log(error)
    console.log(type)
  }, [error, type])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (uid && token) {
      reset_password_confirm(uid, token, new_password, re_new_password)
    }
  }

  const verifyAccount = () => {
    if (uid && token) {
      verify(uid, token)
      setVerified(true)
    }
  }

  if (verified) {
    navigate('/login', { replace: true })
  }

  if (pathname.startsWith('/activate/')) {
    return (
      <Body>
        <TextlyTitle position="middle-top" />
        <S.Form role="div">
          <S.Title>Confirmar conta</S.Title>
          <span>
            Confirme sua conta para aproveitar todos os recursos do Textly
          </span>
          {errorMsg && <span>{errorMsg}</span>}
          <Button title="Sign In" type="button" onClick={verifyAccount}>
            CONFIRMAR CONTA
          </Button>
        </S.Form>
      </Body>
    )
  }

  return (
    <Body>
      <TextlyTitle position="middle-top" />
      <S.Form onSubmit={(e) => onSubmit(e)}>
        <S.Title>Alterar a Senha</S.Title>
        <span>Digite e confirme a sua nova senha para alterá-la</span>
        <Input
          name="new_password"
          value={new_password}
          placeholder="Nova senha"
          type="password"
          onChange={(e) => onChange(e)}
          required
        />
        <Input
          name="re_new_password"
          value={re_new_password}
          placeholder="Repita a senha"
          type="password"
          minLength={6}
          onChange={(e) => onChange(e)}
          required
        />
        {errorMsg && <span>{errorMsg}</span>}
        <Button title="Sign In" type="submit">
          ALTERAR SENHA
        </Button>
      </S.Form>
    </Body>
  )
}

export default connector(ConfirmForm)
