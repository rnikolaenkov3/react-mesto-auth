import {Link} from "react-router-dom";

function Login() {
  return (
    <form className="auth">
      <div className="auth__input-wrap">
        <h2 className="auth__title">Войти</h2>
        <input className="auth__input" type="text" name="email" placeholder="Email"/>
        <input className="auth__input" type="password" name="password" placeholder="Пароль"/>
      </div>
      <div className="auth__controls">
        <button type="submit" className="auth__send">Войти</button>
      </div>
    </form>
  );
}

export default Login;