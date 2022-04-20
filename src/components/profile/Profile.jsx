import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Profile.css'

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const scoreMy = useSelector(state => state.scoreMy)

  return (
    <div className="profile__wrap">
      <div className='profile__container'>
        <div className='profile__credentials'>
          <h1 className="profile__title">Credentials</h1>
          <div className='profile__circle'>{userData.name[0]}</div>
          <div className='profile__names'>
          <p className="profile__item profile__name">Name: <span className="profile__item-data">{userData.name}</span></p>
          <p className="profile__item">Surname: <span className="profile__item-data">{userData.secondName}</span></p>
          </div>
        <div className='profile__additional-data'>
          <p className="profile__item profile__email">Email: <span className="profile__item-data">{userData.email}</span></p>
          <p className="profile__item">Score: <span className="profile__item-data">{scoreMy}</span></p>
        </div>
        <div className='profile__btns'>
          <NavLink to='/' className='header__link'>Back</NavLink>
          <NavLink to='/signup' className='header__link'>Sign Out</NavLink>
        </div>
        </div>

      </div>
    </div>
  )
}
