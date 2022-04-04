import './NotFoundPage.css'

export const NotFoundPage = () => {
  
  return (
    <div className="not-found__wrap">
        <h1 className="not-found__title">Как Вы сюда попали?</h1>
        <h3 className="not-found__subtitle">К сожалению, такой страницы не найдено</h3>
        <img className="not-found__img" src="https://i.gifer.com/origin/3f/3fcf565ccc553afcfd89858c97304705.gif" alt="how did you get here"/>
    </div>
  );
}