import {Link, NavLink} from "react-router-dom";
import Button from "./Button.tsx";

interface Props {
  status: boolean;
  showModalAuth: () => void;
  showModalRegister: () => void;
}
const Header: React.FC<Props> = (Props) => {

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

            { !Props.status ?
              <>
                <Button type="button" classBtn='header__nav-btn btn' text='Вход' onClickBtn={Props.showModalAuth}/>
                <Button type="button" classBtn='header__nav-btn btn' text='Регистрация' onClickBtn={Props.showModalRegister}/>
              </> :
              <div className="header__nav-account"></div>
            }
          </div>
        </div>

      </header>
    </>
  )
}

export default Header
