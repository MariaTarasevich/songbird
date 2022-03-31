import './App.css';
import {Header} from './components/header/Header';

import {AudioBlock} from './components/audioBlock/AudioBlock.jsx'
import {QuizModule} from './components/quizModule/QuizModule.jsx'
import {NextButton} from './components/nextButton/NextButton.jsx'

function App() {
  
  return (
    <div className="App">
      <QuizModule />
    </div>
  );
}

export default App;
