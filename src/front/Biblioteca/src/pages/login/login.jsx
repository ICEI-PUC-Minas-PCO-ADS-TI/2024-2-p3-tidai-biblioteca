import style from "./login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Buttons from "../../components/buttons/buttons";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://localhost:7016/api/Authenticated/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        const token = data.token;
        localStorage.setItem("token", token);

        const userId = data.userId;
        localStorage.setItem("userId", userId);

        const role = data.role;
        localStorage.setItem("role", role)

        console.log("Token:"+token +"\nUserId"+ userId +"\nRole:"+role)
        const tipoUsuario = role;
        onLogin(tipoUsuario);
        navigate(
          tipoUsuario === "administrador" ? "/homeAdmin" : "/biblioteca"
        );
      } else {
        alert("Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleEnviarEmail = () => {
    console.log("Email enviado para:", emailRecuperacao);
    setShowPopup(false);
  };

  return (
    <div className={style.main}>
      <div className={style.left}>
        <h1>Login</h1>
    
          <div className={style.inputs}>
            <i className="bi bi-envelope-at-fill"></i>
            <input
              type="text"
              placeholder="Digite o nome do usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={style.inputs}>
            <i className="bi bi-key"></i>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={style.checkbox}>
            <div>
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Lembre de mim</label>
            </div>
            <a href="#" onClick={togglePopup}>
              Esqueci minha Senha
            </a>
          </div>

          <button type="submit" onClick={handleSubmit}>
            <i className="bi bi-door-open-fill"></i>
            Fazer Login
          </button>
     
        <div className={style.cadastroLeft}>
          <h4>Cadastre-se como:</h4>
          <div className={style.buttonsCadastro}>
            <button>Leitor</button>
            <button>Administrador</button>
          </div>
        </div>
      </div>

      <div className={style.rigth}>
        <div>
          <h1>Bem-Vindo!</h1>
          <h2>A sua biblioteca virtual</h2>
          <h4 id="title-">Cadastre-se como:</h4>
          <div className={style.buttonsCadastros}>
            <NavLink to="/cadastroUsuario" className={style.buttonsNavLink}>
              <button>Leitor</button>
            </NavLink>
            <NavLink
              to="/cadastroAdministrador"
              className={style.buttonsNavLink}
            >
              <button>Administrador</button>
            </NavLink>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className={style.popup}>
          <div className={style.popupContent}>
            <h3>Recuperar Senha</h3>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={emailRecuperacao}
              onChange={(e) => setEmailRecuperacao(e.target.value)}
            />
            <button onClick={handleEnviarEmail}>Enviar</button>
            <button onClick={togglePopup}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
