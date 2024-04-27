import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Profile } from '../../store/actions/types'

import Button from '../Button'
import FollowersList from '../FollowersList'

import { ReactComponent as ProfileIcon } from '../../assets/media/person-outline.svg'
import { ReactComponent as HomeIcon } from '../../assets/media/home-outline.svg'

import * as S from './styles'

type ListDisplayType = 'followers' | 'following' | 'none'

type Props = {
  user: Profile
}

const Profilebar: React.FC<Props> = ({ user }) => {
  const [listDisplay, setListDisplay] = useState<ListDisplayType>('none')
  const navigate = useNavigate()
  const location = useLocation()

  const redirectToProfilePage = (id: number) =>
    navigate(`/profile/${id}`, { replace: true })

  const redirectToHomePage = () => navigate(`/home`, { replace: true })

  const handleFolowersList = () => {
    if (listDisplay === 'followers') {
      setListDisplay('none')
    } else {
      setListDisplay('followers')
    }
  }

  const handleFolowingList = () => {
    if (listDisplay === 'following') {
      setListDisplay('none')
    } else {
      setListDisplay('following')
    }
  }

  const isInProfile = location.pathname.includes('profile')

  return (
    <S.Profilebar>
      <div>
        <S.Banner
          src={
            user.banner
              ? user.banner
              : `${process.env.REACT_APP_API_URL}/media/images/no-banner.png`
          }
          alt="Banner do perfil"
        />
        <S.MainInfo className="mainInfo">
          <S.Photo
            src={
              user.profile_photo
                ? user.profile_photo
                : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
            }
            alt="Foto do perfil"
          />
          <S.Name>{user.name}</S.Name>
          <S.UserName>@{user.username}</S.UserName>
          <S.UserEmail>{user.email}</S.UserEmail>
          <S.FollowListButtons>
            <button
              title="followers"
              type="button"
              onClick={handleFolowersList}
            >
              Seguidores {user.followed_by.length}
            </button>
            <button onClick={() => handleFolowingList()}>
              Seguindo {user.follows.length}
            </button>
          </S.FollowListButtons>
          <FollowersList
            listDisplay={listDisplay}
            followers={user.followed_by}
            following={user.follows}
          />
        </S.MainInfo>
      </div>
      {isInProfile ? (
        <Button
          title="Perfil"
          type="button"
          styled="sidebar"
          icon={<HomeIcon />}
          onClick={() => redirectToHomePage()}
        >
          Home
        </Button>
      ) : (
        <Button
          title="Perfil"
          type="button"
          styled="sidebar"
          icon={<ProfileIcon />}
          onClick={() => redirectToProfilePage(user.id)}
        >
          Perfil
        </Button>
      )}
    </S.Profilebar>
  )
}

export default Profilebar
