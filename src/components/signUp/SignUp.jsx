import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import '../signIn/SignIn.css'
import 'react-toastify/dist/ReactToastify.css'

export const SignUp = () => {
  const dispatch = useDispatch()
  const handleProfile = useSelector(state => state.handleProfile)
  const redirectTrigger = useSelector(state => state.redirectTrigger)
  console.log(handleProfile, redirectTrigger)

  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    secondName: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательно'),
    email: yup.string().email('Введите верный email').required('Обязательно'),
    confirmEmail: yup.string().email('Введите верный email').oneOf([yup.ref('email')], 'Email не совпадают').required('Обязательно')
  })

  const notification = () => toast('Success')

  const resetForm = () => {
    const signUpInput = document.querySelectorAll('.signUpInput')
    signUpInput.forEach(function (item) { item.value = '' })
  }

  return (
      <div className='sign-in__wrap'>
        <div className='sign-in__wrap-content'>
      <div className='sign-in__wrap-welcome'>
        <h2 className='sign-in__title-welcome'>Welcome to the quiz!</h2>
      </div>
    <div className="sign-in__container">
    <h1>Sign up to the quiz</h1>
    <p className='sign-in__switch-page'>Already have a profile? <NavLink to='/signin' className='header__link'>Sign In</NavLink></p>
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
      >
                    <Formik
                initialValues={{
                  acceptTerms: false
                }}
                validationSchema={yup.object().shape({
                  acceptTerms: yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
                })}
                onSubmit={fields => {
                  dispatch({ type: 'HANDLE_PROFILE' })
                  if (localStorage.getItem('user')) {
                    localStorage.clear()
                    localStorage.setItem('user', JSON.stringify(fields))
                    localStorage.setItem('signedup', JSON.stringify(true))
                  } else {
                    localStorage.setItem('user', JSON.stringify(fields))
                    localStorage.setItem('signedup', JSON.stringify(true))
                  }
                }}
            >

        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <Form >
            <div className="form-group form-check">
            <div className="form-group">
          <div className={'from'}>
          <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
            <p>
              <label htmlFor={'name'}>Name</label><br />
              <input
                className={'input signUpInput'}
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
                className={'input signUpInput'}
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
                className={'input signUpInput'}
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
                className={'input signUpInput'}
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
                className={'input signUpInput'}
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
                className={'input signUpInput'}
                type={'email'}
                name={'confirmEmail'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmEmail}
              />
            </p>
            {touched.confirmEmail && errors.confirmEmail && <p className={'error'}>{errors.confirmEmail}</p>}
            <div className="form-group form-check">
                            <Field type="checkbox" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                            <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
                            <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                        </div>
            <button
              disabled={!isValid || !dirty}
              className={`sign-in__btn btn btn-primary mr-2 ${
                dirty && isValid ? '' : 'disabled-btn'
              }`}
              onClick={() => { handleSubmit(); notification(); setTimeout(() => dispatch({ type: 'HANDLE_REDIRECT' }), 2000) }}
              type={'submit'}
            >Sign Up</button>
              <button type="reset" className="btn btn-secondary sign-in___reset-btn" onClick={() => resetForm()}>Reset</button>
              {redirectTrigger ? <button type="button " onClick={setTimeout(() => dispatch({ type: 'HANDLE_REDIRECT_FALSE' }), 2000) } className="btn btn-secondary sign-in___reset-btn" ><NavLink className='sign-in__link' to='/'>Enter quiz</NavLink></button> : null}
             </div>
          </div>
          </div>
                  </Form>
        )}

        </Formik>
      </Formik>
    </div>
    </div>
    </div>
  )
}
