import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {register} from './../redux/Auth/authReducer'
import {Field, reduxForm} from 'redux-form'
import {warn, renderField, validate} from './common/validate'
import {NavLink, Redirect} from 'react-router-dom'

function Registration(props) {
  useEffect(() => {
    document.title = 'Регистрация'
  }, [])

  if (
    props.message === 'Вы успешно зарегистрировались' ||
    props.message === 'Вы успешно вошли'
  ) {
    return <Redirect to="/login" />
  }

  const onSubmit = values => {
    props.register(values)
  }
  return (
    <div className="container">
      <section className="form-auth flex-column">
        <div className="form-auth-inner shadow p-5 bg-white rounded">
          <h3>Регистрация</h3>
          <RegistrationReduxForm {...props} onSubmit={onSubmit} />
        </div>
      </section>
      <div className="registration shadow bg-white rounded text-dark d-flex justify-content-center mt-4 p-4">
        <p className="m-0">Есть аккаунт?</p>
        <NavLink to="/login" type="submit" className="text-primary ml-1">
          Вход
        </NavLink>
      </div>
    </div>
  )
}

const RegistrationForm = props => {
  const {pristine, reset, submitting} = props
  return (
    <form method="POST" onSubmit={props.handleSubmit}>
      <div className="form-group row">
        <div className="col">
          <Field
            component={renderField}
            name="name"
            placeholder="Имя"
            className="form-control error"
            label="Введите ваше имя"
          />
        </div>
        <div className="col">
          <Field
            component={renderField}
            name="surname"
            placeholder="Фамилия"
            label="Введите вашу фамилию"
          />
        </div>
      </div>

      <div className="form-group">
        <Field
          component={renderField}
          name="login"
          placeholder="Логин"
          label="Введите логин"
        />
      </div>
      <div className="form-group">
        <Field
          component={renderField}
          name="email"
          placeholder="Почта"
          type="email"
          label="Введите вашу почту"
        />
      </div>
      <div className="form-group">
        <Field
          component={renderField}
          name="password"
          placeholder="Пароль"
          type="password"
          label="Введите пароль"
        />
      </div>
      <div className="form-group">
        <Field
          component={renderField}
          name="confirm_password"
          placeholder="Подтвердите пароль"
          type="password"
          label="Подтвердите пароль"
        />
        <button
          disabled={pristine || submitting}
          className="text-center btn-primary mt-3 btn text-white reg-button"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <button
          disabled={pristine || submitting}
          className="text-center btn-outline-primary mt-3 btn reg-button ml-3"
          onClick={reset}
        >
          Очистить поля
        </button>
        {props.message && (
          <div
            class={`mt-3 alert alert-${
              props.message === 'Вы успешно зарегистрировались'
                ? 'success'
                : 'danger'
            }`}
            role="alert"
          >
            {props.message}
          </div>
        )}
      </div>
    </form>
  )
}

const RegistrationReduxForm = reduxForm({
  form: 'registration',
  warn,
  validate
})(RegistrationForm)

const mapStateToProps = state => {
  return {
    message: state.authPage.message
  }
}

export default connect(mapStateToProps, {register})(Registration)
