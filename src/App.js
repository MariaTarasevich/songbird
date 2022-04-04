import './App.css';
import { SignIn } from './components/signIn/SignIn';
import { QuizModule } from './components/quizModule/QuizModule.jsx'
import { NotFoundPage } from './components/notFoundPage/NotFoundPage.jsx'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/quiz' element={<QuizModule />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
