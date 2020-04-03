import React from 'react'
import NavBar from './components/NavBar'
import PostsContainer from './components/Posts/PostsContainer'
import {Route, withRouter} from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import Profile from './components/Profile/Profile'
import Loader from './components/common/Loader'
import {initialize} from './redux/Profile/profileReducer'
import {connect} from 'react-redux'
import {compose} from 'redux'

class App extends React.Component {
  componentDidMount() {
    this.props.initialize()
  }

  render() {
    return (
      <>
        {this.props.initialized ? (
          <div>
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
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{height: '90vh'}}
          >
            <Loader width="100px" height="100px" />
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  initialized: state.profilePage.initialized
})

export default compose(withRouter, connect(mapStateToProps, {initialize}))(App)
