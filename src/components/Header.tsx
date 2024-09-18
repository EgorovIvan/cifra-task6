import {Link, NavLink} from "react-router-dom";

const Header: React.FC = () => {

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/">
            <div className="header__logo"></div>
          </Link>

          <div className="header__nav">
            <NavLink to="/task-manager"
                     className={({isActive}): string =>
                       isActive ? "header__nav-item link-active" : "header__nav-item"
                     }>
              <p>Таск-менеджер</p>
            </NavLink>
            <NavLink to="/user-management"
                     className={({isActive}): string =>
                       isActive ? "header__nav-item link-active" : "header__nav-item"
                     }>
              <p>Управление пользователями</p>
            </NavLink>
            <NavLink to="/accounting"
                     className={({isActive}): string =>
                       isActive ? "header__nav-item link-active" : "header__nav-item"
                     }>
              <p>Вход</p>
            </NavLink>
          </div>
        </div>

      </header>
    </>
  )
}

export default Header
