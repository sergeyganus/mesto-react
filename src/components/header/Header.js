import logo from '../../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип проекта &quot;Место&quot;" title="Логотип проекта &quot;Место&quot;" />
    </header>
  );
}

export default Header;