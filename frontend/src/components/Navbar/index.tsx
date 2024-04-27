import { useNavigate } from 'react-router-dom'
import { ConnectedProps, connect } from 'react-redux'

import { logout } from '../../store/actions/auth'
import { RootState } from '../../store/reducers'

import Button from '../Button'

import { ReactComponent as LogoutIcon } from '../../assets/media/log-out-outline.svg'
import { ReactComponent as HomeIcon } from '../../assets/media/home-outline.svg'
import { ReactComponent as FeedIcon } from '../../assets/media/people-outline.svg'
import { ReactComponent as SearchIcon } from '../../assets/media/search-outline.svg'
import { ReactComponent as OptionsIcon } from '../../assets/media/options-2-outline.svg'

import * as S from './styles'

type PropsFromRedux = ConnectedProps<typeof connector>

const connector = connect(
  (state: RootState) => ({
    profile: state.auth.profile
  }),
  {
    logout: logout
  }
)

const Navbar = ({ profile, logout }: PropsFromRedux) => {
  const navigate = useNavigate()

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

  const redirectToUserProfile = () => {
    if (profile) {
      navigate(`/profile/${profile.id}`, { replace: true })
    }
  }

  return (
    <S.Container>
      <Button
        title="Logout"
        type="button"
        styled="sidebar"
        icon={<LogoutIcon />}
        onClick={handlerLogout}
      ></Button>
      <Button
        title="Search"
        type="button"
        styled="sidebar"
        icon={<SearchIcon />}
        onClick={redirectToSearchPage}
        active={isSearch}
      ></Button>
      <Button
        title="Home"
        type="button"
        styled="sidebar"
        icon={<HomeIcon />}
        onClick={redirectToHomePage}
        active={isHome}
      ></Button>
      <Button
        title="Home"
        type="button"
        styled="sidebar"
        icon={<FeedIcon />}
        onClick={redirectToFeedPage}
        active={isFeed}
      ></Button>
      <Button
        title="Edit Profile"
        type="button"
        styled="sidebar"
        icon={<OptionsIcon />}
        onClick={redirectToEditProfilePage}
        active={isEditProfile}
      ></Button>
      <S.ProfilePhoto
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmXbF5pzQLdDorqzEDnY7Gv8FTD0ymDXI0rXckeD-Vw&s"
        onClick={redirectToUserProfile}
      />
    </S.Container>
  )
}

export default connector(Navbar)
