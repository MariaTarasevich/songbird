import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Profile.css'

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const scoreMy = useSelector(state => state.scoreMy)

  const [changeEDit, setChangeEdit] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedSurname, setEditedSurname] = useState('')
  const [editedEmail, setEditedEmail] = useState('')

  const nameInputRef = useRef()
  const surnameInputRef = useRef()
  const emailInputRef = useRef()
  console.log(editedName)

  const saveInputValues = () => {
    setEditedName(nameInputRef.current.value)
    setEditedSurname(surnameInputRef.current.value)
    setEditedEmail(emailInputRef.current.value)
  }

  const editItems = () => {
    setChangeEdit(true)
  }

  const saveItems = () => {
    setChangeEdit(false)
  }

  return (
    <div className="profile__wrap">
      <div className='profile__container'>
        <div className='profile__credentials'>
          <h1 className="profile__title">Credentials</h1>
          <div className='profile__circle'>{userData.name[0]}</div>
          <div className='profile__names'>
          <p className="profile__item profile__name">Name: {changeEDit ? <input ref={nameInputRef} type='text' /> : <span className="profile__item-data">{editedName.length > 0 ? editedName : userData.name} </span> }</p>
          <p className="profile__item">Surname: {changeEDit ? <input ref={surnameInputRef} type='text' /> : <span className="profile__item-data">{editedSurname.length > 0 ? editedSurname : userData.secondName} </span> }</p>
          </div>
        <div className='profile__additional-data'>
          <p className="profile__item profile__email">Email: {changeEDit ? <input ref={emailInputRef} type='text' /> : <span className="profile__item-data">{editedEmail.length > 0 ? editedEmail : userData.email} </span> }</p>
          <p className="profile__item">Score: <span className="profile__item-data">{scoreMy}</span></p>
        </div>
        <div className='profile__btns'>
          <NavLink to='/' className='header__link'>Back</NavLink>
          <NavLink to='/signup' className='header__link'>Sign Out</NavLink>
          {changeEDit ? <button onClick={() => { saveItems(); saveInputValues(); console.log(editedName, 'ghjjhgjhgj') }} className='header__link'>Save</button> : <button onClick={() => { editItems(); console.log(changeEDit) }} className='header__link'>Edit</button> }
        </div>
        </div>

      </div>
    </div>
  )
}
