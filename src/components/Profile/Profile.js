import React, {useState} from 'react'
import {connect} from 'react-redux'
import {checkingUser, setStatus} from './../../redux/Auth/authReducer'

function Profile(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const sendStatus = () => {
    setIsEditing(false)
    props.setStatus(inputValue, localStorage.getItem('authId'))
  }

  const inputHandler = e => {
    setInputValue(e.target.value)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <img
              src={props.userInfo.avatar}
              className="card-img-top"
              alt={props.userInfo.name}
            />
            <div className="card-body">
              <button className="btn btn-secondary btn-block">
                Редактировать
              </button>
            </div>
          </div>
        </div>
        <div className="col-8 shadow-sm p-3 bg-white rounded">
          <h2>
            {props.userInfo.name} {props.userInfo.surname}
          </h2>
          <div
            onClick={() => {
              setIsEditing(true)
              setInputValue(props.userInfo.status)
            }}
            style={{cursor: 'pointer'}}
            className="text-secondary"
          >
            {isEditing ? (
              <input
                value={inputValue}
                onChange={inputHandler}
                autoFocus
                onBlur={sendStatus}
                placeholder="Введите статус"
                className="form-control"
              />
            ) : (
              <p>
                {props.userInfo.status
                  ? `${props.userInfo.status}`
                  : 'Изменить статус'}
              </p>
            )}
          </div>
          <hr />
          <div>
            <p>Ваш пол: {props.userInfo.gender}</p>
            <p>Дата регистрации: {props.userInfo.date_registration}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuth: state.authPage.isAuth,
    userInfo: state.authPage.userInfo
  }
}

export default connect(mapStateToProps, {checkingUser, setStatus})(Profile)
