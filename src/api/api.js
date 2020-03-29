import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'http://backend'
})

export const postsAPI = {
  getPosts() {
    return instance.get(`/main/`)
  }
}

export const profileAPI = {
  registration(name, surname, login, email, password) {
    return instance.post(`/registration`, {
      name,
      surname,
      login,
      email,
      password
    })
  },
  authMe(login, password) {
    return instance.post(`/auth`, {
      login,
      password
    })
  },
  isUserAuth(userId) {
    return instance.post(`/checking`, {
      id: userId
    })
  }
}
