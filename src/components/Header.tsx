import {Link} from "react-router-dom";

const Header: React.FC = () => {

    return (
        <>
            <header className="header">
                <h1 className="header__title">Главная</h1>
                <div className="header__nav">
                    <Link to="/user-management">
                        <span className="header__nav-item">Admin</span>
                    </Link>
                    <Link to="/accounting">
                        <span className="header__nav-item">Log in</span>
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header
