import style from "./login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Buttons from "../../components/buttons/buttons";
import { mostrarSucesso, mostrarErro } from '../../components/notificacao/notificacao.jsx';
import Notificacao from '../../components/notificacao/notificacao.jsx';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://biblioteca-aahcb8aeeegfdwg8.brazilsouth-01.azurewebsites.net/autenticacao/login",
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
        console.log("Resposta da API:", data); 
  
        const token = data.token;
        const userId = data.userId;
        const role = data.role;
  
        console.log("Token recebido:", token);
        console.log("UserId recebido:", userId);
        console.log("Role recebida:", role);
  
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
  
        onLogin(role);
        navigate(role === "administrador" ? "/homeAdmin" : "/biblioteca");
      } else {
        mostrarErro("Credenciais inválidas");
      }
    } catch (err) {
      console.error("Erro ao realizar login:", err);
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={style.main}>
      <Notificacao/>
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
            type={passwordVisible ? "text" : "password"}
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={`bi ${passwordVisible ? "bi-eye" : "bi-eye-slash"}`} 
            onClick={togglePasswordVisibility} 
            style={{ cursor: "pointer", marginLeft: "10px" }}
          ></i>
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
          <h4 id="title-">Não tem uma conta:</h4>
          <div className={style.buttonsCadastros}>
            <NavLink to="/cadastroUsuario" className={style.buttonsNavLink}>
              <button>Inscreva-se</button>
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
