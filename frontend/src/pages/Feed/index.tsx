import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import axios from 'axios'

import { RootState } from '../../store/reducers'
import { load_user } from '../../store/actions/auth'

import NewPost from '../../components/NewPost'
import Post, { PostType } from '../../components/Post'
import Sidebar from '../../components/Sidebar'
import Profilebar from '../../components/Profilebar'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Navbar from '../../components/Navbar'

import * as S from './styles'

export type PostResultType = {
  count: number
  next: string | null
  previous: string | null
  results: PostType[]
}

const connector = connect(
  (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
    type: state.auth.type
  }),
  {
    load_user: load_user
  }
)

type PropsFromRedux = ConnectedProps<typeof connector>

const Feed: React.FC<PropsFromRedux> = ({
  isAuthenticated,
  profile,
  type,
  load_user
}) => {
  const navigate = useNavigate()

  const [posts, setPosts] = useState<PostType[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [havePosts, setHavePosts] = useState<boolean>(true)

  useEffect(() => {
    if (!profile) {
      load_user()
    }
  }, [load_user, profile])

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
        const url = `${process.env.REACT_APP_API_URL}/followed-users-posts/?page=${page}`
        const response = await axios.get<PostResultType>(url, config)
        const newPosts = response.data.results
        if (page === 1) {
          setPosts(newPosts)
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts])
        }

        setHavePosts(response.data.next !== null)
      } catch (error) {
        setMessage('Erro ao carregar posts')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [page])

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

  if (!isAuthenticated) {
    navigate('/login', { replace: true })
    return null
  }

  if (type !== 'IS_LOADING') {
    if (profile) {
      return (
        <>
          <Message opened={message !== null} onClick={() => setMessage(null)}>
            {message}
          </Message>
          {profile && <Navbar />}
          <Sidebar />
          <div className="container">
            <S.Title>Feed</S.Title>
            <NewPost
              profilePhoto={
                profile.profile_photo
                  ? profile.profile_photo
                  : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
              }
            />
            {posts.length > 0 ? (
              <>
                {posts.map((post) => (
                  <Post postContent={post} key={post.id} />
                ))}
                {isLoading && <Loader withBackground={false} active />}
              </>
            ) : (
              <h3>Você não segue nenhum usuário.</h3>
            )}
          </div>
          <Profilebar user={profile} />
        </>
      )
    }
  }

  return <Loader withBackground={false} active />
}

export default connector(Feed)
