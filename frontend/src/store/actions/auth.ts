import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

import RootReducer from '../reducers'
import {
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  IS_LOADING
} from './types'

type AppDispatch = ThunkDispatch<typeof RootReducer, void, AuthActionTypes>
type AppAction = ThunkAction<void, typeof RootReducer, void, AuthActionTypes>

export const isLoading = (): AppAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: IS_LOADING
  })
}

export const checkAuthenticated =
  (): AppAction => async (dispatch: AppDispatch) => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }

      const body = JSON.stringify({ token: localStorage.getItem('access') })

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
          body,
          config
        )

        if (res.data.code !== 'token_not_valid') {
          dispatch({
            type: AUTHENTICATED_SUCCESS
          })
        } else {
          dispatch({
            type: AUTHENTICATED_FAIL
          })
        }
      } catch (err) {
        dispatch({
          type: AUTHENTICATED_FAIL
        })
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL
      })
    }
  }

export const load_user = (): AppAction => async (dispatch: AppDispatch) => {
  dispatch({
    type: IS_LOADING
  })

  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json'
      }
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      )

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL
      })
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL
    })
  }
}

export const login =
  (username: string, password: string): AppAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: IS_LOADING
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ username, password })

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
        body,
        config
      )

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })

      dispatch(load_user())
    } catch (error) {
      let errorMessage

      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          errorMessage =
            error.response.data[Object.keys(error.response.data)[0]]
        } else {
          errorMessage = error
        }
      } else {
        errorMessage = error
      }

      dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage
      })
    }
  }

export const signup =
  (
    name: string,
    username: string,
    email: string,
    password: string,
    re_password: string
  ): AppAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: IS_LOADING
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({
      name,
      username,
      email,
      password,
      re_password
    })

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      )

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data
      })
    } catch (error) {
      let errorMessage

      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          errorMessage =
            error.response.data[Object.keys(error.response.data)[0]][0]
        } else {
          errorMessage = error
        }
      } else {
        errorMessage = error
      }

      dispatch({
        type: SIGNUP_FAIL,
        payload: errorMessage
      })
    }
  }

export const verify =
  (uid: string, token: string) => async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({
      uid,
      token
    })

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
        body,
        config
      )

      dispatch({
        type: ACTIVATION_SUCCESS
      })
    } catch (err) {
      dispatch({
        type: ACTIVATION_FAIL
      })
    }
  }

export const reset_password =
  (email: string) => async (dispatch: AppDispatch) => {
    dispatch({
      type: IS_LOADING
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ email })

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
        body,
        config
      )

      dispatch({
        type: PASSWORD_RESET_SUCCESS
      })
    } catch (error) {
      let errorMessage

      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          errorMessage =
            error.response.data[Object.keys(error.response.data)[0]][0]
        } else {
          errorMessage = error
        }
      } else {
        errorMessage = error
      }

      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload: errorMessage
      })
    }
  }

export const reset_password_confirm =
  (uid: string, token: string, new_password: string, re_new_password: string) =>
  async (dispatch: AppDispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password })

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      )

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS
      })
    } catch (error) {
      let errorMessage

      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          errorMessage =
            error.response.data[Object.keys(error.response.data)[0]][0]
        } else {
          errorMessage = error
        }
      } else {
        errorMessage = error
      }

      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        payload: errorMessage
      })
    }
  }

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({
    type: LOGOUT
  })
}
