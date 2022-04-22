import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import { BrowserRouter } from 'react-router-dom'

import './index.css'

const defaultState = {
  scoreMy: 0,
  maxMark: 5,
  falseCount: 0,
  showScore: false,
  currentQuestion: 0,
  showDesc: false,
  noAnsClass: false,
  btnDisabledClass: false,
  navIndex: 0,
  handleProfile: false,
  redirectTrigger: false,
  handleEditMode: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FALSE_ANSWER':
      return { ...state, falseCount: state.falseCount + 1 }
    case 'CORRECT_ANSWER':
      return { ...state, scoreMy: state.scoreMy + state.maxMark - state.falseCount, falseCount: 0 }
    case 'SHOW_SCORE':
      return { ...state, showScore: true }
    case 'CHANGE_CURRENT_QUESTION':
      return { ...state, currentQuestion: state.currentQuestion + 1 }
    case 'SHOW_DESCRIPTION':
      return { ...state, showDesc: !state.showDesc }
    case 'CHANGE_ANSWER_CLASS':
      return { ...state, noAnsClass: !state.noAnsClass }
    case 'ENABLE_BUTTON':
      return { ...state, btnDisabledClass: true }
    case 'DISABLE_BUTTON':
      return { ...state, btnDisabledClass: false }
    case 'INCREMENT_NAV_INDEX':
      return { ...state, navIndex: state.navIndex + 1 }
    case 'HANDLE_PROFILE':
      return { ...state, handleProfile: true }
    case 'HANDLE_REDIRECT':
      return { ...state, redirectTrigger: true }
    case 'HANDLE_REDIRECT_FALSE':
      return { ...state, redirectTrigger: false }
    case 'HANDLE_EDIT_MODE_TRUE':
      return { ...state, handleEditMode: true }
    case 'HANDLE_EDIT_MODE_FALSE':
      return { ...state, handleEditMode: false }
    default:
      return state
  }
}

const store = createStore(reducer)
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
