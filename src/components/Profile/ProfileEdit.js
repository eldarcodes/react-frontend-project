import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {validate, SelectField, renderEditProfile} from './../common/validate'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

let ProfileEditForm = props => {
  let day = []
  let year = []
  let month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  let monthValue = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ]
  const setDate = () => {
    const date = new Date()
    for (let i = 1; i < 32; i++) {
      day.push(i)
    }
    for (let i = date.getFullYear(); i >= 1920; i--) {
      year.push(i)
    }
  }
  setDate()

  const {submitting, pristine} = props
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group d-flex align-items-center">
        <label className="col-4 m-0">Имя: </label>
        <div className="col-8">
          <Field
            component={renderEditProfile}
            type="text"
            className="form-control"
            name="user_name"
          />
        </div>
      </div>
      <div className="form-group d-flex align-items-center">
        <label className="col-4 m-0">Фамилия:</label>
        <div className="col-8">
          <Field
            component={renderEditProfile}
            className="form-control"
            name="user_surname"
          />
        </div>
      </div>
      <div className="form-group d-flex align-items-center">
        <label className="col-4 m-0">Родной город:</label>
        <div className="col-8">
          <Field
            component={renderEditProfile}
            className="custom-select"
            name="city"
          />
        </div>
      </div>
      <div className="form-group d-flex align-items-center">
        <label className="col-4 m-0">Семейное положение:</label>
        <div className="col-8">
          <Field
            component="select"
            className="custom-select mt-2"
            name="family_status"
          >
            <option value="Не женат">Не женат</option>
            <option value="В активном поиске">В активном поиске</option>

            <option value="Встречаюсь">Встречаюсь</option>
            <option value="Влюблен">Влюблен</option>
            <option value="Всё сложно">Всё сложно</option>
          </Field>
        </div>
      </div>

      <div style={{padding: '0 15px'}} className="form-group">
        <label>День рождения:</label>
        <div className="row">
          <div className="col-3">
            <Field component={SelectField} name="day">
              {day.map(date => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </Field>
          </div>
          <div className="col-6">
            <Field
              component={SelectField}
              className="custom-select"
              name="month"
            >
              {month.map((date, i) => (
                <option value={monthValue[i]} key={date}>
                  {date}
                </option>
              ))}
            </Field>
          </div>
          <div className="col-3">
            <Field
              component={SelectField}
              className="custom-select"
              name="year"
            >
              {year.map(date => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </Field>
          </div>
        </div>
        {/* <Field
          component="select"
          className="custom-select mt-2"
          name="showDate"
        >
          <option value="Не показывать дату рождения">
            Не показывать дату рождения
          </option>
          <option value="Показывать дату рождения">
            Показывать дату рождения
          </option>
          <option value="Показывать только месяц и день">
            Показывать только месяц и день
          </option>
        </Field> */}
      </div>
      <div style={{padding: '0 15px'}}>
        <button
          disabled={submitting || pristine}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Сохранить
        </button>
        <div className="text-right">
          <NavLink
            to="/profile"
            exact
            className="btn btn-outline-secondary mt-2"
          >
            Отменить
          </NavLink>
        </div>
      </div>
    </form>
  )
}

export let ProfileEditReduxForm = reduxForm({
  form: 'profileEdit',
  validate
})(ProfileEditForm)

ProfileEditReduxForm = connect(state => {
  return {
    initialValues: {
      user_name: state.profilePage.userInfo.name,
      user_surname: state.profilePage.userInfo.surname,
      city: state.profilePage.userInfo.city,
      family_status: 'Всё сложно',
      day: '29',
      month: 'Ноября',
      year: '2000'
    }
  }
})(ProfileEditReduxForm)
