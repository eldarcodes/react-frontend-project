import {combineReducers} from 'redux'
import {postsReducer} from './Posts/postsReducer'
import {authReducer} from './Auth/authReducer'
import {reducer as formReducer} from 'redux-form'
import { profileReducer } from './Profile/profileReducer';

const rootReducer = combineReducers({
  postsPage: postsReducer,
  authPage: authReducer,
  profilePage: profileReducer,
  form: formReducer
})

export default rootReducer
