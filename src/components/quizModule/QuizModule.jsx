import React from 'react';
import './QuizModule.css';
import {RightAnswer} from './rightAnswer/RIghtAnswer.jsx'
import {Nav} from '../nav/Nav.jsx'
import { birdsData } from '../../data/birdsData';
import {Header} from '../header/Header'
import { useState } from 'react';
import {AudioBlock} from '../audioBlock/AudioBlock.jsx'


export const QuizModule = () => {
    let [score, setScore] = useState(0)
    let [currentQuestion, setCurrentQuestion] = useState(0)
    let [showScore, setShowScore] = useState(false)
    let [showDesc, setShowDesk] = useState(false)
    let [noansClass,  setNoAnsClass] = useState(false)
    let [circleClass, setCircleClass] = useState(false)
    const [falseList, setFalseList] = useState(0);
    let [navIndex, setNavIndex] = useState(0)
    let [btnDisabledClass, setBtnDisabledClass] = useState(false)


    const handleAnswerOptionClick = (isCorrect) => {
        let btn = document.querySelector('button')
        
        if(isCorrect){
            setBtnDisabledClass(btnDisabledClass=true)
            setScore(score + 5 - falseList)
        } else{
                setFalseList(falseList+1);
        }
        if(btn.hasAttribute('disabled') && isCorrect){
            btn.removeAttribute('disabled')

            changeClass()

        }
console.log(circleClass)
    }

    const noAnswer = (isCorrect) => {
        if(isCorrect){
        setNoAnsClass(!noansClass)
        }
    }
    const noAnswer2 = () => {
        setNoAnsClass(!noansClass)
    }
    const switchQuestion = () => {
        setFalseList(0);
        const nextQuestion = currentQuestion+1
        let btn = document.querySelector('button')

        setNavIndex(navIndex+1)
        setCircleClass(circleClass(false))
        if (  nextQuestion < birdsData.length){
            setCurrentQuestion(nextQuestion)
        } else {
            setShowScore(true)
        }
        btn.toggleAttribute('disabled')
        setBtnDisabledClass(btnDisabledClass=false)
        if(showScore){
            btn.removeAttribute('disabled')
        }
    }
    const changeClass = () => {
        setShowDesk(!showDesc)
    }

    const restart = () => {
        document.location.reload()
    }

    const circleChange = () => {

        setCircleClass(!circleClass)
    }

     return (<>
                 <Header score={score}/>
                 <Nav noansClass={noansClass} currentQuestion={currentQuestion} navIndex={navIndex}/>
                 <AudioBlock noansClass={noansClass} currentQuestion={currentQuestion}/>
                 <div className={`quiz__wrap ${showScore ? 'displayNone' : ''}`}>
                     <div className='quiz__options-answers-wrap'>
                    <div className='options__wrap'>
                        <ul className='options__list'>
                            {
                                birdsData[currentQuestion].answerOptions.map((item, index) => {
                                    return  <li  key={index} id={item.id} className={circleClass ? `options__list-item` : 'options__list-item-active'}onClick={() => {handleAnswerOptionClick(item.isCorrect); noAnswer(item.isCorrect); circleChange()}}>{item.name}</li>
                                    
                                })
                            }
                        </ul>
                    </div>
                    <div className="rightAnswer__wrap">
                    <div id='noAnswerBlock' className={noansClass ? 'displayNone' : 'rightAnswer__noAnswer'}>
                        <p className="rightAnswer__noAnswer-p">
                        Послушайте плеер.
                        <br />
                        Выберите птицу из списка
                        </p>
                    </div>
                    {
                        birdsData[currentQuestion].answerOptions.map((item, index)=> {
                            return  <div className={noansClass ? '' : 'displayNone'}>
                                    <div className={item.isCorrect ? 'rightAnswer__info' : 'displayNone'} key={index} >
                                            <div className="rightAnswer__wrap-top">
                                                <div className='rightAnswer__pic'><img  className='rightAnswer__pic-img' src={item.image} alt='птица'/></div>
                                                <ul className="rightAnswer__list">
                                                    <li className="rightAnswer__item">
                                                    <h3 className="rightAnswer__title">{item.name}</h3>
                                                    </li>
                                                    <li className="rightAnswer__item">
                                                    <span className="rightAnswer__latin">{item.isCorrect ? item.species : ''}</span>
                                                    </li>
                                                    <li className="rightAnswer__item">
                                                    <audio controls="controls" className="rightAnswer__audio" src={item.isCorrect ? item.audio : ''}>
                                                        <source src={item.isCorrect ? item.audio : ''}></source>
                                                    </audio>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="rightAnswer__wrap-bot">
                                                <p className="rightAnswer__info-par">{item.isCorrect ? item.description : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                        })
                    }
                    </div>
                    </div>
                    <button className={`nextButton ${btnDisabledClass ? 'btnActive' : ''}`} onClick={()=>{switchQuestion(); noAnswer2()}}>Next level</button>
                </div>
                <div className={`quiz__final-score ${showScore ? '' : 'displayNone'}`}>
                    <h2 className='quiz__final-score-title'>Добро пожаловать в орнитологи!</h2>
                    <img src='https://c.tenor.com/j56k128BtB4AAAAC/family-guy-bird.gif' className='quiz__final-score-img'/>
                    <p className='quiz__final-score-paragraph'>Вы набрали {score} из 30 возможных баллов!</p>
                    <button className='quiz__final-score-btn' onClick={restart}>Попробовать снова</button>
                 </div>
            </>
    )
}