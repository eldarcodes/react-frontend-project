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
    props.message === 'Вы успешно вошли' ||
    props.message === 'Вы успешно зарегистрировались'
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
      <div className="form-group d-flex">
        <label className="mr-3">Ваш пол</label>
        <div>
          <div className="custom-control custom-radio">
            <Field
              type="radio"
              id="customRadio1"
              className="custom-control-input"
              component="input"
              value="Мужской"
              name="sex"
            />
            <label className="custom-control-label" htmlFor="customRadio1">
              Мужской
            </label>
          </div>
          <div>
            <div className="custom-control custom-radio">
              <Field
                type="radio"
                id="customRadio2"
                className="custom-control-input"
                component="input"
                value="Женский"
                name="sex"
              />
              <label className="custom-control-label" htmlFor="customRadio2">
                Женский
              </label>
            </div>
          </div>
        </div>
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
        {props.isFetching ? (
          <button className="btn btn-primary mt-3" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
            Загрузка...
          </button>
        ) : (
          <button
            disabled={pristine || submitting}
            className="text-center btn-primary mt-3 btn text-white"
            type="submit"
          >
            Зарегистрироваться
          </button>
        )}

        <button
          disabled={pristine || submitting}
          className="text-center btn-outline-primary mt-3 btn ml-3"
          onClick={reset}
        >
          Очистить поля
        </button>
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
    message: state.authPage.message,
    isFetching: state.authPage.isFetching
  }
}

export default connect(mapStateToProps, {register})(Registration)
