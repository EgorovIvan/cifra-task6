import {Link} from "react-router-dom";

const Header: React.FC = () => {

    return (
        <>
            <header className="header">
              <div className="container">
                <Link to="/">
                  <div className="header__logo"></div>
                </Link>

                <div className="header__nav">
                  <Link to="/user-management">
                    <span className="header__nav-item">Управление пользователями</span>
                  </Link>
                  <Link to="/accounting">
                    <span className="header__nav-item">Вход</span>
                  </Link>
                </div>
              </div>

            </header>
        </>
    )
}

export default Header
