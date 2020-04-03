import {profileAPI} from '../../api/api'
import {SET_USER_INFO, SET_STATUS, SET_INITIALIZE} from '../types.js'
import {setAuth, setMessageAC} from '../Auth/authReducer'

const initialState = {
  initialized: false,
  id: '',
  userInfo: {
    name: '',
    surname: '',
    gender: '',
    email: '',
    date_registration: null,
    avatar: '',
    status: '',
    city: ''
  }
}

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO: {
      return {
        ...state,
        id: action.data.info.id,
        userInfo: {
          name: action.data.info.name,
          surname: action.data.info.surname,
          gender: action.data.info.gender,
          email: action.data.info.email,
          date_registration: action.data.info.date_registration,
          avatar: action.data.info.avatar,
          status: action.data.info.status,
          city: action.data.info.city
        }
      }
    }

    case SET_STATUS: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          status: action.status
        }
      }
    }
    case SET_INITIALIZE: {
      return {
        ...state,
        initialized: true
      }
    }

    default:
      return state
  }
}

export const setUserInfo = data => ({
  type: SET_USER_INFO,
  data
})

export const setStatusAC = status => ({
  type: SET_STATUS,
  status
})
export const setInitialize = () => ({
  type: SET_INITIALIZE
})

export const checkingUser = userId => dispatch => {
  return profileAPI.isUserAuth(userId).then(({data}) => {
    if (data.message) {
      dispatch(setUserInfo(data))
      dispatch(setAuth(true))
      dispatch(setMessageAC(data.message))
    }
  })
}

export const setStatus = (status, id) => dispatch => {
  profileAPI.setStatusAPI(status, id).then(() => {
    dispatch(setStatusAC(status))
  })
}

export const initialize = () => dispatch => {
  let promise = dispatch(checkingUser(localStorage.getItem('authId')))

  promise.then(() => dispatch(setInitialize()))
}
