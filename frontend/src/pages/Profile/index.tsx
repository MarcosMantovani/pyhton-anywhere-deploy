import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConnectedProps, connect } from 'react-redux'

import {
  Profile as ProfileType,
  SimplifiedUserType
} from '../../store/actions/types'
import { RootState } from '../../store/reducers'

import Loader from '../../components/Loader'
import Sidebar from '../../components/Sidebar'
import Profilebar from '../../components/Profilebar'
import Post, { PostType } from '../../components/Post'
import Button from '../../components/Button'
import Message from '../../components/Message'
import Navbar from '../../components/Navbar'
import UsersList from '../../components/UsersList'

import { Title } from '../Home/styles'

import * as S from './styles'
import { PostResultType } from '../Home'

type Params = {
  id: string
}

type ShowingType = 'posts' | 'follows' | 'followers'

const connector = connect(
  (state: RootState) => ({
    profile: state.auth.profile,
    isAuthenticated: state.auth.isAuthenticated
  }),
  {}
)

type PropsFromRedux = ConnectedProps<typeof connector>

const Profile = ({ profile, isAuthenticated }: PropsFromRedux) => {
  const navigate = useNavigate()

  const { id } = useParams<Params>()

  const [user, setUser] = useState<AxiosResponse<ProfileType | null>>()
  const [listType, setListType] = useState<ShowingType>('posts')
  const [listContent, setListContent] = useState<SimplifiedUserType[]>()
  const [posts, setPosts] = useState<PostType[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)

  const [userFollowed, setUserFollowed] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [havePosts, setHavePosts] = useState<boolean>(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (localStorage.getItem('access')) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.getItem('access')}`,
            Accept: 'application/json'
          }
        }
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/user/${id}/`,
            config
          )
          setUser(response)
        } catch (err) {
          setMessage('Perfil não encontrado ou inexistente')
        }
      } else {
        setMessage('Entre para visualizar outros perfis')
      }
    }

    fetchProfile()
  }, [id])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      try {
        const url = `${process.env.REACT_APP_API_URL}/posts/${id}/?page=${page}`
        const response = await axios.get<PostResultType>(url, config)
        const newPosts = response.data.results
        if (page === 1) {
          setPosts(newPosts)
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts])
        }

        setHavePosts(response.data.next !== null)
      } catch (error) {
        setMessage('Erro ao carregar posts do usuário')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [id, page])

  useEffect(() => {
    const fetchNextPage = () => {
      if (!isLoading && havePosts) {
        setIsLoading(true)
        setPage((prevPage) => prevPage + 1)
      }
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (
        !isLoading &&
        havePosts &&
        scrollTop + clientHeight >= scrollHeight - 100
      ) {
        fetchNextPage()
      }
    }

    if (!isLoading) {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [havePosts, isLoading])

  useEffect(() => {
    // Verificando se usuário já é seguido
    const isFollowing = profile?.follows.some(
      (profile) => profile.id === Number(id)
    )
    if (isFollowing) {
      setUserFollowed(isFollowing)
    }
  }, [id, profile?.follows])

  useEffect(() => {
    if (user && user.data) {
      if (listType === 'follows') {
        setListContent(user.data.follows)
      } else if (listType === 'followers') {
        setListContent(user.data.followed_by)
      }
    }
  }, [listType, posts, user])

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
        setUserFollowed(true)
      } catch (err) {
        setUserFollowed(false)
        setMessage('Houve um erro ao seguir o usuário')
      }
    } else {
      setMessage('Entre para seguir outros usuários')
      setUserFollowed(false)
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
        setUserFollowed(false)
      } catch (err) {
        setUserFollowed(false)
        setMessage('Houve um erro ao deixar de seguir o usuário')
      }
    } else {
      setUserFollowed(false)
      setMessage('Entre para deixar de seguir outros usuários')
    }
  }

  const handlePostsList = () => {
    setListType('posts')
  }

  const handleFollowersList = () => {
    setListType('followers')
  }

  const handleFollowsList = () => {
    setListType('follows')
  }

  if (isAuthenticated !== true) {
    navigate('/login', { replace: true })
  }

  return (
    <>
      <Message opened={message ? true : false} onClick={() => setMessage(null)}>
        {message}
      </Message>
      {profile && <Navbar />}
      <Sidebar />
      {user && user.data && profile ? (
        <>
          <S.Header className="container">
            <S.BackgroundBanner
              src={
                user.data.banner
                  ? user.data.banner
                  : `${process.env.REACT_APP_API_URL}/media/images/no-banner.png`
              }
            />
            <S.Banner $banner={user.data.banner}>
              <S.Info>
                <div className="maininfo">
                  <div>
                    <S.ProfilePhoto
                      src={
                        user.data.profile_photo
                          ? user.data.profile_photo
                          : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
                      }
                    />
                    <div>
                      <S.Name className="name">
                        {user.data.name}{' '}
                        {Number(id) !== profile.id && (
                          <>
                            {!userFollowed ? (
                              <Button
                                type="button"
                                title="Follow"
                                styled="follow"
                                onClick={() => followUser(Number(id))}
                              >
                                +
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                title="Unfollow"
                                styled="follow"
                                onClick={() => unfollowUser(Number(id))}
                              >
                                -
                              </Button>
                            )}
                          </>
                        )}
                      </S.Name>
                      <S.Username>@{user.data.username}</S.Username>
                    </div>
                  </div>
                  <div className="social">
                    <div>
                      <p>{user.data.followed_by.length}</p>
                      <p className="description" onClick={handleFollowersList}>
                        Seguidores
                      </p>
                    </div>
                    <div>
                      <p>{user.data.follows.length}</p>
                      <p className="description" onClick={handleFollowsList}>
                        Seguindo
                      </p>
                    </div>
                    <div>
                      <p>{posts?.length}</p>
                      <p className="description" onClick={handlePostsList}>
                        Posts
                      </p>
                    </div>
                  </div>
                </div>
              </S.Info>
            </S.Banner>
          </S.Header>
          <S.ProfileContent className="container">
            {user.data.bio && <h5 className="bio">{user.data.bio}</h5>}
            {listType === 'posts' && posts && (
              <>
                <Title>POSTS</Title>
                {posts.map((post) => (
                  <Post postContent={post} key={post.id} />
                ))}
              </>
            )}
            {listType !== 'posts' && listContent && (
              <>
                {listType === 'follows' && (
                  <Title>Quem @{user.data.username} segue</Title>
                )}
                {listType === 'followers' && (
                  <Title>Quem segue @{user.data.username}</Title>
                )}
                {listContent.length > 0 && (
                  <UsersList users={listContent} profile={profile} />
                )}
              </>
            )}
          </S.ProfileContent>
        </>
      ) : (
        <Loader withBackground={false} active />
      )}
      {isLoading && <Loader withBackground={false} active />}
      {profile && <Profilebar user={profile} />}
    </>
  )
}

export default connector(Profile)
