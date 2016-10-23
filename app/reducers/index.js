import { combineReducers } from 'redux'
import messages from './messages'
import auth from './auth'
import home from './home'

export default combineReducers({
  messages,
  auth,
  home
})
