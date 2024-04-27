import {
  Error,
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT,
  Profile,
  IS_LOADING
} from '../actions/types'

interface AuthState {
  access: string | null
  refresh: string | null
  isAuthenticated: boolean | null
  profile: Profile | null
  type: string | null
  error: Error | null
}

const initialState: AuthState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  profile: null,
  type: null,
  error: null
}

export default function (state = initialState, action: AuthActionTypes) {
  const { type } = action

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        type: action.type
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('access', action.payload.access)
      return {
        ...state,
        isAuthenticated: true,
        access: action.payload.access,
        refresh: action.payload.refresh,
        type: action.type
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        type: action.type
      }
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        type: action.type
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        type: action.type
      }
    case USER_LOADED_FAIL:
      return {
        ...state,
        profile: null,
        type: action.type
      }
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        profile: null,
        type: action.type,
        error: action.payload
      }
    case LOGOUT:
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        profile: null,
        type: action.type
      }
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        type: action.type,
        error: action.payload
      }
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
    case IS_LOADING:
      return {
        ...state,
        type: action.type
      }
    default:
      return state
  }
}
