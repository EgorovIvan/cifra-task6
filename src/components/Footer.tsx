import {Link} from "react-router-dom";

const Footer: React.FC = () => {

  return (
    <>
      <footer className="footer">
        <Link to="/">
          <div className="footer__item">
            <img src="./img/footer/menu.svg" alt="task"/>
            <span>Меню</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer__item">
            <img src="./img/footer/scanner.svg" alt="scanner"/>
            <span>Сканер</span>
          </div>
        </Link>
        <Link to="/">
          <div className="footer__item">
            <img src="./img/footer/arrow_back.svg" alt="back"/>
            <span>Назад</span>
          </div>
        </Link>
      </footer>
    </>
  )
}

export default Footer
