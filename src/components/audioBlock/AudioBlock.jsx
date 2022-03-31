import React from 'react';
import { birdsData } from '../../data/birdsData';

import './AudioBlock.css';


export const AudioBlock = ({noansClass, currentQuestion}) => {
    return (
        <div className='audioBlock__wrap'>
                        {
                birdsData[currentQuestion].answerOptions.map((item, index)=> {
                    return  <> 
                        <div className={`audioBlock__wrap ${noansClass ? 'displayNone' : ''} ${item.isCorrect ? '' : 'displayNone'}`}>
                            <div className='audioBlock__pic'></div>
                            <div className='audioBlock__info'>

                                <h3 className='audioBlock__name'>******</h3>
                                <audio controls="controls" className='audioBlock__audio' src={item.isCorrect ? item.audio : ''}>
                                    <source  src={item.isCorrect ? item.audio : ''}></source>
                                </audio>
                            </div>
                        </div>
                        <div className={`audioBlock__wrap ${noansClass ? '' : 'displayNone'} ${item.isCorrect ? '' : 'displayNone'}`}>
                            <div className='audioBlock__pic__rightAns'><img src={item.isCorrect ? item.image : '../../../img/unknown-bird.jpg'} className='audioBlock__pic__rightAns-img' alt=''/></div>
                            <div className='audioBlock__info'>

                                <h3 className='audioBlock__name'>{item.name}</h3>
                                <audio controls="controls" className='audioBlock__audio' src={item.isCorrect ? item.audio : ''}>
                                    <source  src={item.isCorrect ? item.audio : ''}></source>
                                </audio>
                                </div>
                            </div>
                          </>
                })
            }

        </div>
    )
}