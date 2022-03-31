import React from 'react';
import { birdsData } from '../../data/birdsData';
import './Nav.css';

export const Nav = ({ currentQuestion, navIndex}) => {

    return (
        <ul className='nav__list'>
            {
                                birdsData[currentQuestion].answerOptions.map((item, index)=> {
                                    return     <>
                                    <li className={`nav__item  ${item.isCorrect ? '' : 'displayNone'}`}><a href="#" className={`nav__item-link ${navIndex == 0 ? 'nav__active' : ''}`}>Разминка</a></li>
                                    <li  className={`nav__item ${item.isCorrect ? '' : 'displayNone'}`}><a href="#" className={`nav__item-link ${navIndex == 1 ? 'nav__active' : ''}`}>Воробьиные</a></li>
                                    <li  className={`nav__item  ${item.isCorrect ? '' : 'displayNone'}`}><a href="#"  className={`nav__item-link ${navIndex == 2 ? 'nav__active' : ''}`}>Лесные птицы</a></li>
                                    <li  className={`nav__item ${item.isCorrect ? '' : 'displayNone'}`}><a href="#"  className={`nav__item-link ${navIndex == 3 ? 'nav__active' : ''}`}>Певчие птицы</a></li>
                                    <li  className={`nav__item  ${item.isCorrect ? '' : 'displayNone'}`}><a href="#"  className={`nav__item-link ${navIndex == 4 ? 'nav__active' : ''}`}>Хищные птицы</a></li>
                                    <li  className={`nav__item  ${item.isCorrect ? '' : 'displayNone'}`}><a href="#"  className={`nav__item-link ${navIndex == 5 ? 'nav__active' : ''}`}>Морские птицы</a></li>
                                    </>    
            })}

        </ul>
    )
}

/*             <li className='nav__item'><a href="#" className='nav__item-link'>Разминка</a></li>
            <li className='nav__item'><a href="#" className='nav__item-link'>Воробьиные</a></li>
            <li className='nav__item'><a href="#" className='nav__item-link'>Лесные птицы</a></li>
            <li className='nav__item'><a href="#" className='nav__item-link'>Певчие птицы</a></li>
            <li className='nav__item'><a href="#" className='nav__item-link'>Хищные птицы</a></li>
            <li className='nav__item'><a href="#" className='nav__item-link'>Морские птицы</a></li> */