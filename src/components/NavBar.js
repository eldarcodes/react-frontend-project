import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {checkingUser} from '../redux/Profile/profileReducer'
import {setMessage} from './../redux/Auth/authReducer'

function NavBar({isAuth, id, userInfo, checkingUser, setMessage}) {
  const logout = () => {
    localStorage.removeItem('authId')
    setMessage('')
  }
  return (
    <header>
      <div className="bg-white border-bottom shadow-sm p-3 px-md-4 mb-3">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center ">
            <NavLink
              className="my-0 mr-md-auto font-weight-normal text-decoration-none"
              to={`${isAuth ? '/profile' : '/'}`}
              exact
              style={{fontSize: 20}}
            >
              {isAuth ? `${userInfo.name} ${userInfo.surname}` : 'MyWebSite'}
            </NavLink>
            {isAuth ? (
              <div>
                <NavLink
                  activeClassName=""
                  to="/"
                  className="btn btn-outline-primary mr-2"
                >
                  Посты
                </NavLink>
                <NavLink
                  activeClassName=""
                  to="/login"
                  onClick={logout}
                  className="btn btn-outline-primary"
                >
                  Выйти
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink
                  activeClassName=""
                  to="/login"
                  className="btn btn-outline-primary"
                >
                  Войти
                </NavLink>
                <NavLink
                  to="/registration"
                  className="btn btn-primary ml-2 text-white"
                >
                  Зарегистрироваться
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.authPage.isAuth,
    id: state.profilePage.id,
    userInfo: state.profilePage.userInfo
  }
}

export default connect(mapStateToProps, {checkingUser, setMessage})(NavBar)
