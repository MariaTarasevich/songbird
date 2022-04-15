import React from 'react'

import './Header.css'

export const Header = ({ scoreMy }) => {
  localStorage.setItem('score', scoreMy)
  return (
    <div className="header">
      <div className="header__logo"></div>
      <h3 className="header__score-wrap">
        Score: <span className="header__score">{scoreMy}</span>
      </h3>
    </div>
  )
}
