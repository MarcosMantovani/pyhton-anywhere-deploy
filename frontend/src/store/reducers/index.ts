import { combineReducers } from 'redux'

import auth from './auth'

const RootReducer = combineReducers({
  auth
})

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer
