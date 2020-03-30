import {profileAPI} from '../../api/api'
import {SET_AUTH, SET_USER_DATA, SET_MESSAGE, SET_USER_INFO} from '../types.js'
import md5 from 'md5'

const initialState = {
  isAuth: false,
  id: null,
  role: '',
  message: '',
  userInfo: {
    name: '',
    surname: '',
    gender: '',
    email: '',
    date_registration: null
  }
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH: {
      return {...state, isAuth: action.auth}
    }
    case SET_USER_DATA: {
      return {
        ...state,
        id: action.data.id,
        role: action.data.role,
        message: action.data.message,
        isAuth: true
      }
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: {
          name: action.data.info.name,
          surname: action.data.info.surname,
          gender: action.data.info.gender,
          email: action.data.info.email,
          date_registration: action.data.info.date_registration
        }
      }
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: action.message
      }
    }
    default:
      return state
  }
}

export const setAuth = auth => ({type: SET_AUTH, auth})
export const setUserData = data => ({
  type: SET_USER_DATA,
  data
})
export const setUserInfo = data => ({
  type: SET_USER_INFO,
  data
})
export const setMessageAC = message => ({
  type: SET_MESSAGE,
  message
})

export const register = values => dispatch => {
  profileAPI
    .registration(
      values.name,
      values.surname,
      values.login,
      values.email,
      values.password
    )
    .then(({data}) => {
      dispatch(setMessageAC(data.message))
    })
}

export const checkingUser = userId => dispatch => {
  profileAPI.isUserAuth(userId).then(({data}) => {
    if (data.message) {
      dispatch(setAuth(true))
      dispatch(setUserInfo(data))
      dispatch(setMessageAC(data.message))
    }
  })
}

export const auth = values => dispatch => {
  profileAPI.authMe(values.login, values.password).then(({data}) => {
    dispatch(setUserData(data))
    if (data.id !== null) {
      dispatch(setAuth(true))
      localStorage.setItem('authId', md5(data.id))
    } else {
      dispatch(setAuth(false))
    }
  })
}

export const setMessage = message => dispatch => {
  dispatch(setMessageAC(message))
  dispatch(setAuth(false))
}
