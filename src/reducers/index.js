import {combineReducers} from 'redux'
import authedUser from './authedUser'
import { loadingBarReducer } from 'react-redux-loading'
import users from './users';
import questions from './questions';
import viewMode from './viewModes';

export default combineReducers({
  authedUser,
  users,
  questions,
  viewMode,
  loadingBar: loadingBarReducer,
})