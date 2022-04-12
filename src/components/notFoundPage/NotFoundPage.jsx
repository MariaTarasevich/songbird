import React from 'react'
import Lottie from 'lottie-react'
import notFoundPic from './../../img/notFoudPic.json'

import './NotFoundPage.css'

export const NotFoundPage = () => {
  return (
    <div className="not-found__wrap">
      <h1 className="not-found__title">Как Вы сюда попали?</h1>
      <h3 className="not-found__subtitle">
        К сожалению, такой страницы не найдено
      </h3>
      <Lottie animationData={notFoundPic} loop/>
    </div>
  )
}
