import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../store/reducers'

import { ReactComponent as LikeIcon } from '../../assets/media/heart-outline.svg'
import { ReactComponent as MessageIcon } from '../../assets/media/message-circle-outline.svg'
import { ReactComponent as ConfirmIcon } from '../../assets/media/checkmark-outline.svg'
import { ReactComponent as CloseIcon } from '../../assets/media/close-outline.svg'
import { ReactComponent as ShareIcon } from '../../assets/media/corner-down-right-outline.svg'
import { ReactComponent as TrashIcon } from '../../assets/media/trash-2-outline.svg'
import { ReactComponent as ImageIcon } from '../../assets/media/image-outline.svg'
import { ReactComponent as EditIcon } from '../../assets/media/edit-outline.svg'
import { ReactComponent as AddPersonIcon } from '../../assets/media/person-add-outline.svg'
import { ReactComponent as CheckedPersonIcon } from '../../assets/media/person-done-outline.svg'

import Button from '../Button'

import Message from '../Message'

import * as S from './styles'

export type PostType = {
  id: number
  body: string
  image?: string | null
  created_at: string
  number_of_likes: number
  likes: number[]
  edited: boolean
  user: {
    id: number
    name: string
    username: string
    profile_photo: string | null
    followed_by: number[]
  }
  quoted_post?: {
    id: number
    body: string
    image?: string | null
    created_at: string
    likes: number[]
    number_of_likes: number
    edited: boolean
    user: {
      id: number
      name: string
      username: string
      profile_photo: string | null
      followed_by: number[]
    }
  }
}

type Props = {
  postContent: PostType
}

const connector = connect(
  (state: RootState) => ({ profile: state.auth.profile }),
  {}
)

type PropsFromRedux = ConnectedProps<typeof connector>

type CombinedProps = Props & PropsFromRedux

const Post = ({ postContent, profile }: CombinedProps) => {
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)

  const [postBody, setPostBody] = useState<string>(postContent.body)

  const [isQuote, setIsQuote] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [postCreated, setPostCreated] = useState(false)

  const [postQuoteBody, setPostQuoteBody] = useState('')
  const [quotePostImage, setQuotePostImage] = useState<File | null>(null)

  const [editedPostBody, setEditedPostBody] = useState(postContent.body)
  const [editedPostImageUrl, setEditedPostImageUrl] = useState<null | string>(
    postContent.image ? postContent.image : null
  )
  const [editedPostImageFile, setEditedPostImageFile] = useState<File | null>(
    null
  )
  const [postEdited, setPostEdited] = useState(false)

  const [postDeleted, setPostDeleted] = useState(false)

  const hasLikedPost = (): boolean => {
    if (profile) {
      return postContent.likes.includes(profile.id)
    }
    return false
  }

  const isFollowing = (): boolean => {
    if (profile) {
      return postContent.user.followed_by.includes(profile.id)
    }
    return false
  }

  const [userFollowed, setUserFollowed] = useState(isFollowing())

  const [liked, setLiked] = useState(hasLikedPost)

  const redirectToProfilePage = () =>
    navigate(`/profile/${postContent.user.id}`, { replace: true })

  const redirectToQuotedProfilePage = () => {
    if (postContent.quoted_post) {
      navigate(`/profile/${postContent.quoted_post.user.id}`, { replace: true })
    }
  }

  const redirectToUserProfilePage = () => {
    if (profile) {
      navigate(`/profile/${profile.id}`, { replace: true })
    }
  }

  const likePost = async (post_id: number) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      const body = JSON.stringify({
        post_id: post_id
      })

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/like-post/`,
          body,
          config
        )

        setLiked(!liked)
        liked ? postContent.number_of_likes-- : postContent.number_of_likes++
      } catch (err) {
        setError('Erro ao curtir post, atualize a página.')
      }
    } else {
      setError('Entre para curtir um post.')
    }
  }

  const createQuotePost = async () => {
    if (localStorage.getItem('access')) {
      const formData = new FormData()
      formData.append('body', postQuoteBody)
      formData.append('quoted_post_id', String(postContent.id))
      if (quotePostImage) {
        formData.append('image', quotePostImage)
      }

      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/create-post/`,
          formData,
          config
        )

        setPostQuoteBody('')
        setIsQuote(false)
        setPostCreated(true)
      } catch (err) {
        setError('Houve um erro ao criar o post. Recarregue a página.')
      }
    } else {
      setError('Entre para criar posts')
    }
  }

  const handleQuoteBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostQuoteBody(e.target.value)
  }

  const handleQuoteImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null
    setQuotePostImage(file)
  }

  const handleQuotePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createQuotePost()
  }

  const cancelQuoting = () => {
    setIsQuote(false)
    setQuotePostImage(null)
    setPostQuoteBody('')
  }

  const delete_post = async (post_id: number) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.getItem('access')}`
        }
      }

      const body = JSON.stringify({
        post_id: post_id
      })

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/delete-post/`,
          body,
          config
        )

        setPostDeleted(true)
      } catch (err) {
        setError('Houve um erro ao deletar o post. Recarregue a página.')
      }
    } else {
      setError('Entre para deletar posts')
    }
  }

  const editPost = async () => {
    if (localStorage.getItem('access')) {
      const formData = new FormData()
      formData.append('body', editedPostBody)
      formData.append('post_id', String(postContent.id))
      if (editedPostImageFile) {
        formData.append('image', editedPostImageFile)
      } else if (editedPostImageUrl === postContent.image) {
        formData.append('image', 'same')
      }

      const config = {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          Accept: 'application/json'
        }
      }

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/edit-post/`,
          formData,
          config
        )

        setPostBody(editedPostBody)
        setIsEditing(false)
        setPostEdited(true)
      } catch (err) {
        setError('Houve um erro ao editar o post. Recarregue a página.')
      }
    } else {
      setError('Entre para editar o post')
    }
  }

  const handleEditedPostBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPostBody(e.target.value)
  }

  const handleEditedPostImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null

    if (file) {
      setEditedPostImageFile(file)
      setEditedPostImageUrl(URL.createObjectURL(file))
    } else {
      setEditedPostImageFile(null)
      setEditedPostImageUrl(null)
    }
  }

  const handleEditedPostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    editPost()
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditedPostBody(postBody)
    setEditedPostImageUrl(postContent.image ? postContent.image : null)
    setEditedPostImageFile(null)
  }

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
        setError('Usuário seguido com sucesso.')
      } catch (err) {
        setUserFollowed(false)
        setError('Houve um erro ao seguir o usuário')
      }
    } else {
      setUserFollowed(false)
      setError('Entre para seguir outros usuários')
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
        setError('Usuário deixado de seguir com sucesso.')
        setUserFollowed(false)
      } catch (err) {
        setUserFollowed(false)
        setError('Houve um erro ao deixar de seguir o usuário')
      }
    } else {
      setUserFollowed(false)
      setError('Entre para deixar de seguir outros usuários')
    }
  }

  if (isEditing && profile) {
    return (
      <>
        <Message opened={error ? true : false} onClick={() => setError(null)}>
          {error}
        </Message>
        <Message
          opened={postCreated || postDeleted}
          onClick={() => {
            setPostCreated(false)
            setPostDeleted(false)
          }}
        >
          {postCreated && 'Citação de Post criada.'}
          {postDeleted && 'Post deletado.'}
        </Message>
        <S.EditPostContainer
          $image={editedPostImageUrl ? editedPostImageUrl : ''}
          onSubmit={(e) => handleEditedPostSubmit(e)}
        >
          <div className="sideIcons">
            <S.ProfilePhoto
              src={
                postContent.user.profile_photo
                  ? postContent.user.profile_photo
                  : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
              }
              alt="Profile Photo"
              onClick={redirectToProfilePage}
            />
            <Button
              title=""
              type="button"
              styled="postImg"
              icon={<ImageIcon />}
              onChange={(e) => handleEditedPostImageChange(e)}
            />
            <Button
              title=""
              type="button"
              styled="post"
              icon={<CloseIcon />}
              onClick={cancelEditing}
            />
            <Button
              title="Confirm"
              type="submit"
              styled="post"
              icon={<ConfirmIcon />}
            />
          </div>
          <S.TextPost>
            <div className="postHeader">
              <div className="username">
                <div>
                  <S.Name onClick={redirectToProfilePage}>
                    {postContent.user.name}
                  </S.Name>
                  <S.Username onClick={redirectToProfilePage}>
                    @{postContent.user.username}
                  </S.Username>
                </div>
              </div>
              <div>
                <p className="secondInfo">{postContent.created_at}</p>
                <p className="secondInfo">
                  {postContent.number_of_likes} curtidas
                </p>
              </div>
            </div>
            <div className="content">
              <textarea
                className="textQuotePost"
                name="body"
                value={editedPostBody}
                onChange={(e) => handleEditedPostBodyChange(e)}
                minLength={3}
                maxLength={200}
                required
              />
              {editedPostImageUrl && (
                <>
                  <div className="PostImage editPostImage">
                    <TrashIcon
                      className="deleteEditedPostImage"
                      onClick={() => {
                        setEditedPostImageUrl(null)
                        setEditedPostImageFile(null)
                      }}
                    />
                  </div>
                </>
              )}
              {postContent.quoted_post && (
                <S.QuotedPostContainer>
                  <div className="shareIcon">
                    <ShareIcon />
                  </div>
                  <div>
                    <div className="headInfo">
                      <div className="mainInfo">
                        <S.QuotedProfilePhoto
                          src={
                            postContent.quoted_post.user.profile_photo
                              ? postContent.quoted_post.user.profile_photo
                              : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
                          }
                          alt="Profile Photo"
                          onClick={redirectToQuotedProfilePage}
                        />
                        <div>
                          <S.Name onClick={redirectToQuotedProfilePage}>
                            {postContent.quoted_post.user.name}
                          </S.Name>
                          <S.Username onClick={redirectToQuotedProfilePage}>
                            {postContent.quoted_post.user.username}
                          </S.Username>
                        </div>
                      </div>
                      <div>
                        <p className="secondInfo">
                          {postContent.quoted_post.created_at}
                        </p>
                        <p className="secondInfo">
                          {postContent.quoted_post.likes} curtidas
                        </p>
                      </div>
                    </div>
                    <div className="quotedContent">
                      <p className="quotedBody">
                        {postContent.quoted_post.body}
                      </p>
                      {postContent.quoted_post.image && (
                        <img
                          className="postImage"
                          src={postContent.quoted_post.image}
                          alt="Post Image"
                        />
                      )}
                    </div>
                  </div>
                </S.QuotedPostContainer>
              )}
            </div>
          </S.TextPost>
        </S.EditPostContainer>
      </>
    )
  }

  if (isQuote && profile) {
    // Creating a Quote Post
    return (
      <>
        <Message opened={error ? true : false} onClick={() => setError(null)}>
          {error}
        </Message>
        <Message opened={postCreated}>Citação de Post criada.</Message>
        <S.QuotePostForm
          onSubmit={(e) => handleQuotePostSubmit(e)}
          $image={quotePostImage ? URL.createObjectURL(quotePostImage) : ''}
        >
          <div className="sideIcons">
            <S.ProfilePhoto
              src={
                profile.profile_photo
                  ? profile.profile_photo
                  : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
              }
              alt="Profile Photo"
              onClick={redirectToUserProfilePage}
            />
            <Button
              title="Add Image"
              type="button"
              styled="postImg"
              icon={<ImageIcon />}
              onChange={(e) => handleQuoteImageChange(e)}
            />
            <Button
              title="Cancel"
              type="button"
              styled="post"
              icon={<CloseIcon />}
              onClick={cancelQuoting}
            />
            <Button
              title="Confirm"
              type="submit"
              styled="post"
              icon={<ConfirmIcon />}
            />
          </div>
          <S.TextPost>
            <div className="postHeader">
              <div>
                <S.Name onClick={redirectToUserProfilePage}>
                  {profile.name}
                </S.Name>
                <S.Username onClick={redirectToUserProfilePage}>
                  @{profile.username}
                </S.Username>
              </div>
            </div>
            <div className="content">
              <textarea
                className="textQuotePost"
                name="body"
                value={postQuoteBody}
                onChange={(e) => handleQuoteBodyChange(e)}
                minLength={3}
                maxLength={200}
                required
              />
              {quotePostImage && (
                <>
                  <div className="PostImage quotePostImage">
                    <TrashIcon
                      className="deleteQuotePostImage"
                      onClick={() => {
                        setQuotePostImage(null)
                      }}
                    />
                  </div>
                </>
              )}
              <S.QuotedPostContainer>
                <div className="shareIcon">
                  <ShareIcon />
                </div>
                <div>
                  <div className="headInfo">
                    <div className="mainInfo">
                      <S.QuotedProfilePhoto
                        src={
                          postContent.user.profile_photo
                            ? postContent.user.profile_photo
                            : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
                        }
                        alt="Profile Photo"
                        onClick={redirectToQuotedProfilePage}
                      />
                      <div>
                        <S.Name onClick={redirectToQuotedProfilePage}>
                          {postContent.user.name}
                        </S.Name>
                        <S.Username onClick={redirectToQuotedProfilePage}>
                          @{postContent.user.username}
                        </S.Username>
                      </div>
                    </div>
                    <div>
                      <p className="secondInfo">{postContent.created_at}</p>
                      <p className="secondInfo">{postContent.likes} curtidas</p>
                    </div>
                  </div>
                  <div className="quotedContent">
                    <p className="quotedBody">{postContent.body}</p>
                    {postContent.image && (
                      <img
                        className="postImage"
                        src={postContent.image}
                        alt="Post Image"
                      />
                    )}
                  </div>
                </div>
              </S.QuotedPostContainer>
            </div>
          </S.TextPost>
        </S.QuotePostForm>
      </>
    )
  }

  return (
    <>
      <Message opened={error ? true : false} onClick={() => setError(null)}>
        {error}
      </Message>
      <Message
        opened={postCreated || postDeleted || postEdited}
        onClick={() => {
          setPostCreated(false)
          setPostDeleted(false)
        }}
      >
        {postCreated && 'Citação de Post criada.'}
        {postDeleted && 'Post deletado.'}
        {postEdited && 'Post editado com sucesso.'}
      </Message>
      <S.Container $liked={liked}>
        <div className="sideIcons">
          <S.ProfilePhoto
            src={
              postContent.user.profile_photo
                ? postContent.user.profile_photo
                : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
            }
            alt="Profile Photo"
            onClick={redirectToProfilePage}
          />
          <Button
            className="likeButton"
            title=""
            type="button"
            styled="post"
            icon={<LikeIcon />}
            onClick={() => likePost(postContent.id)}
          />
          <Button
            title=""
            type="button"
            styled="post"
            icon={<MessageIcon />}
            onClick={() => setIsQuote(true)}
          />
        </div>
        <S.TextPost>
          <div className="postHeader">
            <div className="username">
              <div>
                <S.Name onClick={redirectToProfilePage}>
                  {postContent.user.name}
                </S.Name>
                <S.Username onClick={redirectToProfilePage}>
                  @{postContent.user.username}
                </S.Username>
              </div>
              {postContent.user.id === profile?.id && (
                <div className="headerButtons">
                  <button type="button" className="headerButton">
                    <EditIcon onClick={() => setIsEditing(true)} />
                  </button>
                  <button type="button" className="headerButton">
                    <TrashIcon onClick={() => delete_post(postContent.id)} />
                  </button>
                </div>
              )}
              {postContent.user.id !== profile?.id && (
                <div>
                  {userFollowed ? (
                    <button type="button" className="headerButton">
                      <CheckedPersonIcon
                        onClick={() => unfollowUser(postContent.user.id)}
                      />
                    </button>
                  ) : (
                    <button type="button" className="headerButton">
                      <AddPersonIcon
                        onClick={() => followUser(postContent.user.id)}
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
            <div>
              <p className="secondInfo">{postContent.created_at}</p>
              <p className="secondInfo">
                {postContent.edited && 'editado - '}
                {postContent.number_of_likes} curtidas
              </p>
            </div>
          </div>
          <div className="content">
            <p>{postBody}</p>
            {editedPostImageUrl && (
              <img
                className="postImage"
                src={editedPostImageUrl}
                alt="Post Image"
              />
            )}
            {postContent.quoted_post && (
              <S.QuotedPostContainer>
                <div className="shareIcon">
                  <ShareIcon />
                </div>
                <div>
                  <div className="headInfo">
                    <div className="mainInfo">
                      <S.QuotedProfilePhoto
                        src={
                          postContent.quoted_post.user.profile_photo
                            ? postContent.quoted_post.user.profile_photo
                            : `${process.env.REACT_APP_API_URL}/media/images/no-profile-photo.png`
                        }
                        alt="Profile Photo"
                        onClick={redirectToQuotedProfilePage}
                      />
                      <div>
                        <S.Name onClick={redirectToQuotedProfilePage}>
                          {postContent.quoted_post.user.name}
                        </S.Name>
                        <S.Username onClick={redirectToQuotedProfilePage}>
                          {postContent.quoted_post.user.username}
                        </S.Username>
                      </div>
                    </div>
                    <div>
                      <p className="secondInfo">
                        {postContent.quoted_post.created_at}
                      </p>
                      <p className="secondInfo">
                        {postContent.quoted_post.edited && 'editado - '}
                        {postContent.quoted_post.number_of_likes} curtidas
                      </p>
                    </div>
                  </div>
                  <div className="quotedContent">
                    <p className="quotedBody">{postContent.quoted_post.body}</p>
                    {postContent.quoted_post.image && (
                      <img
                        className="postImage"
                        src={postContent.quoted_post.image}
                        alt="Post Image"
                      />
                    )}
                  </div>
                </div>
              </S.QuotedPostContainer>
            )}
          </div>
        </S.TextPost>
      </S.Container>
    </>
  )
}

export default connector(Post)
