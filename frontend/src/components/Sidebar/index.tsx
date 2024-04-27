import { ConnectedProps, connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logout } from '../../store/actions/auth'

import Button from '../Button'
import TextlyTitle from '../TextlyTitle'

import { ReactComponent as LogoutIcon } from '../../assets/media/log-out-outline.svg'
import { ReactComponent as HomeIcon } from '../../assets/media/home-outline.svg'
import { ReactComponent as FeedIcon } from '../../assets/media/people-outline.svg'
import { ReactComponent as SearchIcon } from '../../assets/media/search-outline.svg'
import { ReactComponent as OptionsIcon } from '../../assets/media/options-2-outline.svg'

import * as S from './styles'

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(null, {
  logout: logout
})

const Sidebar = ({ logout }: PropsFromRedux) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/' || location.pathname === '/home'
  const isFeed = location.pathname === '/feed'
  const isSearch = location.pathname === '/search'
  const isEditProfile = location.pathname === '/edit-profile'

  const handlerLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const redirectToHomePage = () => {
    navigate('/home', { replace: true })
  }

  const redirectToFeedPage = () => {
    navigate('/feed', { replace: true })
  }

  const redirectToSearchPage = () => {
    navigate('/search', { replace: true })
  }

  const redirectToEditProfilePage = () => {
    navigate('/edit-profile', { replace: true })
  }

  return (
    <S.Sidebar>
      <S.MainOptions>
        <TextlyTitle />
        <Button
          title="Home"
          type="button"
          styled="sidebar"
          icon={<HomeIcon />}
          onClick={redirectToHomePage}
          active={isHome}
        >
          Home
        </Button>
        <Button
          title="Home"
          type="button"
          styled="sidebar"
          icon={<FeedIcon />}
          onClick={redirectToFeedPage}
          active={isFeed}
        >
          Feed
        </Button>
        <Button
          title="Search"
          type="button"
          styled="sidebar"
          icon={<SearchIcon />}
          onClick={redirectToSearchPage}
          active={isSearch}
        >
          Search
        </Button>
        <Button
          title="Edit Profile"
          type="button"
          styled="sidebar"
          icon={<OptionsIcon />}
          onClick={redirectToEditProfilePage}
          active={isEditProfile}
        >
          Editar Perfil
        </Button>
      </S.MainOptions>
      <Button
        title="Logout"
        type="button"
        styled="sidebar"
        icon={<LogoutIcon />}
        onClick={handlerLogout}
      >
        Logout
      </Button>
    </S.Sidebar>
  )
}

export default connector(Sidebar)
