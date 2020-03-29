import React from 'react'

export const renderField = ({
  input,
  label,
  type,
  meta: {touched, error, warning}
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        className={`form-control ${touched && error ? 'is-invalid' : ''}`}
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span className="invalid-feedback">{error}</span>) ||
          (warning && <span className="invalid-feedback">{warning}</span>))}
    </div>
  </div>
)

export const warn = values => {
  const warnings = {}
  //   if (values.login < 19) {
  //     warnings.login = ''
  //   }
  return warnings
}

export const validate = values => {
  const errors = {}

  // name
  if (!values.name) {
    errors.name = 'Обязательное поле'
  } else if (/[0-9]/.test(values.name)) {
    errors.name = 'Поле не должно содержать цифр'
  } else if (values.name.length < 3) {
    errors.name = 'Имя должно быть более 3 букв!'
  }

  // surname
  if (!values.surname) {
    errors.surname = 'Обязательное поле'
  } else if (/[0-9]/.test(values.surname)) {
    errors.surname = 'Поле не должно содержать цифр'
  } else if (values.surname.length < 3) {
    errors.surname = 'Фамилия должна быть более 3 букв!'
  }

  // login
  if (!values.login) {
    errors.login = 'Обязательное поле'
  } else if (values.login.length < 5) {
    errors.login = 'Логин должен быть более 5 букв!'
  }

  // email
  if (!values.email) {
    errors.email = 'Обязательное поле'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неверный адрес электронной почты'
  }

  // password
  if (!values.password) {
    errors.password = 'Обязательное поле'
  } else if (values.password.length < 4) {
    errors.password = 'Пароль слишком короткий'
  }

  // confirm password
  if (!values.confirm_password) {
    errors.confirm_password = 'Обязательное поле'
  } else if (values.confirm_password.length < 4) {
    errors.confirm_password = 'Пароль слишком короткий'
  }

  // password == confirm pass
  if (
    values.password &&
    values.confirm_password &&
    values.password !== values.confirm_password
  ) {
    errors.password = 'Пароли не совпадают'
    errors.confirm_password = 'Пароли не совпадают'
  }

  return errors
}
