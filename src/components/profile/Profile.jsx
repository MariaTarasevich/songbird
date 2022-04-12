import React from 'react'

export const Profile = () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const score = JSON.parse(localStorage.getItem('score'))
  console.log(userData)
  return (
    <div className="profile__wrap">
      <h1 className="profile__title">Credentials</h1>
      <p className="profile__item">Name: <span className="profile__item-data">{userData.name}</span></p>
      <p className="profile__item">Surname: <span className="profile__item-data">{userData.secondName}</span></p>
      <p className="profile__item">Email: <span className="profile__item-data">{userData.email}</span></p>
      <p className="profile__item">Score: <span className="profile__item-data">{score}</span></p>
    </div>
  )
}
