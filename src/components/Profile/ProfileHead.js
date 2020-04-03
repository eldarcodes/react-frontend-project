import React, {useState} from 'react'

export default function ProfileHead(props) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const oldStatus = props.userInfo.status

  const sendStatus = () => {
    setIsEditing(false)

    if (oldStatus !== inputValue) {
      props.setStatus(inputValue, localStorage.getItem('authId'))
    }
  }

  const inputHandler = e => {
    setInputValue(e.target.value)
  }

  return (
    <div>
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
    </div>
  )
}
