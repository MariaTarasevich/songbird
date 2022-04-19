import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Formik } from 'formik'

import './SignIn.css'

const initialValues = {
  email: '',
  password: ''
}

const validate = (values) => {
  const errors = {}
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  if (!values.email) {
    errors.email = 'Email is required'
  } else if (!regex.test(values.email)) {
    errors.email = 'Invalid Email'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 4) {
    errors.password = 'Password too short'
  }
  return errors
}

const submitForm = (values) => {
  console.log(values)
}

export const SignIn = () => {
  const dispatch = useDispatch()
  const handleProfile = useSelector(state => state.handleProfile)
  console.log(handleProfile)

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(fields) => {
        submitForm(); dispatch({ type: 'HANDLE_PROFILE' }); if (localStorage.getItem('user')) {
          localStorage.clear()
          localStorage.setItem('user', JSON.stringify(fields))
        } else {
          localStorage.setItem('user', JSON.stringify(fields))
        }
      }}
    >
      {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty
        } = formik
        return (
          <div className='sign-in__wrap'>
          <div className='sign-in__wrap-content sign-in__all-content'>
        <div className='sign-in__wrap-welcome'>
          <h2 className='sign-in__title-welcome'>Welcome back to the quiz!</h2>
        </div>
            <div className="sign-in__container">
              <h1>Sign in to the quiz</h1>
              <p className='sign-in__switch-page'>Don`t have a profile yet? <NavLink to='/signup' className='header__link'>Sign Out</NavLink></p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? 'input-error' : null
                    }
                  />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? 'input-error' : null
                    }
                  />
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`sign-in__btn ${
                    dirty && isValid ? '' : 'disabled-btn'
                  }`}
                  disabled={!(dirty && isValid)}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
          </div>
        )
      }}
    </Formik>
  )
}
