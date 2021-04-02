import {Link} from "react-router-dom";

function Register() {
  return (
    <form className="auth">
      <div className="auth__input-wrap">
        <h2 className="auth__title">Регистрация</h2>
        <input className="auth__input" type="text" name="email" placeholder="Email"/>
        <input className="auth__input" type="password" name="password" placeholder="Пароль"/>
      </div>
      <div className="auth__controls">
        <button type="submit" className="auth__send">Зарегистрироваться</button>
        <span className="auth__text">Уже зарегистрированы? <Link className="auth__link" to="/sign-in">Войти</Link></span>
      </div>
    </form>
  );
}

export default Register;