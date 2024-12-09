import style from "../headerAdmin/headerAdmin.module.css";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin({onLogout}) {
  return (
    <>
      <div className={style.HeaderAdmin}>
        <ul>
          <li>
            <NavLink
              to="/Acervo"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }
            >
              {({ isActive }) => (
                <div className={`${style.contentHeaderAdmin} ${isActive ? style.active : ''}`}>
                  <i
                    className={`bi ${isActive ? "bi-house-fill" : "bi-house"}`}
                  ></i>
                  Ínicio
                </div>
              )}
            </NavLink>
          </li>
          {/* 
          <li>
            <NavLink
              to="/gerenciar-acervo"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`bi ${
                      isActive ? "bi-motherboard-fill" : "bi-motherboard"
                    }`}
                  ></i>
                  Gerenciar Acervo
                </>
              )}
            </NavLink>
          </li>
          */}
          <li>
            <NavLink
              to="/cadastro-de-livro"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }
            >
              {({ isActive }) => (
                <div className={`${style.contentHeaderAdmin} ${isActive ? style.active : ''}`}>
                  <i
                    className={`bi ${
                      isActive ? "bi-journal-text" : "bi-journal-plus"
                    }`}
                  ></i>
                  Cadastrar Livros
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lista-de-emprestimos"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }
            >
              {({ isActive }) => (
                <div className={`${style.contentHeaderAdmin} ${isActive ? style.active : ''}`}>
                  <i
                    className={`bi ${
                      isActive
                        ? "bi-file-earmark-text-fill"
                        : "bi-file-earmark-text"
                    }`}
                  ></i>
                  Empréstimos
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/minhaConta"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }
            >
              {({ isActive }) => (
                <div className={`${style.contentHeaderAdmin} ${isActive ? style.active : ''}`}>
                 <i className={`bi ${isActive ? "bi bi-person-fill" : "bi bi-person"}`}></i>
                  Minha conta
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <div className={style.logout}> 
            <button onClick={onLogout}> <i class="bi bi-box-arrow-in-right"></i> Sair</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}