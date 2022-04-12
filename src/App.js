import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { SignIn } from './components/signIn/SignIn'
import { SignUp } from './components/signUp/SignUp'
import { QuizModule } from './components/quizModule/QuizModule.jsx'
import { NotFoundPage } from './components/notFoundPage/NotFoundPage.jsx'

import './App.css'
import { Profile } from './components/profile/Profile'

function App () {
  return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<QuizModule />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
  )
}

export default App
