import {postsAPI} from './../../api/api'
import {SET_POSTS} from '../types.js'

const initialState = {
  posts: []
}

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS: {
      return {...state, posts: action.posts}
    }
    default:
      return state
  }
}

export const setPosts = posts => ({type: SET_POSTS, posts})

export const getPosts = () => dispatch => {
  postsAPI.getPosts().then(({data}) => {
    if (typeof data !== 'string') {
      dispatch(setPosts(data))
    }
  })
}
