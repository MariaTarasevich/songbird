import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Nav } from '../nav/Nav.jsx'
import { birdsData } from '../../data/birdsData'
import { Header } from '../header/Header'
import { AudioBlock } from '../audioBlock/AudioBlock.jsx'
import scoreCount from '../../store/score.js'

import correctAnswerSound from '../../sounds/correctAnswerSound.mp3'
import incorrectAnswerSound from '../../sounds/incorrectAnswerSound.mp3'
import gameWon from '../../sounds/gameWon.mp3'

import './QuizModule.css'
import { observer } from 'mobx-react-lite'

export const QuizModule = observer(() => {
  const correctSound = new Audio(correctAnswerSound)
  const incorrectSound = new Audio(incorrectAnswerSound)
  const gameWonSound = new Audio(gameWon)
  const disabledAttr = 'disabled'

  const dispatch = useDispatch()
  const scoreMy = useSelector(state => state.scoreMy)
  const maxMark = useSelector(state => state.maxMark)
  const falseCount = useSelector(state => state.falseCount)
  const showScore = useSelector(state => state.showScore)
  const currentQuestion = useSelector(state => state.currentQuestion)
  const showDesc = useSelector(state => state.showDesc)
  const noAnsClass = useSelector(state => state.noAnsClass)
  const btnDisabledClass = useSelector(state => state.btnDisabledClass)
  const navIndex = useSelector(state => state.navIndex)

  const refAudio = useRef()

  const changeScore = (isCorrect) => {
    if (!isCorrect) dispatch({ type: 'FALSE_ANSWER' })
    else { dispatch({ type: 'CORRECT_ANSWER' }) }
  }

  const handleAnswerOptionClick = (isCorrect) => {
    const btn = document.querySelector('button')

    if (isCorrect) {
      dispatch({ type: 'ENABLE_BUTTON' })
      correctSoundPlay()
    } else {
      incorrectSoundPlay()
    }
    if (btn.hasAttribute(disabledAttr) && isCorrect) {
      btn.removeAttribute(disabledAttr)
      changeClass()
    }
  }

  const correctSoundPlay = () => {
    correctSound.play()
  }
  const incorrectSoundPlay = () => {
    incorrectSound.play()
  }
  const noAnswer = (isCorrect) => {
    if (isCorrect) {
      dispatch({ type: 'CHANGE_ANSWER_CLASS' })
    }
  }
  const noAnswer2 = () => {
    dispatch({ type: 'CHANGE_ANSWER_CLASS' })
  }
  const switchQuestion = () => {
    const btn = document.querySelector('button')
    dispatch({ type: 'INCREMENT_NAV_INDEX' })
    if (currentQuestion + 1 < birdsData.length) {
      dispatch({ type: 'CHANGE_CURRENT_QUESTION' })
    } else {
      dispatch({ type: 'SHOW_SCORE' })
      gameWonSound.play()
    }
    btn.toggleAttribute(disabledAttr)
    dispatch({ type: 'DISABLE_BUTTON' })
    if (showScore) {
      btn.removeAttribute(disabledAttr)
    }
  }
  const changeClass = () => {
    dispatch({ type: 'SHOW_DESCRIPTION' })
  }

  const restart = () => {
    document.location.reload()
  }

  const handleItemClick = (isCorrect) => {
    handleAnswerOptionClick(isCorrect)
    noAnswer(isCorrect)
  }

  const stopAudio = () => {
    refAudio.current.pause()
  }

  // const checkItem = (isCorrect) => {
  //   if (!isCorrect && scoreCount.score > 0) { scoreCount.decrement() } else if (isCorrect) { scoreCount.increment() }
  // }

  return (
    <>
      <Header scoreMy={
        scoreMy
        //scoreCount.getScore()
      } />
      <Nav
        currentQuestion={currentQuestion}
        navIndex={navIndex}
      />
      <AudioBlock noAnsClass={noAnsClass} currentQuestion={currentQuestion} ref={refAudio} />
      <div className={`quiz__wrap ${showScore ? 'displayNone' : ''}`}>
        <div className="quiz__options-answers-wrap">
          <div className="options__wrap">
            <ul className="options__list">
              {birdsData[currentQuestion].answerOptions.map((item, index) => {
                return (
                  <li
                    key={index}
                    id={item.id}
                    className="options__list-item"
                    onClick={() => {
                      handleItemClick(item.isCorrect)
                      item.active = true
                      //checkItem(item.isCorrect)
                      changeScore(item.isCorrect)
                    }}
                  >
                    <span
                      className={
                        item.active && !item.isCorrect
                          ? 'options__circle-wrong'
                          : 'options__circle'
                      }
                    ></span>
                    {item.name}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="rightAnswer__wrap">
            <div
              id="noAnswerBlock"
              className={noAnsClass ? 'displayNone' : 'rightAnswer__noAnswer'}
            >
              <p className="rightAnswer__noAnswer-p">
                Послушайте плеер.
                <br />
                Выберите птицу из списка
              </p>
            </div>
            {birdsData[currentQuestion].answerOptions.map((item, index) => {
              return (
                <div className={noAnsClass ? '' : 'displayNone'} key={index}>
                  <div
                    className={
                      item.isCorrect ? 'rightAnswer__info' : 'displayNone'
                    }

                  >
                    <div className="rightAnswer__wrap-top">
                      <div className="rightAnswer__pic">
                        <img
                          className="rightAnswer__pic-img"
                          src={item.image}
                          alt="птица"
                        />
                      </div>
                      <ul className="rightAnswer__list">
                        <li className="rightAnswer__item">
                          <h3 className="rightAnswer__title">{item.name}</h3>
                        </li>
                        <li className="rightAnswer__item">
                          <span className="rightAnswer__latin">
                            {item.isCorrect ? item.species : ''}
                          </span>
                        </li>
                        <li className="rightAnswer__item">
                          <audio ref={refAudio}
                            controls="controls"
                            className="rightAnswer__audio"
                            src={item.isCorrect ? item.audio : ''}
                          >
                            <source
                              src={item.isCorrect ? item.audio : ''}
                            ></source>
                          </audio>
                        </li>
                      </ul>
                    </div>
                    <div className="rightAnswer__wrap-bot">
                      <p className="rightAnswer__info-par">
                        {item.isCorrect ? item.description : ''}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <button
          className={`nextButton ${btnDisabledClass ? 'btnActive' : ''}`}
          onClick={() => {
            switchQuestion()
            noAnswer2()
            stopAudio()
          }}
        >
          Next level
        </button>
      </div>
      <div className={`quiz__final-score ${showScore ? '' : 'displayNone'}`}>
        <h2 className="quiz__final-score-title">
          Добро пожаловать в орнитологи!
        </h2>
        <img
          src="https://c.tenor.com/j56k128BtB4AAAAC/family-guy-bird.gif"
          className="quiz__final-score-img"
        />
        <p className="quiz__final-score-paragraph">
          Вы набрали {
            scoreMy
            //scoreCount.getScore()
          } из 30 возможных баллов!
        </p>
        <button className="quiz__final-score-btn" onClick={restart}>
          Попробовать снова
        </button>
      </div>
    </>
  )
})
