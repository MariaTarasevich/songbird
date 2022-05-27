import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.css'

export const Header = ({ scoreMy }) => {
  localStorage.setItem('score', scoreMy)
  return (
    <div className="header">
      <div className="header__logo"></div>
      <div className='header__credentials-wrap'>
        <h3 className="header__score-wrap">
          Score: <span className="header__score">{scoreMy}</span>
        </h3>
        {localStorage.getItem('signedup') && !localStorage.getItem('user') && <NavLink to='/signin' className='header__link'>Sign In</NavLink>}
        {!localStorage.getItem('signedup') && !localStorage.getItem('user') && <NavLink to='/signup' className='header__link'>Sign Up</NavLink>}
        {localStorage.getItem('user') && <NavLink to='/profile' className='header__link'>Profile</NavLink>}
        {localStorage.getItem('user') && <NavLink to='/signup' className='header__link'>Sign Out</NavLink>}
      </div>
    </div>
  )
}
