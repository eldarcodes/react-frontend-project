import React, {useState, useEffect} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {auth, setMessageAC} from './../redux/Auth/authReducer'
import {checkingUser} from '../redux/Profile/profileReducer'
import {validate, renderField} from './common/validate'

function Login(props) {
  useEffect(() => {
    document.title = 'Вход'
  }, [])

  props.setMessageAC('')

  if (props.message === 'Вы успешно вошли') {
    return <Redirect to="/" />
  }

  const onSubmit = values => {
    props.auth(values)
  }

  return (
    <section
      className="form-auth flex-column container"
      style={{width: 450, marginTop: 200}}
    >
      <LoginReduxForm {...props} onSubmit={onSubmit} />
    </section>
  )
}

const LoginForm = props => {
  const {submitting, pristine} = props
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-auth-inner shadow p-4 bg-white rounded">
        <div className="form-group">
          <Field
            name="login"
            component={renderField}
            type="text"
            className="form-control"
            id="login"
            label="Введите логин"
          />
        </div>
        <div className="form-group">
          <div className="input-group">
            <div style={{width: 275}}>
              <Field
                name="password"
                component={renderField}
                type={`${showPassword ? 'text' : 'password'}`}
                className="form-control"
                label="Введите пароль"
              />
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={{
                height: 38,
                margin: '32px 0 0 5px',
                cursor: 'pointer'
              }}
              className="input-group-append "
            >
              <div
                style={{
                  padding: `${showPassword ? '0 18px' : '0 11px'}`,
                  userSelect: 'none'
                }}
                className="input-group-text"
              >
                {showPassword ? 'Скрыть' : 'Показать'}
              </div>
            </div>
          </div>
        </div>

        {props.message && (
          <div
            className={`mt-3 alert alert-${
              props.message === 'Вы успешно зарегистрировались'
                ? 'success'
                : 'danger'
            }`}
            role="alert"
          >
            {props.message}
          </div>
        )}
        {!props.isFetching ? (
          <button
            disabled={pristine || submitting}
            type="submit"
            className="btn btn-primary btn-block pt-2 pb-2"
          >
            Войти
          </button>
        ) : (
          <button class="btn btn-primary btn-block" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
            Загрузка...
          </button>
        )}
      </div>
      <div className="registration shadow bg-white rounded text-dark d-flex justify-content-center mt-4 p-3">
        <p className="m-0">Нет аккаунта?</p>
        <NavLink to="/registration" type="submit" className="text-primary ml-1">
          Зарегистрироваться
        </NavLink>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login',
  validate
})(LoginForm)

const mapStateToProps = state => {
  return {
    isAuth: state.authPage.isAuth,
    id: state.authPage.id,
    role: state.authPage.role,
    message: state.authPage.message,
    isFetching: state.authPage.isFetching,
    registered: state.authPage.registered
  }
}

export default connect(mapStateToProps, {auth, checkingUser, setMessageAC})(
  Login
)
