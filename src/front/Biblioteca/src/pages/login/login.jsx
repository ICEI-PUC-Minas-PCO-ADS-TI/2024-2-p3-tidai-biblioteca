import style from './login.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';



export default function Login({ onLogin }) { 
    const [tipo, setTipo] = useState('');

    const handleLogin = () => {
            onLogin(tipo);
        console.log(tipo)
    };
    

    return (
        
        <div className={style.main}>
            
            <div className={style.left}>
                <h1>Login</h1>
                <div className={style.inputs}>
                    <i className="bi bi-envelope-at-fill"></i>
                    <input 
                        type="text" 
                        placeholder="Digite seu e-mail"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)} 
                    />
                </div>

                <div className={style.inputs}>
                    <i className="bi bi-key"></i>
                    <input type="password" placeholder="Digite sua senha" />
                </div>

                <div className={style.checkbox}>
                    <div>
                        <input type="checkbox" name="remember" id="1" />
                        <label htmlFor="remember">Lembre de mim</label>
                    </div>
                    <a href="#">Esqueci minha Senha</a>
                </div>

                <button onClick={handleLogin}>
                    <i className="bi bi-door-open-fill"></i>
                    Fazer Login
                </button>
            </div>

            <div className={style.right}>
                <div>
                    <h1>Bem-Vindo!</h1>
                    <h2>A sua biblioteca virtual</h2>
                    <h4 id="title-">Cadastre-se como:</h4>
                    <div className={style.buttonsCadastros}>
                    <NavLink to='/cadastroUsuario'>
                        <button>Usuario</button>
                    </NavLink>
                    <NavLink to='/cadastroAdministrador'>
                            <button>Administrador</button>
                    </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
