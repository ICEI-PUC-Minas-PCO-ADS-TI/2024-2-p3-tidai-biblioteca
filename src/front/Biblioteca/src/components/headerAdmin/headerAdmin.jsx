import style from "../headerAdmin/headerAdmin.module.css";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin() {
  return (
    <>
      <div className={style.HeaderAdmin}>
        <ul>
          <li>
            <NavLink
              to="/homeAdmin"
              className={({ isActive }) =>
                isActive ? `${style.active} ${style.link}` : style.link
              }
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`bi ${isActive ? "bi-house-fill" : "bi-house"}`}
                  ></i>
                  Ínicio
                </>
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
                <>
                  <i
                    className={`bi ${
                      isActive ? "bi-journal-text" : "bi-journal-plus"
                    }`}
                  ></i>
                  Cadastrar Livros
                </>
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
                <>
                  <i
                    className={`bi ${
                      isActive
                        ? "bi-file-earmark-text-fill"
                        : "bi-file-earmark-text"
                    }`}
                  ></i>
                  Lista de empréstimos
                </>
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
                <>
                  <i className="bi bi-person-fill-gear"></i>
                  Minha conta
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}
