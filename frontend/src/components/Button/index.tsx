import React, { useRef } from 'react'

import * as S from './styles'

type ButtonProps = {
  type: 'button' | 'submit'
  title: string
  children?: string | React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  className?: string
  active?: boolean
  styled?:
    | 'standard'
    | 'minimalist'
    | 'sidebar'
    | 'post'
    | 'follow'
    | 'postImg'
    | 'search'
  onClick?: () => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Button = ({
  type,
  title,
  children,
  styled = 'standard',
  disabled = false,
  icon,
  onClick,
  onChange,
  className,
  active = false
}: ButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (styled === 'post') {
    return (
      <S.PostButton
        className={className}
        type={type}
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </S.PostButton>
    )
  }

  if (styled === 'postImg') {
    const handleButtonClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    return (
      <S.PostImgButton className={className}>
        <S.PostButton
          onClick={handleButtonClick}
          type="button"
          className="postImgButton"
        >
          {icon}
        </S.PostButton>
        <input
          ref={fileInputRef}
          className="postImgInput"
          type="file"
          onChange={onChange}
        ></input>
      </S.PostImgButton>
    )
  }

  if (styled === 'sidebar') {
    return (
      <S.SideBarButton
        className={className}
        type={type}
        title={title}
        onClick={onClick}
        disabled={disabled}
        $active={active}
      >
        {icon}
        {children}
      </S.SideBarButton>
    )
  }

  if (styled === 'search') {
    return (
      <S.SearchButton
        className={className}
        type={type}
        title={title}
        onClick={onClick}
        disabled={disabled}
        $active={active}
      >
        {icon}
        {children}
      </S.SearchButton>
    )
  }

  if (styled === 'follow') {
    return (
      <S.FollowButton
        className={className}
        type={type}
        title={title}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </S.FollowButton>
    )
  }

  // if (styled === 'standard' || styled === 'minimalist')
  return (
    <S.StandardButton
      className={className}
      type={type}
      title={title}
      onClick={onClick}
      $styled={styled}
      disabled={disabled}
    >
      {children}
    </S.StandardButton>
  )
}

export default Button
