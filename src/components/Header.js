import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header root__header">
      <a href="/" className="logo root__link" target="_self">
        <img src={logo} alt="Проект Место" className="logo__img"/>
      </a>
    </header>
  );
}

export default Header;
