import {profileAPI} from '../../api/api'
import {
  SET_AUTH,
  SET_USER_DATA,
  SET_MESSAGE,
  SET_LOGIN_LOADER,
  SET_REGISTERED
} from '../types.js'
import {checkingUser} from '../Profile/profileReducer'

const initialState = {
  isAuth: false,
  role: '',
  message: '',
  isFetching: false,
  registered: false
}

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH: {
      return {...state, isAuth: action.auth}
    }
    case SET_MESSAGE: {
      return {
        ...state,
        message: action.message
      }
    }
    case SET_USER_DATA: {
      return {
        ...state,
        role: action.data.role,
        message: action.data.message,
        isAuth: true
      }
    }
    case SET_LOGIN_LOADER: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case SET_REGISTERED: {
      return {
        ...state,
        registered: action.registered
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
export const setLoader = isFetching => ({
  type: SET_LOGIN_LOADER,
  isFetching
})

export const setMessageAC = message => ({
  type: SET_MESSAGE,
  message
})

export const setRegistered = registered => ({
  type: SET_REGISTERED,
  registered
})

export const setMessage = message => dispatch => {
  dispatch(setMessageAC(message))
  dispatch(setAuth(false))
}

export const register = values => dispatch => {
  dispatch(setLoader(true))
  return profileAPI
    .registration(
      values.name,
      values.surname,
      values.login,
      values.email,
      values.password,
      values.sex
    )
    .then(({data}) => {
      dispatch(setMessageAC(data.message))

      dispatch(setLoader(false))
      if (data.message === 'Вы успешно зарегистрировались') {
        dispatch(setRegistered(true))
      }
    })
}

export const auth = values => dispatch => {
  dispatch(setLoader(true))
  profileAPI
    .authMe(values.login, values.password)
    .then(({data}) => {
      dispatch(setUserData(data))
      dispatch(setLoader(false))
      if (data.id !== null) {
        dispatch(setAuth(true))
        localStorage.setItem('authId', data.id)
      } else {
        dispatch(setAuth(false))
      }
    })
    .then(() => dispatch(checkingUser(localStorage.getItem('authId'))))
}
