import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Profile.css'

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const scoreMy = useSelector(state => state.scoreMy)

  const [changeEDit, setChangeEdit] = useState(false)

  const nameInputRef = useRef()
  const surnameInputRef = useRef()
  const emailInputRef = useRef()

  const editItems = () => {
    setChangeEdit(true)
  }

  const saveItems = () => {
    setChangeEdit(false)
  }

  const editedDataToLocalStorage = () => {
    localStorage.setItem('editedName', JSON.stringify(nameInputRef.current.value))
    localStorage.setItem('editedSurname', JSON.stringify(surnameInputRef.current.value))
    localStorage.setItem('editedEmail', JSON.stringify(emailInputRef.current.value))
  }

  return (
    <div className="profile__wrap">
      <div className='profile__container'>
        <div className='profile__credentials'>
          <h1 className="profile__title">Credentials</h1>
          <div className='profile__circle'>{userData.name[0]}</div>
          <div className='profile__names'>
          <p className="profile__item profile__name">Name: {changeEDit ? <input ref={nameInputRef} type='text' /> : <span className="profile__item-data">{localStorage.getItem('editedName') ? localStorage.getItem('editedName') : userData.name} </span> }</p>
          <p className="profile__item">Surname: {changeEDit ? <input ref={surnameInputRef} type='text' /> : <span className="profile__item-data">{localStorage.getItem('editedSurname') ? localStorage.getItem('editedSurname') : userData.secondName} </span> }</p>
          </div>
        <div className='profile__additional-data'>
          <p className="profile__item profile__email">Email: {changeEDit ? <input ref={emailInputRef} type='text' /> : <span className="profile__item-data">{localStorage.getItem('editedEmail') ? localStorage.getItem('editedEmail') : userData.email} </span> }</p>
          <p className="profile__item">Score: <span className="profile__item-data">{scoreMy}</span></p>
        </div>
        <div className='profile__btns'>
          <NavLink to='/' className='header__link'>Back</NavLink>
          <NavLink to='/signup' className='header__link'>Sign Out</NavLink>
          {changeEDit ? <button onClick={() => { saveItems(); editedDataToLocalStorage() }} className='header__link profile__edit-btn'>Save</button> : <button onClick={() => { editItems(); console.log(changeEDit) }} className='header__link profile__edit-btn'>Edit</button> }
        </div>
        </div>

      </div>
    </div>
  )
}
