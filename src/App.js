import React from 'react'
import NavBar from './components/NavBar'
import PostsContainer from './components/Posts/PostsContainer'
import {Route} from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import Profile from './components/Profile/Profile'

function App() {
  return (
    <>
      <NavBar />
      <Route exact path="/">
        <PostsContainer />
      </Route>
      <Route path="/registration">
        <Registration />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </>
  )
}

export default App
