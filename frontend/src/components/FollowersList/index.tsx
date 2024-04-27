import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Name, Username } from '../Post/styles'

import * as S from './styles'
import { SimplifiedUserType } from '../../store/actions/types'

type Props = {
  followers: SimplifiedUserType[]
  following: SimplifiedUserType[]
  listDisplay: 'followers' | 'following' | 'none'
}

const FollowersList = ({ followers, following, listDisplay }: Props) => {
  const [userList, setUserList] = useState<SimplifiedUserType[] | null>(null)
  const navigate = useNavigate()

  const redirectToProfilePage = (id: number) =>
    navigate(`/profile/${id}`, { replace: true })

  useEffect(() => {
    if (listDisplay === 'followers') {
      setUserList(followers)
    } else {
      setUserList(following)
    }
  }, [followers, following, listDisplay])

  if (userList) {
    return (
      <S.Container $type={listDisplay}>
        {listDisplay === 'followers' ? (
          <>
            <h3 className="sectionTitle">Quem segue você</h3>
            {userList.length === 0 && <h5>Você não segue ninguém</h5>}
          </>
        ) : (
          <>
            <h3 className="sectionTitle">Quem você segue</h3>
            {userList.length === 0 && <h5>Você não é seguido por ninguém</h5>}
          </>
        )}
        {listDisplay !== 'none' && (
          <>
            {userList.length > 0 && (
              <S.List>
                {userList.map((user) => (
                  <li key={user.id}>
                    <S.ProfilePhoto
                      className="profilePhoto"
                      src={
                        user.profile_photo
                          ? user.profile_photo
                          : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
                      }
                      alt="Foto de perfil"
                      onClick={() => redirectToProfilePage(user.id)}
                    />
                    <div>
                      <Name onClick={() => redirectToProfilePage(user.id)}>
                        {user.name}
                      </Name>
                      <Username onClick={() => redirectToProfilePage(user.id)}>
                        @{user.username}
                      </Username>
                    </div>
                  </li>
                ))}
              </S.List>
            )}
          </>
        )}
      </S.Container>
    )
  }

  return <div></div>
}

export default FollowersList
