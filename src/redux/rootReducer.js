import {combineReducers} from 'redux'
import {postsReducer} from './Posts/postsReducer'
import {authReducer} from './Auth/authReducer'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  postsPage: postsReducer,
  authPage: authReducer,
  form: formReducer
})
export default rootReducer
