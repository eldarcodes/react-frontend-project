import React from 'react'
import {connect} from 'react-redux'
import {checkingUser, setStatus} from './../../redux/Profile/profileReducer'
import {NavLink, Route} from 'react-router-dom'
import ProfileHead from './ProfileHead'
import {ProfileEditReduxForm} from './ProfileEdit'

function Profile(props) {
  const onSubmit = values => {
    console.log(values)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <Route exact path="/profile">
              <img
                src={props.userInfo.avatar}
                className="card-img-top"
                alt={props.userInfo.name}
              />
            </Route>
            <Route path="/profile/edit">
              <img
                src={`../${props.userInfo.avatar}`}
                className="card-img-top"
                alt={props.userInfo.name}
              />
            </Route>
            <div className="card-body">
              <Route path="/profile/edit">
                <NavLink
                  to="/profile/edit"
                  className="btn btn-secondary btn-block"
                >
                  Изменить аватар
                </NavLink>
              </Route>
              <Route exact path="/profile">
                <NavLink
                  to="/profile/edit"
                  className="btn btn-secondary btn-block"
                >
                  Редактировать профиль
                </NavLink>
              </Route>
            </div>
          </div>
        </div>
        <div className="col-8 shadow-sm p-3 bg-white rounded">
          <ProfileHead {...props} />
          <Route path="/profile" exact>
            <div>
              <p>Ваш пол: {props.userInfo.gender}</p>
              <p>Дата регистрации: {props.userInfo.date_registration}</p>
            </div>
          </Route>
          <Route path="/profile/edit">
            <ProfileEditReduxForm {...props} onSubmit={onSubmit} />
          </Route>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.authPage.isAuth,
    userInfo: state.profilePage.userInfo,
    id: state.profilePage.id
  }
}

export default connect(mapStateToProps, {checkingUser, setStatus})(Profile)
