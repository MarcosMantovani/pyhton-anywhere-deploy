import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ConnectedProps, connect } from 'react-redux'

import { RootState } from '../../store/reducers'
import { SimplifiedUserType } from '../../store/actions/types'

import Button from '../../components/Button'
import Post, { PostType } from '../../components/Post'
import Sidebar from '../../components/Sidebar'
import Profilebar from '../../components/Profilebar'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Navbar from '../../components/Navbar'
import UsersList from '../../components/UsersList'
import { PostResultType } from '../Home'

import { ReactComponent as SearchIcon } from '../../assets/media/search-outline.svg'
import { ReactComponent as PersonIcon } from '../../assets/media/person-outline.svg'
import { ReactComponent as PostIcon } from '../../assets/media/email-outline.svg'

import { Title } from '../Home/styles'
import * as S from './styles'

export type UserResultType = {
  count: number
  previous: string | null
  next: string | null
  results: SimplifiedUserType[]
}

type SearchType = 'posts' | 'usuários'

const connector = connect(
  (state: RootState) => ({
    profile: state.auth.profile,
    isAuthenticated: state.auth.isAuthenticated
  }),
  {}
)

type PropsFromRedux = ConnectedProps<typeof connector>

const Search = ({ profile, isAuthenticated }: PropsFromRedux) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('Posts')
  const [searchType, setSearchType] = useState<SearchType>('posts')
  const [searchText, setSearchText] = useState<string>('')
  const [posts, setPosts] = useState<PostType[]>([])
  const [users, setUsers] = useState<SimplifiedUserType[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [havePosts, setHavePosts] = useState<boolean>(true)

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
        const url =
          searchText !== ''
            ? `${process.env.REACT_APP_API_URL}/search-posts/${searchText}/?page=${page}`
            : `${process.env.REACT_APP_API_URL}/search-posts/?page=${page}`
        const response = await axios.get<PostResultType>(url, config)
        const newPosts = response.data.results
        if (page === 1) {
          setPosts(newPosts)
        } else {
          setPosts((prevPosts) => [...prevPosts, ...newPosts])
        }

        setTitle(searchText ? `Posts com "${searchText}"` : 'Posts')
        setHavePosts(response.data.next !== null)
      } catch (error) {
        setMessage('Erro ao carregar posts.')
      } finally {
        setIsLoading(false)
      }
    }

    if (searchType === 'posts') {
      fetchPosts()
    }
  }, [searchText, page, searchType])

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      try {
        const url =
          searchText !== ''
            ? `${process.env.REACT_APP_API_URL}/search-users/${searchText}/?page=${page}`
            : `${process.env.REACT_APP_API_URL}/search-users/?page=${page}`
        const response = await axios.get<UserResultType>(url, config)
        const newUsers = response.data.results
        if (page === 1) {
          setUsers(newUsers)
        } else {
          setUsers((prevUsers) => [...prevUsers, ...newUsers])
        }

        setTitle(searchText ? `Usuários com "${searchText}"` : 'Usuários')
        setHavePosts(response.data.next !== null)
      } catch (error) {
        setMessage('Erro ao carregar usuários.')
      } finally {
        setIsLoading(false)
      }
    }

    if (searchType === 'usuários') {
      fetchUsers()
    }
  }, [searchText, page, searchType])

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

  const OnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    setPage(1)
  }

  const OnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPage(1)
  }

  if (!isAuthenticated) {
    navigate('/login', { replace: true })
    return null
  }

  return (
    <>
      <Message opened={message ? true : false} onClick={() => setMessage(null)}>
        {message}
      </Message>
      {profile && <Navbar />}
      <Sidebar />
      <div className="container">
        <S.SearchForm onSubmit={(e) => OnSubmit(e)}>
          <div className="inputContainer">
            <S.Input
              className="searchInput"
              type="text"
              placeholder={`Procurar por "${searchType}"`}
              onChange={(e) => OnChange(e)}
            />
            <button className="searchButton" type="submit" title="Procurar">
              <SearchIcon className="searchIcon" />
            </button>
          </div>
          <div className="buttons">
            <Button
              type="button"
              styled="search"
              title="Post"
              icon={<PostIcon />}
              onClick={() => setSearchType('posts')}
              active={searchType === 'posts'}
            >
              Posts
            </Button>
            <Button
              type="button"
              styled="search"
              title="Post"
              icon={<PersonIcon />}
              onClick={() => setSearchType('usuários')}
              active={searchType === 'usuários'}
            >
              Usuários
            </Button>
          </div>
        </S.SearchForm>
        <Title>{title}</Title>
        {searchType === 'posts' && (
          <>
            {posts.map((post) => (
              <Post postContent={post} key={post.id} />
            ))}
          </>
        )}

        {searchType === 'usuários' && profile && (
          <>
            {users ? (
              <UsersList users={users} profile={profile} />
            ) : (
              <Loader withBackground={false} active />
            )}
          </>
        )}
      </div>
      {profile && <Profilebar user={profile} />}
    </>
  )
}

export default connector(Search)
