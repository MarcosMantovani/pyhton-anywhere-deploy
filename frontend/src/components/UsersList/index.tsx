import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SimplifiedUserType } from '../../store/actions/types'
import { Profile } from '../../store/actions/types'

import Message from '../Message'

import { ReactComponent as AddPersonIcon } from '../../assets/media/person-add-outline.svg'
import { ReactComponent as CheckedPersonIcon } from '../../assets/media/person-done-outline.svg'

import * as S from './styles'

type Props = {
  users: SimplifiedUserType[]
  profile: Profile
}

const UsersList = ({ users, profile }: Props) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState<string | null>(null)

  const followUser = async (user_to_be_followed_id: number) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      const body = JSON.stringify({
        user_to_be_followed_id: user_to_be_followed_id
      })

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/user/follow/`,
          body,
          config
        )
      } catch (err) {
        setMessage('Houve um erro ao seguir o usuário. Recarregue a página.')
      }
    } else {
      setMessage('Entre para seguir outros usuários.')
    }
  }

  const unfollowUser = async (user_to_be_unfollowed_id: number) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      const body = JSON.stringify({
        user_to_be_unfollowed_id: user_to_be_unfollowed_id
      })

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/user/unfollow/`,
          body,
          config
        )
      } catch (err) {
        setMessage('Houve um erro ao deixar de seguir o usuário')
      }
    } else {
      setMessage('Entre para deixar de seguir outros usuários')
    }
  }

  const redirectToProfilePage = (user_id: number) => {
    navigate(`/profile/${user_id}`, { replace: true })
  }

  const isFollowing = (user: SimplifiedUserType): boolean => {
    if (profile) {
      return user.followed_by.includes(profile.id)
    }
    return false
  }

  return (
    <>
      <Message opened={message ? true : false} onClick={() => setMessage(null)}>
        {message}
      </Message>
      <S.UsersList>
        {users.map((user) => (
          <li className="row" key={user.id}>
            <S.ProfilePhoto
              src={
                user.profile_photo
                  ? user.profile_photo
                  : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
              }
              alt="Profile Photo"
              onClick={() => redirectToProfilePage(user.id)}
            />
            <div className="userInfo">
              <div>
                <div className="name">
                  <S.Name onClick={() => redirectToProfilePage(user.id)}>
                    {user.name}
                  </S.Name>
                  {user.id !== profile.id && (
                    <>
                      {isFollowing(user) ? (
                        <button
                          className="followButton"
                          type="button"
                          onClick={() => {
                            unfollowUser(user.id)
                            user.followed_by.splice(
                              user.followed_by.indexOf(profile.id),
                              1
                            )
                            isFollowing(user)
                          }}
                        >
                          <CheckedPersonIcon />
                        </button>
                      ) : (
                        <button
                          className="followButton"
                          type="button"
                          onClick={() => {
                            followUser(user.id)
                            user.followed_by.push(profile.id)
                            isFollowing(user)
                          }}
                        >
                          <AddPersonIcon />
                        </button>
                      )}
                    </>
                  )}
                </div>
                <S.Username onClick={() => redirectToProfilePage(user.id)}>
                  @{user.username}
                </S.Username>
              </div>
              <div>
                <p className="secondInfo">
                  seguindo {user.follows.length} - seguidores{' '}
                  {user.followed_by.length}
                </p>
              </div>
            </div>
          </li>
        ))}
      </S.UsersList>
    </>
  )
}

export default UsersList
