import logo from '../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className="header root__header">
      <div className="header__container">
        <a href="/" className="logo root__link" target="_self">
          <img src={logo} alt="Проект Место" className="logo__img"/>
        </a>
        <Link
          to={(location.pathname === '/sign-in')? '/sign-up' : '/sign-in'}
          className="root__link"
        >
          {(location.pathname === '/sign-in')? 'Регистрация' : 'Вход'}
        </Link>
      </div>
    </header>
  );
}

export default Header;
