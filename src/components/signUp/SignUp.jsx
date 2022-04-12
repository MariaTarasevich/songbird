import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import '../signIn/SignIn.css'

export const SignUp = () => {
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    secondName: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
    confirmEmail: yup.string().email('Введите верный email').oneOf([yup.ref('email')], 'Email не совпадают').required('Обязательно')
  })

  return (
      <div className='sign-in__wrap'>
    <div className="sign-in__container">
    <h1>Sign up to the quiz</h1>
      <Formik
        initialValues={{
          name: '',
          secondName: '',
          password: '',
          confirmPassword: '',
          email: '',
          confirmEmail: ''
        }}
        validateOnBlur
        validationSchema={validationsSchema}
        onSubmit={values => {
          if (localStorage.getItem('user')) {
            localStorage.clear()
            localStorage.setItem('user', JSON.stringify(values))
          } else {
            localStorage.setItem('user', JSON.stringify(values))
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <div className={'from'}>
            <p>
              <label htmlFor={'name'}>Name</label><br />
              <input
                className={'input'}
                type={'text'}
                name={'name'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </p>
            {touched.name && errors.name && <p className={'error'}>{errors.name}</p>}
            <p>
              <label htmlFor={'secondName'}>Surname</label><br />
              <input
                className={'input'}
                type={'text'}
                name={'secondName'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.secondName}
              />
            </p>
            {touched.secondName && errors.secondName && <p className={'error'}>{errors.secondName}</p>}
            <p>
              <label htmlFor={'secondName'}>Password</label><br />
              <input
                className={'input'}
                type={'password'}
                name={'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </p>
            {touched.password && errors.password && <p className={'error'}>{errors.password}</p>}

            <p>
              <label htmlFor={'confirmPassword'}>Confirm password</label><br />
              <input
                className={'input'}
                type={'password'}
                name={'confirmPassword'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
            </p>
            {touched.confirmPassword && errors.confirmPassword && <p className={'error'}>{errors.confirmPassword}</p>}

            <p>
              <label htmlFor={'email'}>Email</label><br />
              <input
                className={'input'}
                type={'email'}
                name={'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </p>
            {touched.email && errors.email && <p className={'error'}>{errors.email}</p>}

            <p>
              <label htmlFor={'confirmEmail'}>Confirm email</label><br />
              <input
                className={'input'}
                type={'email'}
                name={'confirmEmail'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmEmail}
              />
            </p>
            {touched.confirmEmail && errors.confirmEmail && <p className={'error'}>{errors.confirmEmail}</p>}

            <button
              disabled={!isValid || !dirty}
              className={`sign-in__btn ${
                dirty && isValid ? '' : 'disabled-btn'
              }`}
              onClick={handleSubmit}
              type={'submit'}
            >Sign Up</button>
          </div>
        )}
      </Formik>
    </div>
    </div>
  )
}
